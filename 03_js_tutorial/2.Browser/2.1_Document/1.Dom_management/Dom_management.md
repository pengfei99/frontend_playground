# DOM



## What is the DOM?

The DOM is a W3C (World Wide Web Consortium) standard.

The DOM defines a standard for accessing documents:

"The W3C Document Object Model (DOM) is a platform and language-neutral interface that allows programs and scripts to dynamically access and update the content, structure, and style of a document."

The W3C DOM standard is separated into 3 different parts:

Core DOM - standard model for all document types
XML DOM - standard model for XML documents
HTML DOM - standard model for HTML documents


## What is the HTML DOM?

`The HTML DOM is a standard object model and programming interface for HTML`. It defines:

- The HTML elements as objects
- The properties of all HTML elements
- The methods to access all HTML elements
- The events for all HTML elements

In other words: The HTML DOM is a standard for how to get, change, add, or delete HTML elements.

When a web page is loaded, the browser creates a **Document Object Model(DOM)** of the page.

The HTML DOM model is constructed as a tree of Objects:

![The HTML DOM Tree of Objects](../../../images/json_dom.gif)

With the object model, JavaScript gets all the power it needs to create dynamic HTML:

- JavaScript can change all the HTML elements in the page
- JavaScript can change all the HTML attributes in the page
- JavaScript can change all the CSS styles in the page
- JavaScript can remove existing HTML elements and attributes
- JavaScript can add new HTML elements and attributes
- JavaScript can react to all existing HTML events in the page
- JavaScript can create new HTML events in the page

## Understanding the DOM structure

Check the below `index.html` file, put it in the `src/index.html`, then open it with a browser (or open with live server). 

```html
<!DOCTYPE html>
<html lang="en">
<head>
<title>Learning the DOM</title>
</head>
<body>
<h1>Document Object Model</h1>
</body>
</html>
```

You can view the html page in the `developper mode`, in the element tab, or type `document` in the console tab, you can view the full content of document object.

> In our case, you will notice there is no differences between document content and html page.

There are two instances in which the browser-generated DOM will be different than HTML source code:
   - The DOM is modified by client-side JavaScript
   - The browser automatically fixes errors in the source code

#### Changing the htlml file with client side js 

Type the below code on the console tab. You will notice the background color of the main page are changed

```js
# get the content of document body
document.body;

# change the style of the html script
document.body.style.backgroundColor = 'fuchsia';
```

Go the element tab again, you will notice the html code has been changed. However, 
right click on the page and select “View Page Source”. You will notice that the source 
of the website does not contain the new style attribute we added via JavaScript. The 
source of a website will not change and will never be affected by client-side JavaScript. 
If you refresh the page, the new code we added in the console will disappear.

#### Browser auto correcting html file

The other instance in which the DOM might have a different output than
HTML source code is when there are errors in the source code. One
common example of this is the table tag — a tbody tag is required
inside a table, but developers often fail to include it in their HTML. The
browser will automatically correct the error and add the tbody,
modifying the DOM. The DOM will also fix tags that have not been
closed.

## Understanding the DOM Tree and Nodes
          
The DOM is often referred to as the DOM tree, and consists of a tree of
objects called nodes.