<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <register-form></register-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import RegisterForm from './RegisterForm'

  export default {
    name: 'login',
    components: {RegisterForm},
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped>
  /*@import "../assets/auth.css";*/
</style>
