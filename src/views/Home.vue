<template>
  <div class="wrapper">
    <ContactWidget
      :assets="post.acf.contact_widget.language_and_tagline"
      :member='post.acf.contact_widget.contact[0].post_name'
      v-if="post && post.acf && post.acf.contact_widget && post.acf.contact_widget.show"
    ></ContactWidget>
    <Hero
      :per-page="1"
      :speed="1000"
      :slides="post.acf.hero_carousel"
      :controls="post.acf.controls"
      :autoplay="post.acf.autoplay"
      v-if="post && post.acf"
      style="margin: auto; padding: 0; max-width: 100%;"
    ></Hero>
    <ReferenceArchive
      class="home-reference-archive"
      :posts="posts"
      v-if="post"
    ></ReferenceArchive>
    <section class="mb-5">
      <h1 class="title is-1 has-text-centered has-text-weight-light animated fadeIn delay-2s">News</h1>
      <FlickityCarouselNews
        :posts="postsNews"
      ></FlickityCarouselNews>
    </section>
  </div>
</template>

<script>
import ContactWidget from '../components/components/ContactWidget.vue';
import Hero from '../components/components/Hero.vue';
import ReferenceArchive from '../views/ReferenceArchive.vue';
import FlickityCarouselNews from '../components/components/FlickityCarouselNews.vue';

export default {
  components: {
    ContactWidget,
    Hero,
    ReferenceArchive,
    FlickityCarouselNews    
  },

  data() {
    return {
      post: {},
      posts: {},
      postsNews: {},
      toolbar: false
    }
  },

  computed: {

  },

  mounted () {
    this.getContent()
    this.getNewssList()
  },

  methods: {
    getContent: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'pages?slug=home')
      .then(response => {
        setTimeout(() => {
          this.post = response.data[0];
        }, 20)
      })
      .catch(e => {
        console.log(e);
      })
    },
    getNewssList () {
      axios.get(window.SETTINGS.API_BASE_PATH + 'news')
      .then(response => {
        setTimeout(() => {
          this.postsNews = response.data;
        }, 200)
      })
      .catch(e => {
        console.log(e);
      })
    },
  },
}
</script>

<style lang="scss">
  .home-reference-archive {
    .grid-filter-bar__wrapper {
      display: none;
    }
    .load_more_wrapper {
      display: none;
    }
  }
</style>