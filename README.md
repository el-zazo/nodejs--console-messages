# Display Messages in Console By Color

## Message Types

- error
- warning
- succes
- normal

## Text with `\n`

Set `\n` in text for Create New Line With `Pointer` And `Ligne Number`

code:

```js
const CM = new ConsoleMessages();
CM.[type]("Message 1\nMessage 2\n\nMessage Fin")
```

result:

```txt
> 00001 | Message 1
> 00002 | Message 2
> 00003 |
> 00004 | Message Fin
```

## Many Messages Display

code:

```js
const CM = new ConsoleMessages();
CM.[type]("Message 1\n\n", "Message 2", [1, 2, 3, 4], "Message Fin");
```

result:

```txt
> 00001 | Message 1 √
> 00002 |
> 00003 | Message 2 [ 1, 2, 3, 4 ] Message Fin √
```
# nodejs--console-messages
