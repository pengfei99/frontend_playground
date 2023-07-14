# JS code structure

The building blocks of the JS code is statement. A script is a list of statements.

## Statements

**Statements are syntax constructs and commands that perform actions.**

We’ve already seen a statement, `alert('Hello, world!')`, which shows the popup message “Hello, world!”.

We can have as many statements in our code as we want. Statements can be separated with a **semicolon**.

For example, here we split “Hello World” into two alerts:

```javascript
alert('Hello');
alert('World');
```

## semicolon

Semicolon is used to separate statements. In some cases, it can be omitted, and js interpreter will fill them automatically.
*But I don't recommend to do this. It can lead many errors**

A good use case: The below code will run exactly as the above code. Thanks to the `a newline implies a semicolon.`

```javascript
alert('Hello')
alert('World')
```

A bad use case: The below two example will print different result.

```javascript
alert("Hello");

[1, 2].forEach(alert);
```

```javascript
alert("Hello")

[1, 2].forEach(alert);
```

Because the interpreter will see the second code as `alert("Hello")[1, 2].forEach(alert);`

## Comments

JS uses the same comments as Java 

### Single line comments

```javascript
// This comment occupies a line of its own
alert('Hello');

alert('World'); // This comment follows the statement
```

### Multi line comments

```javascript
/* An example with two messages.
This is a multiline comment.
*/
alert('Hello');
```

> Nested comments are not supported! There may not be /*...*/ inside another /*...*/.

Such code will die with an error:
```javascript
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```

## Modern mode
**ECMAScript 5 (ES5)** added new features to the language and modified some of the existing ones.
But to keep the old code working, most new features are off by default. You need to explicitly enable them with a 
special directive: "use strict".

**Please make sure that "use strict" is at the top of your scripts, otherwise strict mode may not be enabled.**

Below example is a bad one:

```javascript
alert("some code");
// "use strict" below is ignored--it must be at the top

"use strict";

// strict mode is not activated
```

> There is no directive like "no use strict" that reverts the engine to old behavior. Once we enter strict mode, there’s no going back.

Modern JavaScript supports “classes” and “modules” – advanced language structures, 
that enable use strict automatically. So we don’t need to add the "use strict" directive, if we use them.