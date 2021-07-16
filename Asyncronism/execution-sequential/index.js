const { taskOne, taskTwo } = require('./tasks');

//Executes each task after finish other
//It takes 3 seconds! (The time it takes the sum of both tasks)
const main = async () => {
    try{        
        console.time("Measuring time");
        const valueOne = await taskOne();
        const valueTwo = await taskTwo();
        console.timeEnd("Measuring time");

        console.log('Task one returned', valueOne);
        console.log('Task two returned', valueTwo);
    }catch(err){
        console.log(err);
    }
}

main();