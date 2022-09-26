# Introduction
## What is Discordoo?
Discordoo is a next generation API interaction library for Discord. It was built from ground-up
to give a new look on Discord libraries - fast, scalable and easy to use. Also, we have Waifoo - opinionated
Discordoo-based framework for building scalable and performant apps.
### Why not Eris or Discord.js?
Eris is fast, Discord.js has neat APIs. Discordoo takes best of both worlds.

## Getting started
We will quickly overview all essential parts of Discordoo library.
### Installing
Discordoo is publicly available on [npm](https://npmjs.com/discordoo). Install it using `npm install` command.
```shell
$ npm install discordoo
# or if you are yarn adept
$ yarn add discordoo
```

### Starting your bot
Awesome! But our bot doesn't even exist now. Let's fix this!

Create an `index.ts` file with following contents:

```ts
import { createApp } from 'discordoo'
const token = 'MY TOP SECRET TOKEN'

const client = createApp(token).build()

client.start().then(() => {
    console.log('Started!')
})
```

You can run this file using `ts-node` or your local `TypeScript` toolchain.

```shell
$ npx ts-node ./index.ts
```

You can also use Discordoo with plain JavaScript:
```js
const { createApp } = require('discordoo')
const token = 'MY TOP SECRET TOKEN'

const client = createApp(token).build()

client.start().then(() => {
  console.log('Started!')
})
```

 
:tada: You now should see your bot appear online

### Events
Since Discord is **realtime** messenger, we should receive something in realtime, shouldn't we?

Discordoo uses concept of events. It is pretty widespread within node.js ecosystem.
If you are unfamiliar with it, for some reason, here is quick overview:

Event listeners listen to **some events**, when they "hear" event, it will run **event handler** and pass
**arguments** to it. Arguments for each event are individual, however aren't exclusive.

To create an event listener, Discordoo uses `.on` method. It accepts two parameters - a string and a function.
String is event name, function is an event handler.

One of the most widespread events is `ready`. It runs once Discordoo has connected to 
Discord servers and is ready to operate.

Put this piece of code between `main` function and `client` declaration:
```ts
client.on('ready', () => {
  console.log('ready!')
})
```

You should now see `ready!` message in console after a few seconds of Discordoo reaching Discord servers.

### Entities
Server, roles, users, server members, messages and even audit logs - these are few examples of entities. 
Entities represent a piece of data associated with Discord. Most of the entities are split into two parts - actions and data.

Data is information about entity - name, unique identified(id or snowflake) and other entity-specific things.

Actions allow you to change this data. Using actions you can ban user, for example. It will change this member's data, audit logs, guild data.

Let's try to access some!

Second most used event is `messageCreate`. It fires(runs) each time bot sees a new message appearing.
Let's try to log which members sent messages.

Put this piece of code somewhere near our `ready` event handler.

```ts
client.on('messageCreate', ctx => {
  console.log(`user ${ctx.author.tag} sent a message!`)
})
```

What's that `ctx` variable you might ask. It is a context variable. It usually contains entities and other data you might be interested in. You can find more about specific context variables in [API Reference](https://ddoo.dev/api). Just search for `<event-name>EventContext`, for example, [`MessageCreateEventContext`](https://ddoo.dev/api/events/interfaces/MessageCreateEventContext).

:::warning
Due to recent Discord policies, you have to set up intents to access message's content.

See [Intents](/docs/guide/intents) for details
:::

## Congratulations!
:tada: :tada: :tada: You know all basics of Discordoo! Now you can create your own Discord bots with Discordoo! Head over to next part if you want to dive into Discordoo.
