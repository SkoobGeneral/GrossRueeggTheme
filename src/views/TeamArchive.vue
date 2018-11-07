<template>
  <b-container class="bv-example-row pt-4 mt-3 mb-5">
    <p class="title is-1 has-text-centered has-text-weight-light animated fadeIn">Team</p>
    <template>
      <div
        v-for="(post, index) in posts"
        v-if="posts && posts.length"
      > <div class="columns container mt-5">
          <div class="column animated fadeIn" style="text-align: right;">
            <figure>
              <img :src="post.acf.picture.url" style="max-height: 270px;" v-if="post.acf.picture.url && post.acf.picture.url.length" />
            </figure>
          </div>
          <div class="column mb-3" style="margin-top: auto;">
            <h5 class="mb-2 animated fadeIn delay-1s" style="font-weight: 600;" v-html="post.acf.name" v-if="post.acf.name && post.acf.name.length"></h5>
            <h6 class="animated fadeIn delay-1s" v-html="post.acf.degree" v-if="post.acf.degree && post.acf.degree.length"></h6>
            <h6 class="animated fadeIn delay-1s" v-html="post.acf.position" v-if="post.acf.position && post.acf.position.length"></h6>
            <br>
            <br>
            <h6 class="animated fadeIn delay-2s" v-if="post.acf.email && post.acf.email.length">E <span v-html="post.acf.email" v-if="post.acf.email && post.acf.email.length"></span></h6>
            <h6 class="animated fadeIn delay-2s" v-if="post.acf.telephone && post.acf.telephone.length">T <span v-html="post.acf.telephone" v-if="post.acf.telephone && post.acf.telephone.length"></span></h6>
          </div>
        </div>
      </div>

    </template>
  </b-container>
</template>

<script>


export default {
  components: {
  },
  data() {
    return {
      posts: this.posts,
    }
  },

  computed: {

  },

  mounted() {
    this.getPost()
  },

  methods: {
    getPost: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'team')
      .then(response => {
        this.posts = response.data;
      })
      .catch(e => {
        console.log(e);
      })
    },
  }
}
</script>

<style lang="scss">
  
</style>