<template>
  <div class="container">
    <Isotope
      :list="posts"
      :options="isotopeOptions"
      class="isoDefault customGrid animated fadeIn delay-1s"
      id="root_isotope"
      ref="isotope"
      v-if="posts && posts.length"
    >
      <div
        v-for="(picture, index) in posts"
        :key="index"
        class="grid-item"
      > 
          <div class="xitem__img image is-square mb-2" :style="{backgroundImage: `url(${picture.picture.url}`}" v-if="picture.picture.url && picture.picture.url.length"></div>
      </div>
    </Isotope>
  </div>
</template>

<script>
import Isotope from 'vueisotope'

import Vue from 'vue'

export default {
  components: {
    Isotope
  },
  props: [ "posts" ],

  data () {
    return {
      items: this.posts,
    }
  },

  computed: {
    isotopeOptions () {
      var that = this
      return {
        itemSelector: '.grid-item',
        masonry: {
          columnWidth: 10
        }
      }
    },
  },
  methods: {
  },


  mounted () {
  },

  watch: {
  }

}
</script>

<style scoped lang="scss">

.customGrid:after {
  content: '';
  display: block;
  clear: both;
}
.grid-item {
  width: 50%;
  margin-bottom: 40px;
  border: 6px solid white;
}
.order_1, .order_3, .order_5, .order_0 {
  width: 30%;
  height: 261px;
}
.order_2, .order_4 {
  width: 58.6%;
}
.order_42 {
  width: 50%;
}
.order_14 {
  margin-left: 25% !important;
}
.item {
    &__img {
      height: 0%;
      width: 100%;
      background: black;
      background-size: cover;
      background-repeat: none;
      background-position: center center;
    }
  }

</style>