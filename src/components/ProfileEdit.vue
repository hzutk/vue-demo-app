<template>
  <v-dialog v-model="visibleDialog" persistent max-width="500px">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          Profile
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field
                v-model="item.name"
            label="Name"
          ></v-text-field>
        <v-textarea
                v-model="item.description"
          label="Description"
        ></v-textarea>
        <services-list :short="true" :codes="item.services"></services-list>
        <v-btn color="info" @click="randomServices">Add random services</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" flat @click="saveItems">Save</v-btn>
        <v-btn flat @click="$emit('update:visibleDialog', false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

  import {Services} from '../api'

  import ServicesList from './ServicesList'

  export default {
    name: "profile-edit",
    components: {ServicesList},
    data: function () {
      return {
      }
    },
    props: {
      visibleDialog: {
        default: false
      },
      item: Object
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      randomServices() {
        this.item.services = Services.getRandomServicesCodes();
      },
      // removeItem(idx) {
      //   this.formItems.splice(idx, 1);
      // },
      saveItems() {
        this.$emit('saveHideEditor', {id: this.item.id, name: this.item.name, description: this.item.description, services: this.item.services})
      },
      // addItem() {
      //   this.formItems.push({text: "", value: ""});
      // },
    },
  }
</script>

<style scoped>
  .template-reference-edit-scroll {
    max-height: 300px;
  }
</style>
