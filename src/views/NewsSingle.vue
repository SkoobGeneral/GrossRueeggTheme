<template>
  <b-container class="bv-example-row pt-4 has-text-centered mt-3 mb-5">
    <router-link
      v-if="$routerHistory.hasPrevious()"
      :to="{ path: $routerHistory.previous().path }" class="title is-1 has-text-weight-light mb-5 animated fadeIn delay-1s slower" style="display: inline-flex; color: black !important;">
      <Icons
          iconwidth="28px"
          iconheight="28px"
          icon="arrow-left" /><div class="ml-3">News</div>
      </router-link>
    <template v-if="post">
    <Hero
      :per-page="1"
      :speed="1000"
      :slides="post.acf.hero_carousel"
      :controls="post.acf.controls"
      :autoplay="post.acf.autoplay"
      v-if="post && post.acf"
      style="margin: auto; padding: 0; max-width: 100%;"
    ></Hero>
      <div class="container">
        <div>
          <div class="animated fadeIn delay-1s slower has-text-left">
            <p class="title is-3" style="color: #34363c; font-family: 'Source Sans Pro', sans-serif; font-weight: bold;" v-html="post.acf.title" v-if="post.acf.title && post.acf.title.length"></p>
            <p class="subtitle is-4" v-html="post.acf.place" v-if="post.acf.place && post.acf.place.length"></p>
            <p class="subtitle is-6" v-html="post.acf.date" v-if="post.acf.date && post.acf.date.length"></p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6 animated fadeIn delay-1s slower has-text-left">
            <p v-html="post.acf.two_columns[0].column1" v-if="post.acf.two_columns[0].column1 && post.acf.two_columns[0].column1.length"></p>
          </div>
          <div class="column is-6 animated fadeIn delay-1s slower has-text-left">
            <p v-html="post.acf.two_columns[0].column2" v-if="post.acf.two_columns[0].column2 && post.acf.two_columns[0].column2.length"></p>
          </div>
        </div>
      </div>
      <section>
        <h2>Eintrag Teilen</h2>
        <div class="social-icons">
          <div class="container">
            <!--<div class="column icon-wrapper" @click="shareGooglePlus()">
              <Icons iconwidth="64px" iconheight="64px" icon="googleplus" class="share-icon-gray" />
            </div>-->
            <div class="icon-wrapper" @click="shareTweet()">
              <Icons iconwidth="64px" iconheight="64px" icon="twitter" class="share-icon-gray" />
            </div>
            <!--<div class="column icon-wrapper" @click="shareInstagram()">
              <Icons iconwidth="64px" iconheight="64px" icon="instagram" class="share-icon-gray" />
            </div>-->
            <div class="icon-wrapper" @click="shareFB()">
              <Icons iconwidth="64px" iconheight="64px" icon="facebook" class="share-icon-gray" />
            </div>
            <!--<div class="column icon-wrapper" @click="shareEmail()">
              <Icons iconwidth="64px" iconheight="64px" icon="email" class="share-icon-gray" />
            </div>-->
          </div>
        </div>
      </section>
      <section>
        <h2>Weitere News</h2>
      </section>
    </template>
    <FlickityCarouselNews></FlickityCarouselNews>
  </b-container>
</template>

<script>
import Hero from '../components/components/Hero.vue';
import Icons from '../components/components/Icons.vue'
import * as Sharer from '../components/utilities/Sharer.js'
import FlickityCarouselNews from '../components/components/FlickityCarouselNews.vue';

export default {
  components: {
   Hero,
   Icons,
   Sharer,
   FlickityCarouselNews
  },
  data () {
    return {
      post: false,
      shareText: "Check out this website I found!",
      siteName: "GrossRueegg",
      shareWindowTitle: "Sharing"
    }
  },

  computed: {

  },

  mounted () {
    this.getReference()
  },

  methods: {
    getReference: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'news?slug=' + this.$route.params.newsSlug)
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
    loadScripts () {
      if (typeof window !== "undefined" && window.FB) {
        window.FB.XFBML.parse()
      }
      if (window.addthis.layers && typeof window.addthis.layers.refresh === "function") {
        window.addthis.layers.refresh()
      }
    },
    shareGooglePlus () {
      Sharer.shareOnGooglePlus(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    shareTweet () {
      Sharer.shareOnTwitter(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    shareFB () {
      Sharer.shareOnFacebook(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    shareInstagram () {
      Sharer.shareOnInstagram(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    shareEmail () {
      Sharer.shareByEmail(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    donate () {
      this.$emit("donateFromButton")
    },
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<style lang="scss">
  a:hover, a:link, a:visited, a:active{
    text-decoration: none;
    color: rgb(54,54,54);
  }

.social-icons {
  background-color: white;
  color: black;
  padding: 30px 0;
  font-size: 24px;
  font-style: italic;
  max-width: 768px;
  margin: auto;

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    line-height: 20px;
  }

  .icon-wrapper {
    margin: 0 5px;
  }

  svg {
    path {
      fill: black;
      transition: fill 0.2s ease-in-out;
    }

    &:hover {
      path {
        fill: #aaa;
      }
    }
  }
}


.icon-wrapper {
  &:hover {
    cursor: pointer;
  }
}

</style>