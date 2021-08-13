# Как работает шардинг изнутри

Discordoo использует пакет `node-ipc` для пересылки сообщений между шардами. Спасибо его [авторам](https://github.com/sponsors/RIAEvangelist).

Каждый экземпляр шардинга (процесс, воркер или кластер) получает свою [снежинку](../internal-utilities/snowflakes.ru.md).

## Что происходит, когда создаётся экземпляр шардинга
**1.** IPC (Inter-Process Communication, межпроцессное общение) Клиент создаётся в процессе менеджера шардов.

**2.** [Cнежинка](../internal-utilities/snowflakes.ru.md) передаётся в экземпляр шардинга.

**3.** IPC Сервер создаётся внутри экземпляра шардинга. Он использует переданную ему снежинку в названии Unix/Windows сокета, что позволяет другим процессам найти его и обмениваться сообщениями.

**4.** IPC Клиент начинает отсылать пакет `IpcHelloPacket` на сокет, путь к которому он определил с помощью снежинки. Этот пакет содержит в себе информацию о том, сколько gateway шардов необходимо запустить и через какой интервал необходимо отсылать пакеты "сердцебиения" (у каждого Discord бота есть своё маленькое сердечко, которое бьётся раз в какое-то время и отсылает примерно такой же пакет в Discord. А Discord таким образом понимает, мёртв ли бот, который к нему подключился, или нет.). Если IPC Сервер не ответит в течение 30 секунд, экземпляр шардинга будет остановлен и перезапущен.

**5.** Когда IPC Сервер получает пакет `IpcHelloPacket`, он обязан ответить на него пакетом `IpcIdentifyPacket`. Таким образом он информирует IPC Клиент о том что он запущен и работает.

**6.** Когда IPC Клиент получает `IpcIdentifyPacket`, он начинает ждать, пока IPC Сервер не отправит пакет `IpcHeartbeatPacket`. Это называется сердцебиением. IPC Сервер обязан отправлять `IpcHeartbeatPacket` каждые несколько секунд, IPC Клиент обязан отвечать. Таким образом менеджер шардов и экземпляры шардинга понимают, что все процессы активны и работают.

**7.** Если IPC Клиент обнаружит, что не получает `IpcHeartbeatPacket` некоторое время, он остановит экземпляр шардинга и запустит его заново. Если же IPC Сервер обнаружит, что на его пакеты никто не отвечает, он будет следовать инструкциям, переданным в опциях клиента: либо завершит сам себя, либо продолжит работу в автономном режиме.

## Как IPC Клиент и IPC Сервер общаются между собой
Всё общение сводится к простому пинг-понгу. Пакеты имеют стандартизированный вид - `IpcPacket`, очень похожий на сообщения по WebSocket между Discord и ботом.

| op                                                                      | d                | t                                                                    |
|-------------------------------------------------------------------------|------------------|----------------------------------------------------------------------|
| специальный код оперирования, который говорит о том, что нужно делать с этим пакетом. | разная информация в JSON. | если код операции - 0, `t` будет содержать тип события этого пакета, например `RESTRUCTURING`. |