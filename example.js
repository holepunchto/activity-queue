const ActivityQueue = require('./')

const q = new ActivityQueue()

const f1 = q.active()
const f2 = q.active()

q.drained().then(function () {
  console.log('flushed')
})

q.inactive(f2)
q.inactive(f1)

q.drained().then(function () {
  console.log('flushed again')
})
