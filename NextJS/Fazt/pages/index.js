//import React from "react";
import Head from "next/head";
import Container from "../components/container";
import fetch from "isomorphic-fetch";
import Users from "../components/users";

const Index = (props) => {
    return (
        <Container>
            <Head>
                <title>Next.JS psroject - Home</title>
            </Head>
            <Users users={props.users} />
        </Container>
    );
}
Index.getInitialProps = async (ctx) => {
    //const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const res = await fetch('https://reqres.in/api/users');
    const data = await res.json();
    return {
        users: data
    };
}

export default Index;
