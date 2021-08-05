# Getting started with sharding

Sharding is required for bots with more than 2500 servers.

## Creating sharding manager
Sharding instances (processes, workers or clusters) are managed by ShardingManager.
So we have to create it.

1. Create a separate file for the sharding manager.
2. Make sure that this file **is not required** in any way in the sharding instances, otherwise you will get an error about the recursive creation of the sharding manager.
3. Import sharding manager and start it:

=== "TS"
```ts
import { ShardingManager } from 'discordoo'

const manager = new ShardingManager({
  file: 'C:/path/to/your/old/starting/file.js',
  shards: 2,
  mode: 'processes', // you can find other modes in our api documentation
  processes: { // every mode has its own options
    shardsPerProcess: 1 // how many discord's shards to run in each sharding instance
  }
})

manager.start()
  .then(() => 'spawned!')
```
