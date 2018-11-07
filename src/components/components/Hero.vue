<template>
  <b-container>
    <section class="hero is-medium is-bold mb-5">
      <div
        v-if="controls == true"
        class="slides__control"
      >
        <button
          class="button prev"
          @click="previous()"
        ><font-awesome-icon icon="chevron-left" size="lg"></font-awesome-icon></button>
        <button
          class="button next"
          @click="next()"
        ><font-awesome-icon icon="chevron-right" size="lg"></font-awesome-icon></button>
      </div>
      <transition-group name="list-complete" mode="out-in">
        <div
          :key="index"
          class="slide__item list-item list-complete-item"
          v-for="(slide, index) in slides"
          :style="{backgroundImage: `url(${slide.picture.url}`}"
          v-if="current % slides.length === index"
        >
          <div class="hero-body"></div>
          <div class="hero-footer" style="margin: 60px;">
            <div class="columns">
              <div
                v-if="slide.title || slide.content"
                class="column is-two-fifths animated fadeIn mb-2"
                style="background: rgba(255,255,255,0.9);"
              >
                <h1 class="animated fadeIn" style="font-weight: 300;" v-html="slide.title"></h1>
                <h6 class="animated fadeIn" style="font-weight: 600; color: #ee6c40;" v-html="slide.content"></h6>
              </div>
              <div class="column animated fadeIn slower" style="position: relative;">
              </div>
            </div>
          </div>
        </div>
      </transition-group>
      <div class="dots__container">
        <div
          :key="index"
          v-for="(slide, index) in slides"
          class="dot"
          style=""
          v-bind:class="{'dot':true, 'active':(current % slides.length === index)}"
          @click="selectSlide(index)"
          >
        </div>
      </div>
    </section>
  </b-container>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      myInterval: null,
      current: 0
    }
  },
  props: ["slides", "controls", "autoplay"],

  computed: {

  },

  mounted() {
    this.autoplaySlides()
  },

  methods: {
    selectSlide (index) {
      this.current = index
      this.autoplaySlides()
    },
    autoplaySlides () {
      clearInterval(this.myInterval)
      if (this.autoplay) {
        this.myInterval = setInterval(() => {
          this.next()
        }, 6000)
      }
    },
    next () {
      this.current++
      this.autoplaySlides()
    },
    previous () {
      if (this.current === 0) {
        this.current = this.slides.length
      } else {
        this.current--
      }
      this.autoplaySlides()
    }
  },
  destroyed () {
    clearInterval(this.myInterval)      
  }

}
</script>

<style lang="scss">
  .slides__control button {
    position: absolute;
    bottom: 50%;
    background: rgba(50,50,50,0.8);
    color: rgba(255,255,255,0.8);
    border: none;
    border-radius: 0;
    z-index: 1;
    &:active, &:focus {
      color: rgba(255,255,255,0.8);
      outline: 0 !important;
    }
    &:hover {
      color: #ee6c40;
      outline: 0;
    }
    &.prev{
      left: 50px;
    }
    &.next{
      right: 50px;
    }
  }
  .list-item {
    display: inline-block;
  }
  .slide {
    &__item {
      width: 100%;
      background: black;
      background-size: cover;
      background-repeat: none;
    }
  }
  .dots__container {
    display: inline-flex;
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 60px;
    margin-bottom: 60px;
    z-index: 1;
  }
  .dot {
    height: 12px;
    width: 12px;
    background: #dadada;
    margin-right: 8px;
    &:hover {
      background: #ee6c40;
    }
    &.active {
      background: #ee6c40;
    }
  }
  @media only screen and (max-width: 425px) {
    h1 {
      font-size: 25px;
    }
    h6 {
      font-size: 14px;
    }
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>