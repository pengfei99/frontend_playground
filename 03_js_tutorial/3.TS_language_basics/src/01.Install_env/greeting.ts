function greeting(person: string) {
    return "Hello, " + person;
  }
   
let user: string = "Jane Doe";
   
document.body.textContent = greeting(user);