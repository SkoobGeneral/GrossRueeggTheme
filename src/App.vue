<template>
  <div id="my-app" class="page-wrapper" @click.stop="triggerMenu(true)" v-bind:class="{ 'menu-opened': showMobileMenu }">
    <app-header></app-header>
    <Navigation></Navigation>
    <div class="container"></div>
      <!--<div class="page-content-wrapper">
        <router-view></router-view>
      </div>-->
    <transition-page>
      <router-view
        class="my-router-view"
        style="flex:1"
        v-bind:class="{ 'menu-active': showMobileMenu }"
      ></router-view>
    </transition-page>
    <vue-ins-progress-bar></vue-ins-progress-bar>
    <app-footer
    v-bind:class="{ 'menu-active': showMobileMenu }"
    ></app-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import Navigation from './components/components/Navigation.vue'
import TransitionPage from './components/components/TransitionPage.vue'
import Isotope from 'vueisotope'

export default {
  name: 'App',
  data () {
    return {
      showLoader: true,
    }
  },

  mounted () {
    var vm = this
    this.$insProgress.finish()
    axios.get(window.SETTINGS.API_MENU_BASE_PATH + 'menus/header')
      .then(response => {
        vm.$store.commit('loadMenu', response.data)
      })
      .catch(e => {
        console.log(e);
      }),
      this.$store.commit('setShowMobileMenu', false)
  },

  created () {
    this.$insProgress.start()

    this.$router.beforeEach((to, from, next) => {
      this.$insProgress.start()
      next()
    })

    this.$router.afterEach((to, from) => {
      this.$insProgress.finish()
    })
  },

  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      loadingProgress: 'loadingProgress'
    }),

    showMobileMenu () {
      return this.$store.state.showMobileMenu
    },

    loaderStyle() {
      return `width: ${this.loadingProgress}%;`
    }
  },

  components: {
    appHeader: Header,
    appFooter: Footer,
    Navigation,
    TransitionPage,
    Isotope
  },

  methods: {
    triggerMenu (param) {
      this.menuIsOpen = !this.menuIsOpen
      this.$store.commit('setShowMobileMenu', this.menuIsOpen)
      if (param) {
        this.$store.commit('setShowMobileMenu', false)
      }
    }
  },

  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let self = this
        setTimeout(function(){
          self.showLoader = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
  * {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  @import "./styles/_variables.scss";
  @import './styles/app.scss';
  a:hover, a:link, a:visited, a:active{
    text-decoration: none;
    color: rgb(54,54,54);
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 1508px;
    margin: auto;
  }
  .menu-active {
    -webkit-transform:translate3d(280px, 0, 0);
    -moz-transform:translate3d(280px, 0, 0);
    -o-transform:translate3d(280px, 0, 0);
    transform:translate3d(280px, 0, 0); 
  }
  .my-router-view, .footer {
    -moz-transition:all 200ms ease-in;
    -webkit-transition:all 200ms ease-in;
    -o-transition:all 200ms ease-in;
    transition:all 200ms ease-in;
  }
  .router-link-active {
    color: $color-orange !important;
  }
  .page-wrapper {
    position: relative;
    overflow-x: hidden; 
  }

.fixy {
  position: absolute;
  left: 0;
  top: 0;
  background: red;
  z-index: 100;
}
@media only screen and (max-width: 425px) {
  .my-router-view {
    padding: 0;
  }
  .my-router-view.menu-active {
    height: 0 !important;
    overflow: hidden;
  }
  .desktop-only {
    display: none !important;
  }
  .wpmenu-wrapper.is-active {
    background: $white;
  }
  .menu-active {
    -webkit-transform:translate3d(100%, 0, 0);
    -moz-transform:translate3d(100%, 0, 0);
    -o-transform:translate3d(100%, 0, 0);
    transform:translate3d(100%, 0, 0);
    transition: all 1s;
  }
}
@media only screen and (min-width: 426px) {
  .menu-opened {
    height: 0;
    overflow: hidden;
  }
  .mobile-only {
    display: none !important;
  }
  .wpmenu-wrapper {
    width: 280px !important;
  }
}
</style>