# Starting your bot
We provide `createApp` function, which allows you to create a bot and add any options to it.

=== "JS"
```js
const { createApp } = require('discordoo')

const client = createApp('discord-bot-token').build()

client.start()
  .then(() => console.log('online!'))
```
The easiest and fastest way to create and connect a bot to Discord is shown above.

But this bot can't do anything. Let's teach it how to react to `/` commands:

--- **IN DEVELOPMENT** ---

=== "JS"

```js
const { createApp, AdvancedEventsGatewayProvider } = require('discordoo')

const client = createApp('discord-bot-token')
  .gatewayProvider(AdvancedEventsGatewayProvider)
  .build()

client.on('slashCommand', async command => {
  if (command.name === 'ping') {
    await command.reply('pong!')
  }
})

client.start().then(async () => {
  const commands = [ 
    // command names can contain only a-z, numbers and -. also, they must be lower-case and up to 32 in length.
    { name: 'ping', description: 'pong!' }
  ]
  
  if (!await client.app.commands.cache.size()) {
    await client.app.commands.register(commands)
  }
})
```
Here we use the built-in gateway provider with new events to detect `/` commands.
After the bot connects to the discord, we check whether it has a `/` commands. If there are none, then we add them.
We are adding global commands to the bot - they will be available on any servers where the bot is added.

