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
      > 
          <a :href="`/${post.type}/${post.slug}`">
          <div class="item__imgx" :style="{backgroundImage: `url(${post.acf.hero_carousel[0].picture.url}`}" v-if="post.acf.hero_carousel[0].picture.url && post.acf.hero_carousel[0].picture.url.length"></div>
          <div class="item__infox">
            <p class="title is-6 is-marginless mt-2" v-if="post.acf.title && post.acf.title.length" style="color: #f25f2e;"><nobr v-html="post.acf.title"></nobr></p>
            <p class="subtitle is-5 is-marginless" v-if="post.acf.place && post.acf.place.length" v-html="post.acf.place">
            </p>
          </div>
        </a>
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

  data () {
    return {
      posts: null,
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
        wrapAround: true
      }
    }
  },

  mounted() {
    this.getReferences()
  },

  methods: {
    getReferences: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'news')
      .then(response => {
        setTimeout(() => {
          console.log(response)
          this.posts = response.data;
        }, 200)
      })
      .catch(e => {
        console.log(e);
      })
    },

    next() {
      this.$refs.flickity.next();
    },
 
    previous() {
      this.$refs.flickity.previous();
    }
  }
}
</script>

<style scoped lang="scss">
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
  }
  &__infox {
    text-align: left;
    height: 80px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
}
.carousel-cell {
  width: 28%;
  height: 150px;
  margin-right: 10px;
  border-radius: 5px;
  counter-increment: carousel-cell;
  @include breakpoint($md) {
    height: 250px;
  }
}

</style>