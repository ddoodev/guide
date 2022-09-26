# Intents
Intents are an a new concept introduced by Discord in Gateway v8.

Intents allow you to only accept intents you want. However, Discord has [**privileged intents**](https://discord.com/developers/docs/topics/gateway#privileged-intents). These kind of intents
need special approval from Discord to use, unless your bot is smaller than 100 servers.

## Using intents
Intents are exported under `GatewayIntents` enum. You can see complete list [here](https://ddoo.dev/api/constants/enums/GatewayIntents/). 
There are also some utility intents in `IntentsUtil` class - `ALL`, `NON_PRIVILEGED` and `PRIVILEGED`.

You can set intents using `gateway()` chain method:
```ts
import { createApp, GatewayIntents } from 'discordoo'

// you should use | operator to combine intents
const intents = GatewayIntents.GUILD_MESSSAGES | GatewayIntents.GUILDS
createApp('token').gateway({ intents }).build()
```

You can also use utility intents:
```ts
import { createApp, IntentsUtil } from 'discordoo'

createApp('token').gateway({ intents: IntentsUtil.ALL }).build()
```

### New intents
Discord introduces new intents for older API versions as well. You can combine them with `GatewayIntents` enum, just like you would do with plain intents, but with number instead of enum value:
```ts
import { createApp, GatewayIntents } from 'discordoo'

// you should use | operator to combine intents
const intents = GatewayIntents.GUILD_MESSSAGES | GatewayIntents.GUILDS | 1 << 12
createApp('token').gateway({ intents }).build()
```
you can check complete list of actual intents [here](https://discord.com/developers/docs/topics/gateway#list-of-intents).
