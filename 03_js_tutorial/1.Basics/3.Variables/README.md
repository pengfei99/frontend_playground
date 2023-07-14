# Variables

Variables are used to store this information. 

## Variable
A **variable is a “named storage” for data**. We can use variables to store goodies, visitors, and other data.

To create a variable in JavaScript, use the **let** keyword.

The statement below creates (in other words: declares) a variable with the name “message”:
```javascript
//create a variable
let message;

message = 'Hello'; // store the string 'Hello' in the variable named message
```

We can also define multiple variables:
```javascript
let user = 'John', age = 25, message = 'Hello';
```

### variable are mutable

In JS, a variable is mutable, which means you can modify the value of a variable at all time. 
Run the below example, and check the result
```javascript
//create a variable
let message = 'Hello'; 

alert(message)

message = "World";

alert(message)

```

> A variable name can only be defined one time, otherwise an error will be raised

The below example is a bad example:

```javascript
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```

### Variable naming convention

JS variable is **case-sensitive**. It's recommended to use `camo_case`, and you can't use the reserved JS keywords 
such as `let, class, return, and function`. 

## Constants

**To declare a constant (unchanging) variable, use the keyword const**

Run the below example. When you try to assign new values to a const, an error will be raised.

```javascript
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```

### Uppercase constants

Sometimes, we define uppercase constants:

```javascript
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

It has the below benefits:
 - COLOR_ORANGE is much easier to remember than "#FF7F00". 
 - It is much easier to mistype "#FF7F00" than COLOR_ORANGE. 
 - When reading the code, COLOR_ORANGE is much more meaningful than #FF7F00.


We define uppercase constants, when they are known prior to execution (like a hexadecimal value for red). Otherwise, for 
constants that are calculated in run-time, during the execution, but do not change after their initial assignment, we 
can just use the normal naming convention.