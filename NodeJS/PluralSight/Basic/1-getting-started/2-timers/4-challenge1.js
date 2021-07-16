const theOneFunc = () => {};

setTimeout(theOneFunc, 4 * 1000);

// Hello after 4 seconds

// Hello after 8 seconds

// You can define only ONE function
const theOneFunc = segs => {
    console.log('Hello after '+segs+' seconds');
  };
  
function message(segs){
  setTimeout(theOneFunc, segs * 1000, segs);
}

message(4);
message(8);