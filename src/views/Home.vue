<template>
  <div class="wrapper">
    <ContactWidget
      :assets="post.acf.contact_widget.language_and_tagline"
      :member='post.acf.contact_widget.contact[0].post_name'
      v-if="post.acf.contact_widget.show"
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
      :posts="posts"
      :show-toolbar="false"
      v-if="post"
    ></ReferenceArchive>
  </div>
</template>

<script>
import ContactWidget from '../components/components/ContactWidget.vue';
import Hero from '../components/components/Hero.vue';
import ReferenceArchive from '../views/ReferenceArchive.vue';

export default {
  components: {
    ContactWidget,
    Hero,
    ReferenceArchive,
    
  },

  data() {
    return {
      post: {},
      posts: {},
      toolbar: false
    }
  },

  computed: {

  },

  created () {
    this.getContent()
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
    }
  },
}
</script>

<style lang="scss">
</style>