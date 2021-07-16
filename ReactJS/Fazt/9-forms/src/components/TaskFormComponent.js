import React, { Component } from "react";
 
class TaskFormComponent extends Component {
    state = {
        titulo: "",
        descripcion: ""
    };

    onSubmit = event => {
        event.preventDefault();        
        console.log(this.state);
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
                        <input type="text" name="titulo" placeholder="Write a task title" onChange={this.onChange} value={this.titulo} />
                    </div>
                    <div>
                        <textarea name="descripcion" placeholder="Write here a task description" onChange={this.onChange} value={this.descripcion} ></textarea>
                    </div>
                    <div>
                        <input type="submit" value="Create" />
                    </div>
                </form>
            </div>
        );
    }

}

export default TaskFormComponent;