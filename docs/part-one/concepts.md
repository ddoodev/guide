# Concepts
In this chapter, we will review some basic concepts behind Discordoo and Discord API itself.
## Discord API
### Gateway API and REST API
Do you remember event handlers and entities? Both are backed by Gateway API and REST API respectively.

REST API is mostly used to get entities and perform actions on them. Whereas Gateway API is used to get realtime events from Discord.
## Providers
Now back to Discordoo. Internally, Discordoo uses powerful system of **providers**. They allow you to redefine internal behaviour of the library.
For example, we can ask Discordoo to consume events not from Gateway API but from RabbitMQ or NATS queue. 

However, you will rarely use them. But if you will need them, it will become an insanely powerful tool.

You will learn more about them in following chapters.
