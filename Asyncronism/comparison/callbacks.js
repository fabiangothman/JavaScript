//Suposed example
const requestHandler = (req, res) => {
    /**
     * La piramide de la muerte o the callback hell
     */
    
    User.findById(req.userId, (err, user) => {
        //this is a callback
        if(err){
            resp.send(err);
        }else{
            Tasks.findById(user.tasksId, (err, tasks)=>{
                //this is another callback
                if(err){
                    resp.send(err);
                }else{
                    tasks.completed = true;
                    tasks.save((err)=>{
                        if(err){
                            resp.send(err);
                        }else{
                            resp.send("task completed!");
                        }
                    });
                }
            })
        }
    });  //This suposed case, is going to take a while to reponse from db
}