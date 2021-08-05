# Step 2 - Starting your bot
You can use built-in createApp function to create a client, setup providers and client options:

=== "TS"
```ts
import { createApp } from 'discordoo'
 
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
import { Client as DiscordooClient, ClientOptions, createApp } from 'discordoo'

interface YourCustomOptions {
  owner?: string
}

class Client extends DiscordooClient {
  constructor(token, options?: ClientOptions<YourCustomOptions>) {
    super(token, options)
    
    console.log(
      'hello from client constructor!',
      'provided custom options:',
      options?.custom // YourCustomOptions interface used here
    )
  }
  
  customMethod(): string {
    return 'hello world'
  }
}

const client = createApp('some-discord-bot-token', { useClient: Client })
  .gateway(/* some gateway options */)
  .custom<YourCustomOptions>({ owner: 'very-cool-developer' })
  .build<Client>()

client.start()
  .then(() => console.log(client.customMethod())) // hello world
```
