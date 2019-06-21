<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>public-api</span>
        <span class="font-weight-light">demo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
      v-model="menu"
      :close-on-content-click="true"
      :nudge-width="200"
      :nudge-left="100"
      transition="slide-y-reverse-transition"
      offset-y
    >
      <template v-slot:activator="{ on }">

        <v-btn
                icon
          v-on="on"
        >
          <v-badge color="red">
      <template v-slot:badge>
        <span>{{badge}}</span>
      </template>
      <v-icon>group</v-icon>
    </v-badge>

        </v-btn>
      </template>

      <v-card>
                    <v-list>
          <template v-for="(item, index) in profiles">
            <v-list-tile
              :key="item.title"
              avatar
              :to="{name: 'dashboard', params: { id: item.id }}"
              @click="goToDashboard(item.id)"
            >
              <v-list-tile-avatar>
              <v-icon>face</v-icon>
            </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
            <v-alert v-if="profiles.length === 0"
                     :value="true"
                     color="info"
                     icon="info"
                     outline
            >
              No profiles
            </v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn flat @click="menu = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
      <v-spacer></v-spacer>
      <top-auth></top-auth>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TopAuth from './components/TopAuth'

export default {
  name: 'App',
  components: {
    TopAuth
  },
  data () {
    return {
      menu: false,
      hints: false,
      message: false,
      fav: false,
      items: [
        {title: "u1"},
        {title: "u2"},
        {title: "u3"},
        {title: "u4"},
        {title: "u5"},
        ]
    }
  },
  computed: {
      badge() {
        return this.$store.getters.getItemsCount
      },
        profiles() {
        return this.$store.getters.profiles
      },
  },
  methods: {
    goToDashboard(profileId) {

    }
  }


}
</script>
