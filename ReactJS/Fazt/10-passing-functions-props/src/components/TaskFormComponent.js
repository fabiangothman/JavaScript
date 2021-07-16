import React, { Component } from "react";
 
export default class TaskFormComponent extends Component {
    
    //El estado va a almacenar un objeto de task
    state = {
        titulo: "",
        descripcion: ""
    };

    onSubmit = event => {
        event.preventDefault();        
        console.log(this.state);

        //Los PROPS ya pertenecen a la clase con palabra reservado
        this.props.addNewTask(this.state);
    }
    
    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //Render es un método y palabra reservada
    render() {
        
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input type="text" name="titulo" placeholder="Write a task title" onChange={this.onChange} value={this.state.titulo} />
                    </div>
                    <div>
                        <textarea name="descripcion" placeholder="Write here a task description" onChange={this.onChange} value={this.state.descripcion} ></textarea>
                    </div>
                    <div>
                        <input type="submit" value="Create" />
                    </div>
                </form>
            </div>
        );
    }

}

//export default TaskFormComponent;