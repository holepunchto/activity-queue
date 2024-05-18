# activity-queue

Easily track when activity is drained

```
npm install activity-queue
```

## Usage

``` js
const ActivityQueue = require('activity-queue')

const queue = new ActivityQueue()

const clock = queue.active()

const drained = queue.drained()

// await drained to know when its drained

queue.inactive(clock)
```

## API

#### `clock = queue.active()`

Mark the queue as active. Returns the activity clock as an integer.

#### `queue.inactive(clock)`

Mark the activity done by passing the clock back.

#### `promise = queue.drained()`

Wait for the queue to drain. It's snapshot to the current state
so any future activity events do not not count.

## License

Apache-2.0
