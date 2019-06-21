<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <login-form></login-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import LoginForm from './LoginForm'

  export default {
    name: 'login',
    components: {LoginForm},
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
    /*@import "../assets/auth.css";*/
</style>
