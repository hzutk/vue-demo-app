<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md12>
        <v-card v-if="currentProfile" class="elevation-12">
          <v-toolbar>
            <v-toolbar-title>
              {{currentProfile.name}}
              <span class="subheading">{{currentProfile.description}}</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>

            <services-list :codes="currentProfile.services" @showService="showService"></services-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <service-view :visibleDialog.sync="visibleServiceView" :code="currentServiceCode"></service-view>
  </v-container>
</template>
<script>

  import ServicesList from './ServicesList'
  import ServiceView from './ServiceView'

  export default {
    name: 'dashboard',
    components: {ServicesList, ServiceView},
    data() {
      return {
        currentServiceCode: "",
        visibleServiceView: false,
        profileId: 0,
      }
    },
      props: {
      short: Boolean,
      code: String,
    },
  computed: {
      currentProfile() {
        return this.$store.getters.currentProfile;
      },
    },
    mounted() {
      this.setProfileId();
    },
    methods: {
      setProfileId() {
        if (this.$route.params.id) {
          this.$store.dispatch('setProfileId', this.$route.params.id);
        }
      },
      showService(code) {
        this.currentServiceCode = code;
        this.visibleServiceView = true;
      },
    },
    watch: {
      '$route'(to, from) {
        this.setProfileId();
      },
    },
  }
</script>
