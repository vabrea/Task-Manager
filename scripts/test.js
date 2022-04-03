function Dog(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
  }
class Cat{
    constructor(name,color){
        this.name=name;
        this.color=color;
    }
}

function objTest(){
    console.log("Test for creating objects");


// obj literal
let dog = {
    name: "fido",
    age: 8,
};

//obj contructor

let alex = new Dog("alex", 3, "red");
let sona = new Dog("sona",4,"green");
    console.log(alex);
    console.log(sona);

// class
    let garfield = new Cat("Garfield", "orange");
    console.log(garfield);
}
