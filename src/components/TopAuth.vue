<template>
  <div class="top-auth">
    <template v-if="$root.isLoggedIn">
      <v-btn flat :to="{name: 'settings'}" active-class="selected">
        <span class="mr-2">Profiles</span>
      </v-btn>
      <v-btn flat @click="$root.logout" active-class="selected">
        <span class="mr-2">Logout</span>
      </v-btn>

    </template>
    <span v-else>
            <v-btn flat :to="{name: 'login'}" active-class="selected">
        <span class="mr-2">Sign in</span>
      </v-btn>
            <v-btn flat :to="{name: 'register'}" active-class="selected">
        <span class="mr-2">Sign up</span>
      </v-btn>
        </span>
  </div>
</template>

<script>
  export default {
    name: "top-auth",
    methods: {
    }
  }
</script>

<style>
</style>
