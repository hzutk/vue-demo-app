<template>
  <v-layout row wrap mb-2>
    <template v-if="short">
      <v-flex md2 class="text-md-center" v-for="el in elements">
        <v-avatar
                :size="32"
        >
          <img :src="el.icon" alt="avatar">
        </v-avatar>
      </v-flex>
    </template>
    <template v-else>
      <v-flex md4 v-for="el in elements">
        <v-card class="ma-2 pa-4 clicable" @click="$emit('showService', el.code)">
          <v-layout>
                <v-flex xs2>
                  <v-avatar
                    :size="32"
            >
              <img :src="el.icon" alt="avatar">
            </v-avatar>
                </v-flex>
                <v-flex xs10>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{el.title}}</div>
                      <div>{{el.description}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3 ellipsis">
                {{el.url}}
              </v-card-actions>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>
<script>

  import {Services} from '../api';

  export default {
    name: 'services-list',
    components: {},
    data() {
      return {}
    },
    props: {
      short: Boolean,
      codes: Array,
    },
    computed: {
      elements() {
        let services = [];
        this.codes.forEach(el => {
          services.push(Services.description(el))
        });
        return services
      },
    },
    methods: {
    }
  }
</script>

<style>
  .clicable {
    cursor: pointer;
  }

  .ellipsis {
  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
}
</style>
