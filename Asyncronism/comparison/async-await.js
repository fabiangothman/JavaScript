//Suposed example
const requestHandler = async (req, res) => {
    try{
        const user = await User.findById(req.userId);
        const tasks = await Task.findById(user.tasksId);
        tasks.completed = true;
        await tasks.save();
        res.send("Tasks completed!");
    }catch(err){
        res.send(errs);
    }
}