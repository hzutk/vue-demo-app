<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-card-text>
            <v-list two-line>
          <template v-for="(item, index) in profiles">
            <v-list-tile
              :key="item.title"
              avatar
              @click=""
            >
              <v-list-tile-avatar>
              <v-icon>face</v-icon>
            </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="editItem(item.id)">
                  <v-icon>edit</v-icon>
                </v-btn>
            </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon @click="removeItem(item.id)">
                  <v-icon>delete</v-icon>
                </v-btn>
            </v-list-tile-action>
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addItem()">Add profile</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        <profile-edit :visibleDialog.sync="visibleItemEdit" :item="currentItem" @saveHideEditor="saveHideItemEditor"></profile-edit>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

  import ProfileEdit from './ProfileEdit'

  export default {
    name: 'settings',
    components: {ProfileEdit},
    data() {
      return {
        visibleItemEdit: false,
        currentItem: {
            id: 0,
            name: "",
            description: "",
            services: [],
        }

      }
    },
    computed: {
      profiles() {
        return this.$store.getters.profiles
      },
    },
    methods: {
      addItem() {
        this.currentItem = {
            name: "",
            description: "",
            services: [],
        };
        this.visibleItemEdit = true;
      },
      saveHideItemEditor(profile) {
        if (profile.id) {
          this.$store.dispatch('patchProfile', profile);
        } else {
          this.$store.dispatch('addProfile', profile);
        }
        this.visibleItemEdit = false;
      },
      editItem(profileId) {
        this.currentItem = this.$store.getters.getProfileById(profileId);
        this.visibleItemEdit = true;
      },
      removeItem(profileId) {
        this.$store.dispatch('removeProfile', profileId)
      }
    }
  }
</script>
