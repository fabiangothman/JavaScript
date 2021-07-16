const { taskOne, taskTwo } = require('./tasks');

//Executes both tasks at same time
//It takes 2 seconds! (The time it takes the larges task)
const main = async () => {
    try{        
        console.time("Measuring time");
        const results = await Promise.all([taskOne(), taskTwo()])
        console.timeEnd("Measuring time");

        console.log('Task one returned', results[0]);
        console.log('Task two returned', results[1]);
    }catch(err){
        console.log(err);
    }
}

main();