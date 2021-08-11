# Inter-machines sharding
In case of very large bots, it is not enough to shard only on one server.
Therefore, Discordoo has a mechanism which distributes sharding instances between different servers.

## WARNING
**THIS IS NOT IMPLEMENTED FOR NOW.**

## Preparing your servers
You should prepare your servers to receive sharding instances. To do this, you need to open the port on which Discordoo's ShardingManager will wait for commands from the main ShardingManager. Default port is 8379.

## Getting started
On each server, you must install Discordoo and create a ShardingManager in standby mode:

=== "TS"
```ts
import { ShardingManager, ShardingManagerModes } from 'discordoo'

const manager = new ShardingManager({
  file: 'C:/path/to/your/client/file.js',
  mode: ShardingManagerModes.MACHINES,
  machines: {
    me: 'child',
    ipc: {
      networkHost: 'your server IP', // IP of the server on which this sharding manager is running
    //networkPort: 9999, // override default port if you want
    },
    /*tls: {
      // (this cert used in the array of trusted connections on the main ShardingManager server)
      public: string // path to server tls cert
      private: string // path to server tls private key
      dhparam?: string // path to server dhparam
      requestCert?: boolean // whether main sharding manager should pass tls cert to this child 
      rejectUnauthorized?: boolean // reject unauthorized connections 
      trustedConnections?: string[] // array of paths to trusted client certificates 
    },*/
  },
})

manager.start()
```
On the main server you should create main ShardingManager and specify machines:

=== "TS"
```ts
import { ShardingManager, ShardingManagerModes, ChildShardingModes } from 'discordoo'

const manager = new ShardingManager({
  mode: ShardingManagerModes.MACHINES,
  machines: {
    me: 'parent',
    points: [ // array of contact points to your servers
      {
        port: 8379, // optional override port 
        host: '10.0.18.1', // remote server ip (required!)
        udp: 'udp4', // optional UDP instead TCP
        childManagerOptions: { // options of the sharding manager that will be sent to the remote machine
          mode: ChildShardingModes.PROCESSES,
          shards: { from: 0, to: 127 },
        },
        tls: {
          // (this cert used in array of trusted connections on the child sharding manager server)
          public: '../tls/client.pub', // main ShardingManager tls cert
          private: '../tls/client.key', // main ShardingMangaer tls private key
          rejectUnauthorized: true,
          trustedConnections: [ '../tls/10-0-18-1.pub', '../tls/FE80::0202:B3FF:FE1E:8329.pub' ] // trusted servers tls certs
        },
      },
      {
        host: 'FE80::0202:B3FF:FE1E:8329', // ipv6 also supported
        childManagerOptions: {
          mode: ChildShardingModes.WORKERS,
          shards: { from: 128, to: 255 },
        },
        tls: {
          public: '../tls/server.pub',
          private: '../tls/server.key',
          rejectUnauthorized: true,
          trustedConnections: [ '../tls/10-0-18-1.pub', '../tls/FE80::0202:B3FF:FE1E:8329.pub' ]
        },
      }
    ]
  }
})

manager.start()
```
That's it!
