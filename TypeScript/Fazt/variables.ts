//Type String:
var myString:string = "I'm a strict string";
myString = 222+"";
document.write(`Type of "myString" is ${typeof myString}.<br />`);
document.write(`Content of "myString" is ${myString}.<br /><br />`);


//Type Number:
var myNumber:number = 48;
myNumber = 22;
document.write(`Type of "myNumber" is ${typeof myNumber}.<br />`);
document.write(`Content of "myNumber" is ${myNumber}.<br /><br />`);


//Type Boolean:
var myBool:boolean = true;
myBool = false;
document.write(`Type of "myBool" is ${typeof myBool}.<br />`);
document.write(`Content of "myBool" is ${myBool}.<br /><br />`);


//Type Any:
var myAny:any = "hello";
myAny = false;
myAny = 22;
document.write(`Type of "myAny" is ${typeof myAny}.<br />`);
document.write(`Content of "myAny" is ${myAny}.<br /><br />`);


//Type Array (string):
var myArrayString: string[] = ["one", "two", "three"];
myArrayString = ["1", "2", "3"];
document.write(`Type of "myArrayString" is ${typeof myArrayString}.<br />`);
document.write(`Content of "myArrayString" is ${myArrayString}.<br /><br />`);
//Type Array (number):
var myArrayNumber: number[] = [1, 2, 3];
myArrayNumber = [4, 5, 6];
document.write(`Type of "myArrayNumber" is ${typeof myArrayNumber}.<br />`);
document.write(`Content of "myArrayNumber" is ${myArrayNumber}.<br /><br />`);
//Type Array (boolean):
var myArrayBoolean: boolean[] = [true, true, true];
myArrayBoolean = [false, false, false];
document.write(`Type of "myArrayBoolean" is ${typeof myArrayBoolean}.<br />`);
document.write(`Content of "myArrayBoolean" is ${myArrayBoolean}.<br /><br />`);
//Type Array (any):
var myArrayAny: any[] = ["four", {}, [], "word"];
myArrayAny = [4, true, "word"];
document.write(`Type of "myArrayAny" is ${typeof myArrayAny}.<br />`);
document.write(`Content of "myArrayAny" is ${myArrayAny}.<br /><br />`);


//Type Tuple (Very strict Array):
var myTuple: [string, number, boolean] = ["1", 2, false];
myTuple = ["4", 5, true];
document.write(`Type of "myTuple" is ${typeof myTuple}.<br />`);
document.write(`Content of "myTuple" is ${myTuple}.<br /><br />`);


//Type undefined:
let myUndefined: undefined = undefined;
document.write(`Type of "myUndefined" is ${typeof myUndefined}.<br />`);
document.write(`Content of "myUndefined" is ${myUndefined}.<br /><br />`);
//Type null:
let myNull: null = null;
document.write(`Type of "myNull" is ${typeof myNull}.<br />`);
document.write(`Content of "myNull" is ${myNull}.<br /><br />`);
