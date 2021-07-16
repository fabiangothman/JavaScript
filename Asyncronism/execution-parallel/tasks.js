const util = require("util");
const sleep = util.promisify(setTimeout);

module.exports = {
    async taskOne () {
        try{
            await sleep(1000);
            throw new Error("Some problem");
            await sleep(3000);
            return "Value one";
        }catch(err){
            console.log(err);
        }
    },
    async taskTwo() {
        try{
            await sleep(2000);
            return "Value two";
        }catch(err){
            console.log(err);
        }
    }
}