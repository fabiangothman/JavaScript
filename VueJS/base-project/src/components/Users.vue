<template>
  <div class="users">
    <h1>Users list</h1>
    <ul>
      <li v-for="user in users" :key="user.name">
        {{ `${user.name} ${user.email}` }}
        <button v-on:click="deleteUser(user)">X</button>
      </li>
    </ul>
    <form v-on:submit="showMessage">
      <button type="submit">Show message</button>
    </form>
    <br />
    <form v-on:submit.prevent="addUser">
      <input type="text" v-model="newUser.name" placeholder="Insert name">
      <input type="email" v-model="newUser.email" placeholder="Insert email">
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      users: [],
      newUser: {},
    }
  },
  methods: {
    showMessage: function(ev) {
      ev.preventDefault();
      alert("User added");
    },
    addUser: function() {
      this.users.push(this.newUser);
      this.newUser = {};
    }, 
    deleteUser: function(user) {
      console.log("deleting ...");
      this.users.splice(this.users.indexOf(user), 1);
    },
  },
  created() {
    this.$http.get("https://jsonplaceholder.typicode.com/users").then(resp => {
      this.users = resp.body;
    })
  },
}
</script>

<style lang="css">
  .users {
    background-color: blueviolet;
    color: white;
    padding: 20px;
  }
</style>
