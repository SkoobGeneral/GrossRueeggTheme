<template>
    <b-container class="bv-example-row pt-4 has-text-centered mt-3 mb-5">
      <router-link
          v-if="$routerHistory.hasPrevious()"
          :to="{ path: $routerHistory.previous().path }" class="title is-1 has-text-weight-light mb-5 animated fadeIn delay-1s slower" style="display: inline-flex; color: black !important;">
          <Icons
            iconwidth="28px"
            iconheight="28px"
            icon="arrow-left"
          /><div class="ml-3">Immobilien</div>
        </router-link>
        <template v-if="post">
        <Hero
          :per-page="1"
          :speed="1000"
          :slides="post.acf.hero_carousel"
          :controls="post.acf.controls"
          :autoplay="post.acf.autoplay"
          :key="_uid + '_hero_' + slug"
          v-if="post && post.acf"
          style="margin: auto; padding: 0; max-width: 100%;"
        ></Hero>
          <div class="animated fadeIn delay-1s slower has-text-left">
            <p class="title is-3" style="color: #34363c; font-family: 'Source Sans Pro', sans-serif; font-weight: bold;" v-html="post.acf.title" v-if="post.acf.title && post.acf.title.length"></p>
            <p class="subtitle is-4" v-html="post.acf.place" v-if="post.acf.place && post.acf.place.length"></p>
          </div>
        </div>
        <div class="columns content" v-if="post.acf.three_columns && post.acf.three_columns.length">
          <div class="column is-4 animated fadeIn delay-1s slower has-text-left">
            <p v-html="post.acf.three_columns[0].column1" v-if="post.acf.three_columns[0].column1 && post.acf.three_columns[0].column1.length"></p>
          </div>
            <div class="column is-4 animated fadeIn delay-1s slower has-text-left">
              <p v-html="post.acf.three_columns[0].column2" v-if="post.acf.three_columns[0].column2 && post.acf.three_columns[0].column2.length"></p>
            </div>
            <div class="column is-4 animated fadeIn delay-1s slower has-text-left">
              <p v-html="post.acf.three_columns[0].column3" v-if="post.acf.three_columns[0].column3 && post.acf.three_columns[0].column3.length"></p>
            </div>
          </div>
        </div>
        <FlickityCarouselImmobilien
        :key="_uid + '_carousel_' + slug"
        :posts="posts"
      ></FlickityCarouselImmobilien>
      </template>
    </b-container>
</template>

<script>
import Hero from '../components/components/Hero.vue';
import Icons from '../components/components/Icons.vue';
import FlickityCarouselImmobilien from '../components/components/FlickityCarouselImmobilien.vue';

export default {
  components: {
    Hero,
    Icons,
    FlickityCarouselImmobilien
  },
  data() {
    return {
      post: false,
      posts: false,
    }
  },

  computed: {
    slug () {
      return this.$route.params.immobilienSlug      
    }
  },

  mounted () {
    this.getThisPost()
    this.getPostsList()
  },

  methods: {
    getThisPost: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'immobilien?slug=' + this.$route.params.immobilienSlug)
      .then(response => {
        setTimeout(() => {
          this.post = response.data[0];
          document.title = this.post.title.rendered + ' | ' + document.title;
        }, 20)
      })
      .catch(e => {
        console.log(e);
      })
    },
    getPostsList () {
      axios.get(window.SETTINGS.API_BASE_PATH + 'immobilien')
      .then(response => {
        setTimeout(() => {
          this.posts = response.data;
        }, 200)
      })
      .catch(e => {
        console.log(e);
      })
    }
  },

  watch: {
    slug: function (newVal, oldVal) {
      this.getThisPost()
    }
  }
}
</script>

<style lang="scss">
  a:hover, a:link, a:visited, a:active{
    text-decoration: none;
    color: rgb(54,54,54);
  }
  .content p {margin:0 !important;}
</style>