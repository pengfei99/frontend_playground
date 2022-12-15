# JavaScript overview

## Quick start

Below are the basic instuctions of js

```javascript
// To define a variable
var x=10;
var y=20;

// to declare a function
function add( a, b ) {
   return a + b;
}

// define a function that throws exception
function divide(a,b){
    if(b==0){
        throw 'Division by zero';
    }
    return a/b;
}

// call a function
let res=add(x,y);

//log the result into the console window of the web browser
console.log(res);

// declare an array
// There are differences between var and let. And it’s a good practice to use the let keyword to declare variables.
let items = [1,2,3];

console.log(items.length);

console.log(items[i])

//loop an array
for (let item of items){
    console.log(item);
}
```

You can try the above code by using the **Dev tools** of your browser.

In chrome: more tools->Developper tools->Console

## Embed Js code in an HTML page

Placing JavaScript code inside the `<script>` element directly is not recommended and should be used only for proof of concept or testing purposes.


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JavaScript Hello World Example</title>
    <script>
        alert('Hello, World!');
    </script>
</head>
<body>
</body>
</html>
```

## Include an external Js file


```javascript
//app.js
alert('Hello, World!');
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JavaScript Hello World Example</title>
    <script src="js/service.js"></script>
    <script src="js/app.js"></script>
</head>
<body>

</body>
</html>
```

If you launch the `helloworld.html` file in the web browser, you will see an alert that displays the Hello, World! message.