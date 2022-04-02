<template>
  <div class="test">
    <h1>Hey there <span>friend</span> from {{ title }} {{2+2}}!.</h1>
    <h2>User is <i>{{ user.name }}</i> {{ user.lastname }}.</h2>
    <div v-text="title" />
    <div v-html="myHtml" />
    <div v-if="showName">
      <p>Contenido a mostrarse si showName: true</p>
    </div>
    <div v-else>
      <p>No hay nada que mostrar porque showName: false</p>
    </div>
    <hr />
    <ul>
      <li v-for="task in tasks" :key="task.title">
        {{ task.action }}
      </li>
    </ul>
    <input type="text" v-model="user.name" />
    <button type="button" v-on:click="greetings(user.name)">
      GREETINGS
    </button>
    <hr />
    <div>
      <input type="text" v-on:keyup="typing" value="type" />
    </div>
    <div>
      <input type="text" v-on:keyup.enter="typingEnter" value="type and enter"  />
    </div>
    <hr />
    <div>
      {{ fullName }}
    </div>
    <hr />
    <div>
      {{ `message: ${message}` }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data() {
      return {
        title: 'Test.vue',
        user: {
          name: 'Joe',
          lastname: 'McMillan',
        },
        myHtml: `<h3>Message from variable</h3>`,
        showName: true,
        tasks: [
          {action: 'cook', time: 'morning'},
          {action: 'workout', time: 'afternoon'},
          {action: 'sleep', time: 'night'},
        ],
      }
    },
    methods: {
      greetings(name) {
        alert(`Hey there ${name}!`);
      },
      typing: function(event) {
        console.log(`Event.target.value: `, event.target.value);
      },
      typingEnter: (event) => {
        console.log(`Event.target.value: `, event.target.value);
      }
    },
    computed: {
      fullName() {
        return this.user.name + " " + this.user.lastname;
      }
    },
    props: {
      message: {
        type: String,
        default: "Default message"
      }
    },
  }
</script>

<style media="screen">
  .test {
    background-color: skyblue;
  }
</style>
