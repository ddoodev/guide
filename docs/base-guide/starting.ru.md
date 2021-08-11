# Первый код и запуск
Основной способ создания и настройки нового бота - функция `createApp`. Используйте её:

=== "JS"
```js
const { createApp } = require('discordoo')

// discord-bot-token - токен вашего бота. не бойтесь, мы его не украдём.
const client = createApp('discord-bot-token').build()

client.start()
  .then(() => console.log('online!'))
```
Это самый быстрый и простой способ.

Вот только такой бот ничего не умеет, он только висит онлайн. Давайте научим его реагировать на `/` команды:

--- **В РАЗРАБОТКЕ** ---

=== "JS"

```js
const { createApp, AdvancedEventsGatewayProvider } = require('discordoo')

const client = createApp('discord-bot-token')
  .gatewayProvider(AdvancedEventsGatewayProvider)
  .build()

client.on('interactionCreate.slashCommand', async command => {
  if (command.name === 'ping') {
    await command.reply('pong!')
  }
})

client.start().then(async () => {
  const commands = [ 
    // названия команд могут содержать только английский алфавит, цифры и -. 
    // также они должны быть написаны маленькими буквами и не могут быть длиной больше чем 32 символа.
    { name: 'ping', description: 'pong!' }
  ]
  
  if (!await client.app.commands.cache.size()) {
    await client.app.commands.register(commands)
  }
})
```
Выше мы используем встроенный gateway провайдер под названием `AdvancedEventsGatewayProvider`.
Мы не будем останавливаться на том, что же такое gateway провайдер, достаточно знать что конкретно этот gateway провайдер добавляет новые события в клиент, такие как `interactionCreate.slashCommand`.

В этом коде после того как клиент подключится к Discord, мы проверяем наличие у него `/` команд. Если их нет, то создаём.
Создаём мы глобальные команды - они будут доступны на всех серверах на которые добавят вашего бота.
