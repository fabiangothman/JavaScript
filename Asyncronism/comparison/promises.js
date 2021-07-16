//Suposed example
const requestHandler = (req, res) => {
    User.findById(req.userId).then((user) => {
        return Task.findById(user.tasksId)
    }).then((tasks) => {
        tasks.completed = true;
        return tasks.save();
    }).then(() => {
        res.send("Tasks completed!");
    }).catch(errs => res.send(errs))
}