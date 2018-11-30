<template>
  <div class="container">
    <Flickity
      class="animated fadeIn delay-1s"
      id="root_flickity"
      ref="flickity"
      :options="flickityOptions"
      v-if="posts && posts.length"
    >
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="carousel-cell"
        v-if="noDupe(post)"
      >
        <router-link :to="`/${post.type}/${post.slug}`">
          <div class="item__imgx" :style="{backgroundImage: `url(${post.acf.hero_carousel[0].picture.url}`}" v-if="post.acf.hero_carousel[0].picture.url && post.acf.hero_carousel[0].picture.url.length"></div>
          <div class="item__infox">
            <p class="title is-6 is-marginless mt-2" v-if="post.acf.title && post.acf.title.length" style="color: #f25f2e;"><nobr v-html="post.acf.title"></nobr></p>
            <p class="subtitle is-5 is-marginless" v-if="post.acf.place && post.acf.place.length" v-html="post.acf.place">
            </p>
          </div>
        </router-link>
      </div>
    </Flickity>
  </div>
</template>

<script>
import Flickity from 'vue-flickity'

export default {
  components: {
    Flickity
  },

  props: [ "posts" ],

  data () {
    return {
      post: {
        type: Object,
        default() {
          return {
            id: 0,
            slug: '',
            title: { rendered: '' },
            content: { rendered: '' }
          }
        }
      },
      flickityOptions: {
        wrapAround: true,
        pageDots: false
      }
    }
  },

  computed: {
    slug () {
      return this.$route.params.immobilienSlug      
    }
  },

  methods: {
    noDupe (item) {
      return this.slug != item.slug
    },

    next() {
      this.$refs.flickity.next();
    },
 
    previous() {
      this.$refs.flickity.previous();
    }
  },

}
</script>

<style lang="scss">
@import "../../styles/_variables.scss";
.item {
  &__imgx {
    display: block;
    height: calc(100% - 80px);
    width: 100%;
    background: black;
    background-size: cover;
    background-repeat: none;
    background-position: center center;
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 10+ */
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(100%); /* Chrome 19+ & Safari 6+ */
    -webkit-transition: all 1s ease; /* Fade to color for Chrome and Safari */
    -webkit-backface-visibility: hidden; /* Fix for transition flickering */
  }
  &__infox {
    text-align: left;
    height: 80px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
}
.item {
  &__imgx:hover {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/></filter></svg>#grayscale");
    -webkit-filter: grayscale(0%);
  }
}
.carousel-cell {
  width: 28%;
  height: 150px;
  margin-right: 20px;
  @include breakpoint($md) {
    height: 250px;
  }
}
.flickity-prev-next-button {
  top: 35% !important;
}

</style>