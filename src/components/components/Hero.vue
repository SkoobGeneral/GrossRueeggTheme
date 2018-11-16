<template>
  <b-container>
    <section class="herox is-medium is-bold mb-5">
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
          <div class="hero-body" style="position: absolute; bottom: 0;">
            <div class="container">
              <div
                v-if="slide.title || slide.content"
                class="contenedor animated fadeIn mb-2"
                style="background: rgba(255,255,255,0.9); padding: 15px;"
              >
                <h1 class="animated fadeIn" style="font-weight: 300;" v-html="slide.title"></h1>
                <h6 class="animated fadeIn" style="font-weight: 600; color: #ee6c40;" v-html="slide.content"></h6>
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
          style="cursor: pointer;"
          v-bind:class="{'dot':true, 'active':(current % slides.length === index)}"
          @click="selectSlide(index)"
          v-if="slides.length > 1"
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
  @import "../../styles/_variables.scss";
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
      transition: color .3s ease;
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
  .contenedor {
    @include breakpoint($phone-small) {
      padding: 10px !important;
      max-width: 160px;
    }
  }
  .slide {
    &__item {
      width: 100%;
      background: black;
      background-size: cover;
      background-repeat: none;
      background-position: center center;
      height: 40vw;
      max-height: 600px;
      & h1 {
        font-size: 20px;
      }
      & h6 {
        font-size: 16px;
      }
      @include breakpoint($phone) {
        height: 70vw;
        & h1 {
          font-size: 20px !important;
        }
        & h6 {
          font-size: 16px !important;
        }
      }
      @include breakpoint($phone-small) {
        height: 70vw;
        & h1 {
          font-size: 16px !important;
        }
        & h6 {
          font-size: 10px !important;
        }
      }
      @include breakpoint($sm) {
        height: 70vw;
        & h1 {
          font-size: 26px !important;
        }
        & h6 {
          font-size: 20px !important;
        }
      }
      @include breakpoint($screen1400) {
        height: 70vw;
        & h1 {
          font-size: 30px !important;
        }
        & h6 {
          font-size: 24px !important;
        }
      }
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
    @include breakpoint($phone) {
      margin-right: 0 !important;
      margin-bottom: 20px !important;
    }
  }
  .dot {
    height: 12px;
    width: 12px;
    background: #dadada;
    margin-right: 8px;
    transition: background .3s ease;
    &:hover {
      background: #ee6c40;
    }
    &.active {
      background: #ee6c40;
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