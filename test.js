const ActivityQueue = require('./')
const test = require('brittle')

test('basic', async function (t) {
  const q = new ActivityQueue()

  await q.drained()

  {
    const c = q.active()
    q.inactive(c)
  }

  await q.drained()

  const c1 = q.active()
  const d1 = q.drained()
  const c2 = q.active()
  const d2 = q.drained()

  let ran = false
  setTimeout(function () {
    q.inactive(c1)
    ran = true
  }, 100)

  await d1
  t.ok(ran)

  ran = false
  setTimeout(function () {
    q.inactive(c2)
    ran = true
  }, 100)

  await d2
  t.ok(ran)
})
