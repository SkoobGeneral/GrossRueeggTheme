<template>
  <div class="nav-container" v-bind:class="{ 'pos-abs': showMenu }">
    <div class="navbar-menu" v-bind:class="{ 'is-active': showMenu }"
    >
      <div class="navbar-start">
        <nav class="navbar is-transparent" v-bind:class="{ 'expanded': showMenu }">
          <div class="is-fluid navbar-container">
            <div id="#nav-burger-trigger" class="navbar-burger animated fadeIn delay-1s"
              v-bind:class="{ 'is-active': showMenu }"
              @click.stop="triggerMenu()"
              style="cursor: pointer;"
            >
              <div class="burger-wrapper">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <transition name="fade">
                <div class="burger-menu-word unselectable" v-show="showMenu"></div>
              </transition>
            </div>
          </div>
        </nav>
        <transition name="fade">
          <WpMenus v-show="showMenu"/>
        </transition>
        <div class="navbar-search">
          <router-link to="/search">
          <div class="search-wrapper animated fadeIn delay-1s" v-if="!showMenu">
            <transition name="fade">
                <svg fill="#ffffff" style="display: block; margin: 10px auto auto;" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </transition>
          </div>
          </router-link>
        </div>
      </div>
      <div class="navbar-end-text" style="display: none;">
        <p class="text">
          GFT Fassaden AG<br>
          Schuppisstrasse 7<br>
          CH-9016 St.Gallen
        </p>
        <p class="text">
          T +41 71 282 40 00<br>
          info@gft-fassaden.swiss<br>
          gft-fassaden.swiss
        </p>
      </div>
    </div>
  </div>
</template>



<script>
import WpMenus from './WpMenus.vue'

export default {
  components: {
    WpMenus
  },
  computed: {
    showMenu () {
      return this.$store.state.showMenu
    },
    menu () {
      return this.$store.state.menu
    }
  },
  methods: {
    triggerMenu () {
      this.$store.commit('setShowMenu', !this.showMenu)
    }
  }
}

function isMobile() {
  if (sessionStorage.desktop) {
    return false
  } else if (localStorage.mobile) {
    return true
  }

  // alternative
  var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile', 'tablet', 'mobi']
  var ua = navigator.userAgent.toLowerCase()
  for (var i in mobile) {
    if (ua.indexOf(mobile[i]) > -1) {
      return true
    }
  }
  // nothing found.. assume desktop
  return false
}
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

html {
  .nav-container {
    position: absolute;
    z-index: 4;
    width: 100%;

    &.pos-abs {
      position: absolute;
    }

    @include breakpoint($xg) {
      position: fixed;
    }
  }


  .navbar {
    background: transparent;
    position: absolute;
    z-index: 20000;
    //width: 100%;

    &.expanded {
      height: 100%;
      display: flex;
      flex-direction: column;
      bottom: 0;
      top: 0;
      height: 73px;

      @include breakpoint($md) {
        background: transparent;
      }

      .navbar-burger, .navbar-search {
        color: $white;

        &:hover {
          background-color: transparent;
          color: #ee6c40;
        }
      }

      .right-side-wrapper {
        @include breakpoint($xs) {
          a {
            color: $black;

            &:hover {
              color: rgba($black, 0.7);
            }
          }
        }
      }
    }

    a {
      color: $white;
    }

    .navbar-burger {
      transform: translate(-16px,8px) !important;
      //transform: translate(-95px,8px);
      margin-left: 0;
      display: inline-block;
      width: auto;
      height: 52px;
      transition: color 0.3s ease-in-out;
      color: $white;

      span {
        width: 22px;
        left: calc(50% - 11px);
        height: 2px;

        /*&:nth-child(2) {
          width: 0;
        }*/
      }

      &:hover {
        background-color: transparent;
        color: #ee6c40;
      }
    }

  }
  .burger-wrapper {
    min-width: 52px;
    margin-left: 0;
    height: 52px;
    position: relative;
    display: inline-block;
    background: rgba($color-bg-dark, 0.7);
  }
  .search-wrapper {
    min-width: 52px;
    top: 74px;
    height: 52px;
    position: absolute;
    display: inline-block;
    background: rgba($color-bg-dark, 0.7);
    & svg {
      transition: fill 0.3s ease-in-out;
    }
    &:hover svg {
      fill: #ee6c40;
      transition: fill 0.3s ease-in-out;
    }
  }
  .burger-menu-word {
    display: inline-block;
    line-height: 52px;
    vertical-align: top;
    padding-right: 15px;
    margin-left: -5px;
  }

  .language-switchter-wrapper {
    padding: 0 15px;
  }
  .navbar-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .right-side-wrapper {
    display: flex;
    align-items: center;
    flex-direction: row;

    .language-switchter-wrapper {
      line-height: 52px;
    }

    a {
      color: $white;

      &:hover {
        color: rgba($white, 0.7);
      }
    }
  }

  .navbar-menu {
    position: absolute;
    
    width: 0;
    z-index: 100;
    padding: 0;
    top: 0; right: 0; left: 0;
    height: 70px;
    display: block;
    background: transparent;
    box-shadow: none;

    @include breakpoint($i6) {
      & .navbar-burger {
        
      }
    }

    @include breakpoint($md) {
      right: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 0;
    }

    .wpmenu-wrapper {
      padding-top: 85px;
      padding-left: 30px;
      padding-right: 30px;
    }

    &.is-active {
      bottom: 0;
      height: auto;
      //background-color: rgba($white, 0.95) !important;
      //overflow-y: scroll;

      @include breakpoint($md) {
        right: auto;
        width: 100%;
        background: linear-gradient(to right, rgba($white, 0.95) 0%, rgba($white, 0.95) 280px, transparent 280px) !important;
      }
    }
  }
}


body, html {
  .navbar-end-text {
    padding: 30px;

    p {
      color: $black;
      font-size: 18px;
    }
  }
}


.nav-container.light {
  .navbar {
    .navbar-burger {
      color: $black !important;
    }
  }

  .right-side-wrapper {
    .language-switchter-wrapper {
      color: $black !important;
    }
  }
}

.hide-fr-for-now {
  display: none;
}

</style>