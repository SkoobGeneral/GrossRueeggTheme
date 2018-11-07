<template>
  <b-container class="bv-example-row pt-4">
    <template v-if="post">
      <h1>{{ post.title.rendered }}</h1>
      <p><strong>Name:</strong> {{post.acf.name}}</p>      
      <p><strong>Position:</strong> {{post.acf.position}}</p>      
      <a @click="fadeThis()" :class="{'fade': fade}">asdfxz</a>
      <div v-html="post.content.rendered"></div>
    </template>
    <Loader v-else />
  </b-container>
</template>

<script>
import Loader from '../partials/Loader.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      post: false,
      fade: false
    }
  },

  computed: {

  },

  beforeMount() {
    this.getPost()
  },

  methods: {
    getPost: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'posts?slug=' + this.$route.params.postSlug)
      .then(response => {
        this.post = response.data[0];
      })
      .catch(e => {
        console.log(e);
      })
    },
    fadeThis: function() {
      this.fade = !this.fade
    }
  },

  components: {
    Loader
  }
}
</script>

<style lang="scss">
  .fade {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
  }
</style>