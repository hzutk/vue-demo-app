<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Registration</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form @submit.prevent="register">

                <v-text-field id="name" prepend-icon="person" name="name" label="Name" type="text" v-model="name"
                              placeholder="Name"
                              required autofocus></v-text-field>
                <v-text-field id="email" prepend-icon="email" name="email" label="E-mail" type="email" v-model="email"
                              placeholder="E-mail" title="E-mail" required></v-text-field>
                <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"
                              v-model="password"
                              placeholder="Password" title="Password" required></v-text-field>
                <v-text-field id="password-confirm" prepend-icon="lock" name="password" label="Password confirm"
                              type="password" v-model="password_confirmation" placeholder="Password confirm"
                              title="Password confirm" required></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register">Signup</v-btn>
        </v-card-actions>
    </v-card>

</template>
<script>
  export default {
    name: 'register-form',
    data() {
      return {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        is_admin: true,

      }
    },
    props: {
    },
    computed: {
    },
    methods: {
      register: function () {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin
        }
        this.$store.dispatch('register', data)
          .then(() => {
              this.$router.push('/')
          })
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
    /*@import "../assets/auth.css";*/
</style>
