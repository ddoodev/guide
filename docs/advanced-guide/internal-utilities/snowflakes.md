# Discordoo Snowflakes
DiscordooSnowflake is a modified version of Twitter Snowflake.

## Why we use snowflakes
We decided to use snowflake as a way to identify sharding instances and as a way to identify interprocess messages.
Every time a sharding instance sends a message to sharding manager or vice-versa, a DiscordooSnowflake is created. 
Since interprocess interaction is limited to sending and receiving events, we can't just send a message and get a response. 
We must somehow understand that this response was exactly to our request. 
That's why each message is assigned a unique identifier in the form of DiscordooSnowflake.
With this unique identifier, we can understand that the response was exactly for us.

![sharding-snowflakes](../../assets/sharding-snowflakes.png)


## Analyzing Snowflake
If we have a snowflake `1128425170719486862453931925225603077` we can represent it as binary:
```
128                                        86                               54                               22
000000001101100101010011101010000000011011 00000000000000000000000000001011 00000000000000000000000001100011 0000000000000000000101
   number of ms since Discordoo epoch                  worker id                       shard id                    increment
```
After converting it to a binary, we can allocate individual blocks to find out the information that we used to generate this snowflake.

We can get timestamp (generation time) from snowflake
```ts
const EPOCH = 1609459200000 // 2021-01-01T00:00:00.000Z
const timestamp = (BigInt(snowflake) >> 86n) + BigInt(EPOCH) // 1624043753498n
```

Or internal worker id (usually, this is the ID of the process that created the snowflake)
```ts
const workerID = (BigInt(snowflake) & 0x3FFFFFFFC0000000000000n) >> 54n // 11n
```

Or shard id (process, worker or cluster ID, not WebSocketClient (discord shard) id)
```ts
const shardID = (BigInt(snowflake) & 0x3FFFFFFFC00000n) >> 22n // 99n
```
 
And finally, we can get the snowflake increment (number that increases by 1 for each generation of snowflake on the same process)
```ts
const increment = BigInt(snowflake) & 0x3FFFFFn // 5n
```
