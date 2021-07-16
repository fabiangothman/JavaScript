//Snippet: rcc
import React, { Component } from 'react'

export default class PostComponent extends Component {

    state = {
        posts: []
    }
    
    //Este método (de palabra reservada) se ejecuta solo una vez el Componente YA ha sido montado, cargado.
    // async hace referencia a que será asincrónico el llamado y esperará
    async componentDidMount(){

        //Debe manejarse de manera ASINCRONA
        let resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        resp = await resp.json();
        this.setState({posts: resp});
    }
    
    render() {
        return (
            <div>
                {this.state.posts.map(post => {
                    return(
                        <div style={{margin:'20px 10px'}} key={post.id}>
                            <div>{post.title}</div>
                            <div>{post.body}</div>
                        </div>
                    );
                })}
            </div>
        )
    }
}
