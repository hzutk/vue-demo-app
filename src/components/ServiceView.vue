<template>
  <v-dialog v-model="visibleDialog" fullscreen hide-overlay persistent>

    <v-card>
      <v-toolbar dark color="primary">

        <v-toolbar-title v-if="description">api response {{description.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="$emit('update:visibleDialog', false)">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-layout row wrap mb-2>
          <v-flex md4 v-for="el in elements">
            <v-card class="ma-2 pa-4" :class="{ clicable: el.link}" @click="openLink(el.link)">
              <v-layout>
                <v-flex v-if="el.img" xs5>

                  <v-img
                          :src="el.img"
                          height="125px"
                          contain
                  ></v-img>
                </v-flex>
                <v-flex :class="{ xs7: el.img}">
                  <v-card-title primary-title class="ellipsis">
                    <div>
                      <div class="headline">{{el.title}}</div>
                      <div>{{el.description}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3 ellipsis">
                {{el.link}}
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

  import {Services} from '../api'

  import ServicesList from './ServicesList'

  export default {
    name: "service-view",
    components: {},
    data: function () {
      return {
        elements: []
      }
    },
    props: {
      visibleDialog: {
        default: false
      },
      code: String
    },
    mounted() {
      this.fetchList();
    },
    computed: {
      description() {
        return Services.description(this.code)
      },
    },
    methods: {
      fetchList() {
        this.elements = [];
        Services.list({code: this.code}, {}).then((res) => {
          this.elements = res;
        });
      },
      openLink(link) {
        if (link) {
          window.open(link, '_blank')
        }
      },
    },
    watch: {
      visibleDialog: function (val) {
        if (val) {
          this.fetchList();
        }
      },
    }

  }
</script>

<style scoped>
    .ellipsis {
  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
}

</style>
