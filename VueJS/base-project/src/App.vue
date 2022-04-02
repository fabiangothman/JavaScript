<template>
  <div id="app">
    <h1 class="hello">Hey there <span>friend</span> from App.vue!.</h1>
    <HelloWorld />
    <Test message="Hello I'm a message from father component!" />
    <Users />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Test from './components/Test';
import Users from './components/Users';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Test,
    Users
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
