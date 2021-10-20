//import React from "react";
import Head from "next/head";
import Container from "../../components/container";
import fetch from "isomorphic-fetch";
import { useRouter } from "next/router";

const User = ({user}) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container>
            <Head>
                <title>Next.JS psroject - About</title>
            </Head>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header text-center">
                            <img src={user.avatar} alt="" style={{borderRadius: '50%'}} />
                        </div>
                        <div className="card-body text-center">
                            <h3>{user.id}. {user.first_name} {user.last_name}</h3>
                            <p>Email: {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
User.getInitialProps = async (ctx) => {
    //const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const res = await fetch('https://reqres.in/api/users/'+ctx.query.id);
    const { data } = await res.json();
    return {
        user: data
    };
}

export default User;
