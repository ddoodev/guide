# Step 2 - Starting your bot
Once you have created your project, you will have something like this in your
`index.ts` file -

```ts
import { createApp, BotModule } from "discordoo/wrapper"
import fs from "fs"

class MyBot extends BotModule {
  constructor() {
    super()
    this.on("message", message => {
      message.reply("Hello from Discordoo!")
    })
  }
}

createApp(MyBot).sharding(true).start(fs.readFileSync("../token.txt", "utf-8"))
```
