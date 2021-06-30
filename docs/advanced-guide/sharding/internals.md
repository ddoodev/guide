# Sharding internals

Our sharding uses `node-ipc` module for interprocess communication.

Every sharding instance (process, worker or cluster) has a unique DiscordooSnowflake.
It's like Discord or Twitter snowflake, only modified to suit our needs.

## What happens when the sharding instance are spawned
**1.** An internal IPC Client is created in the process of the sharding manager.

**2.** The Discordoo Snowflake is passed to the sharding instance process, which will be used to identify this instance.

**3.** An internal IPC Server is created in the process of sharding instance, it uses Discordoo Snowflake as an address, a path to itself.

**4.** The IPC Client starts sending an `IpcHelloPacket` to the address that was passed to the sharding instance process until it receives a response. If 30 seconds have passed, but no response has been received, the sharding instance process will be forcibly destroyed.

**5.** If the IPC Server has received an `IpcHelloPacket`, it should send an `IpcIdentifyPacket`. Thus, it informs the IPC Client that it is up and running. The `IpcHelloPacket` contains information about how many shards need to be launched, and interval to send heartbeat.

**6.** When the IPC Client receives the `IpcIdentifyPacket`, it will start waiting for the `IpcHeartbeatPacket` from the sharding instance. Heartbeat is a system in which the IPC Server must send requests to the IPC Client every few seconds, and the Client must respond. This way they understand that all processes are running and working.

**7.** In case of loss of connection with the IPC Client, the IPC Server will command the local client (bot) to self-destruct. In case of loss of connection with the IPC Server, the IPC Client will command the ShardingManager to restart this sharding instance.

## How ShardingManager and sharding instances communicating
All communication comes down to a kind of ping-pong. They use a special standardized message type -- `IpcPacket`, which is very similar to WebSocket messages.

| op                                                                      | d                | t                                                                    |
|-------------------------------------------------------------------------|------------------|----------------------------------------------------------------------|
| a numeric value, each of the numbers is assigned its own type of event. | mixed JSON data. | when op is 0 (dispatch), here is the string value of the sent event. |
