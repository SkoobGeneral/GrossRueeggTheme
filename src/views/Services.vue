<template>
  <b-container class="bv-example-row pt-4 mt-3 mb-5">
    <p class="title is-1 has-text-centered has-text-weight-light">Leistungen</p>
    <template>
      <div
        v-for="(post, index) in posts"
        v-if="posts && posts.length"
      > <div class="container columns mt-5">
          <div class="column has-text-left animated fadeIn">
            <h5 class="has-text-weight-bold animated fadeIn" v-html="post.title.rendered" v-if="post.title.rendered && post.title.rendered.length"></h5>
          </div>
          <div class="column mb-3 a-colored" style="margin-top: auto;">
            <p class="animated fadeIn delay-1s" style="font-size: 18px;" v-html="post.content.rendered" v-if="post.content.rendered && post.content.rendered.length"></p>
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
      posts: [],
      items: this.posts,
      fade: false,
      title: { rendered: '' },
      content: { rendered: '' }
    }
  },

  computed: {

  },

  mounted() {
    this.getPost()
  },

  methods: {
    getPost: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'leistungen')
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
  .a-colored a {color: rgb(238, 108, 64) !important}
</style>