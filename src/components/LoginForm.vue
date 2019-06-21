<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form @submit.prevent="login">
                <v-text-field id="email" prepend-icon="email" name="email" label="E-mail" type="email" v-model="email"
                              placeholder="E-mail" title="E-mail" required></v-text-field>
                <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"
                              v-model="password"
                              placeholder="Password" title="Password" required></v-text-field>
            </v-form>
            <v-alert
      :value="!!errorMessage"
      type="error"
    >
      {{errorMessage}}
    </v-alert>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
        </v-card-actions>
    </v-card>


</template>
<script>
  export default {
    name: "login-form",
    data() {
      return {
        email: "",
        password: "",
        errorMessage: ""
      }
    },
    props: {
      popup: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      login: function () {
            let email = this.email
            let password = this.password
            this.errorMessage = "";
            this.$store.dispatch('login', {email, password})
              .then((resp) => {
                // console.log("login then", resp);
                if (resp.data.auth) {
                  if (!this.popup) {
                    this.$router.push('/')
                  }
                } else {
                  // console.log("auth false", resp.data.message);
                  if (resp.data.error) {
                    this.errorMessage = resp.data.message
                  }
                }
              })
              .catch(err => {
                // console.log(err);
              })
      }
    }
  }
</script>

<style scoped>
</style>
