# Intents
Intents are an a new concept introduced by Discord in Gateway v8.

Intents allow you to only accept intents you want. However, Discord has [**privileged intents**](https://discord.com/developers/docs/topics/gateway#privileged-intents). These kind of intents
need special approval from Discord to use, unless your bot is smaller than 100 servers.

## Using intents
Intents are exported under `GatewayIntents` enum. You can see complete list [here](https://discord.com/developers/docs/topics/gateway#list-of-intents). 
There are also some utility intents in `IntentsUtil` class - `ALL`, `NON_PRIVILEGED` and `PRIVILEGED`.

You can set intents using `gateway()` chain method:
```ts
// you can use & operator to combine intents
const myIntents = GatewayIntents.GUILD_MESSSAGES & GatewayIntents.GUILDS
createApp(...).gateway({ intents: myIntents }).build()
```
