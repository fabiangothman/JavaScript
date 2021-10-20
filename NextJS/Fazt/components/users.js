//import React from "react";
import Router from "next/router";

const Users = (props) => {
    return (
        <div>
            <h1>Users</h1>
            <ul className="list-group">
                {
                    props.users.data.map(user => (
                        <li key={user.id}
                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            style={{cursor: 'pointer'}}
                            onClick={e => Router.push('/users/[id]', '/users/'+user.id)}>
                            <div>
                                <h5>{user.first_name} {user.last_name}</h5>
                                <p>Email: {user.email}</p>
                            </div>
                            <img src={user.avatar} alt={user.first_name+" "+user.last_name} style={{borderRadius: '50%'}} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Users;
