# Step 2 - Starting your bot
You can use built-in createApp function to create a client, setup providers and client options:

=== "TS"
```ts
import { createApp } from 'discordoo/wrapper'
 
const client = createApp('some-discord-bot-token')
  .cacheProvider(/* some cache provider */)
  .gateway(/* some gateway options */)
  .build()
 
client.start()
    .then(() => console.log('online!'))
```

or, if you want to extend from the client:

=== "TS"
```ts
import { Client as DiscordooClient } from 'discordoo/core'

class Client extends DiscordooClient {
  constructor(...props) {
    super(...props)
    
    console.log('hello from client constructor')
  }
}

const client = new Client(/* some client options */)

client.useCacheProvider(/* some cache provider */)

client.start()
  .then(() => console.log('online!'))
```
