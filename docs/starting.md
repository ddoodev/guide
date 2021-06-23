# Step 2 - Starting your bot
Once you have created your project, you will have something like this in your
`index.ts` file -

=== TS
```ts
import { createApp } from 'discordoo/wrapper'

const client = createApp('some-discord-bot-token').build()

client.start()
.then(() => console.log('loggined in!'))
```
=== JS
```ts
import { createApp } from 'discordoo/wrapper'

const client = createApp('some-discord-bot-token').build()

client.start()
.then(() => console.log('loggined in!'))
```
