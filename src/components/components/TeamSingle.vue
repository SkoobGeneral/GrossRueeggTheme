<template>
  <div
    v-if="post"
    class="container"
  >
  <div class="columns">
    <h3 class="column is-6 animated has-text-left has-text-weight-bold fadeIn" v-html="title" v-if="title && title.length"></h3>
  </div>
  <div class="columns">
      <div class="column animated fadeIn">
        <figure>
          <img :src="post.acf.picture.url" v-if="post.acf.picture.url && post.acf.picture.url.length"/>
        </figure>
      </div>
      <div class="column mb-3 has-text-left" style="margin-top: auto;">
        <h5 class="animated mb-2 fadeIn" v-html="message" v-if="message && message.length"></h5>
        <h4 class="mb-2 has-text-weight-bold animated fadeIn delay-1s" v-html="post.acf.name" v-if="post.acf.name && post.acf.name.length"></h4>
        <h6 class="animated fadeIn delay-2s" v-html="post.acf.degree" v-if="post.acf.degree && post.acf.degree.length"></h6>
        <h6 class="animated fadeIn delay-2s" v-html="post.acf.position" v-if="post.acf.position && post.acf.position.length"></h6>
        <br>
        <br>
        <h6 class="animated fadeIn delay-3s" v-if="post.acf.email && post.acf.email.length">E <span v-html="post.acf.email" v-if="post.acf.email && post.acf.email.length"></span></h6>
        <h6 class="animated fadeIn delay-3s" v-if="post.acf.telephone && post.acf.telephone.length">T <span v-html="post.acf.telephone" v-if="post.acf.telephone && post.acf.telephone.length"></span></h6>
      </div>
    </div>
  </div>
</template>
  


<script>
import Loader from '../partials/Loader.vue';
import { mapGetters } from 'vuex';

export default {
  props: [ "member", "title", "message" ],
  data() {
    return {
      post: this.post
    }
  },

  computed: {

  },

  mounted() {
    this.getPost()
  },

  methods: {
    getPost: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'team?slug=' + this.member)
      .then(response => {        
        setTimeout(() => {
          this.post = response.data[0];
        }, 20)
      })
    },
  },

  components: {
    Loader
  }
}
</script>

<style lang="scss">
  
</style>