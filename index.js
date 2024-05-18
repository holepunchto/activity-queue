module.exports = class ActivityQueue {
  constructor () {
    this.activity = 0
    this.clock = 0

    this._drains = []
    this._queueDrainedBound = null
  }

  _queueDrained (resolve, reject) {
    this._drains.push({
      resolve,
      reject,
      clock: this.clock++,
      activity: this.activity
    })
  }

  drained () {
    if (this._queueDrainedBound === null) this._queueDrainedBound = this._queueDrained.bind(this)
    return this.activity === 0 ? Promise.resolve(true) : new Promise(this._queueDrainedBound)
  }

  active () {
    this.activity++
    return this.clock
  }

  inactive (clock) {
    this.activity--
    if (this._drains.length === 0) return

    let offset = 0

    for (let i = 0; i < this._drains.length; i++) {
      const d = this._drains[i]
      if (d.clock < clock) break
      if (--d.activity === 0) {
        d.resolve(true)
        offset++
      }
    }

    if (offset > 0) this._drains.splice(0, offset)
  }

  clear () {
    this.activity = 0
    for (const { resolve } of this._drains) resolve(false)
    this._drains = []
  }
}
