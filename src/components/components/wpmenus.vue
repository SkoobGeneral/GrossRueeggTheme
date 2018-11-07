<template>
  <div class="wpmenu-wrapper unselectable"
  v-bind:class="{ 'is-active': showMobileMenu }"
  >
    <div class="menu-breakdown mobile-only animated fadeInLeft">
      <div class="parent-wrapper"
        v-for="(item, index) in menu.items"
        
      >
        <div class="parent-item">
          <router-link class="parent-item" :to="fixPath(item.url)" exact>
            <span v-html="item.title"></span>
            <span class="caret" v-if="item.children">›</span>
          </router-link>
        </div>
        <transition name="slide">
          <div class="children" v-if="item.children && openItem === index">
            <div class="child-wrapper" v-for="child in item.children">
              <div class="child-item"
                @click="linkOrNotLink(child)"
              >
                <span v-html="child.title"></span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="menu-breakdown desktop-only animated fadeInLeft">
      <div class="parent-wrapper desktop-only"
        v-for="(item, index) in menu.items"
        v-bind:class="{'has-children': item.children}"
      >
        <a class="parent-item" v-if="item.children">
          <span v-html="item.title"></span>
          <span class="caret" v-if="item.children">›</span>
        </a>
        <router-link class="parent-item" :to="fixPath(item.url)" exact>
        <!--<nuxt-link class="parent-item" :to="slugTo(item)" v-else>-->
          <span v-html="item.title"></span>
        </router-link>
        <!--</nuxt-link>-->
        <div class="children" v-if="item.children">
          <!--<nuxt-link :to="slugTo(child)" class="child-wrapper" v-for="child in item.children" :key="child.id">-->
            <div class="child-item">
              <span v-html="child.title"></span>
            </div>
          <!--</nuxt-link>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      openItem: ''
    }
  },
  computed: {
    showMobileMenu () {
      return this.$store.state.showMobileMenu
    },
    menu () {
      return this.$store.state.menu
    }
    /*menu () {
      if (this.$store.state.useDefaultLang) {
        return this.$store.state.menus.de
      } else {
        return this.$store.state.menus.fr
      }
    }*/
  },
  mounted () {
    this.openItem = ''
    //this.$store.commit('setShowMobileMenu', false)
  },
  methods: {
    toggleThisParentItem(index) {
      if (this.openItem === index) {
        this.openItem = ''
      } else {
        this.openItem = index
      }
    },
    linkOrNotLink(item) {
      if (!item.children) {
        this.$router.push(this.slugTo(item))
      }
    },
    fixPath (url) {
      var path = [];
      path = url.split( '/' );
      if (path.length < 5){
        path = "/";
      }
      else {
        path = ("/"+path[path.length-2]);
      }
      return path
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/_variables.scss";
.wpmenu-wrapper {
  font-size: 28px;
  line-height: 1;
  padding-top: 30px;
  font-weight: 300;
  background: none;

  @include breakpoint($xs) {
    padding-top: 105px;
    margin-top: 0px;
    body {
      overflow: hidden !important;
    }
  }

  .parent-wrapper {
    //border-bottom: 1px solid $black;
    transition: all 0.2s ease-in-out;
    color: $black;

    &:first-child {
      //border-top: 1px solid $black;
    }

    &.active {
      background: $black;
      border-color: $white;
      color: $white;

      .caret {
        color: $white;
        transform: rotate(-90deg) translateY(-6px);
      }

      .child-wrapper {
        display: block;
        font-weight: 400;
      }
    }
  }

  .child-wrapper {
    border-bottom: 1px solid $white;
    transition: all 0.2s ease-in-out;

    @include breakpoint($md) {
      border-bottom: none;

      &:last-child {
        border-bottom: 1px solid $white;
      }
    }

    &:first-child {
      border-top: 1px solid $black;
    }

    &.active {
      border-color: $white;
    }    
  }

}

.caret {
  font-size: 30px;
  transition: rotate 0.2s ease-in-out, translate 0.2s ease-in-out;
}

.mobile-only {
  .caret {
    transform: rotate(90deg);
  }
}

.desktop-only {
  .caret {
    transform: rotate(0deg);
  }
}

.parent-item, .child-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px 10px;
}

.child-item {
  font-size: 18px;
  padding: 10px;
}

.children {
  background: $black;
  border-top: 1px solid $white;

  a {
    color: $white;
  }
}

/* Desktop styles */
.wpmenu-wrapper {
  width: 100%;
  transition: all 0.2s ease-in-out;
  transform: translateX(-280px) !important;

  &.is-active{
    transform: translateX(0) !important;
    transition: all 0.2s ease-in-out;
  }
  @include breakpoint($sm) {
    
    transform: translateX(0);
  }
  @include breakpoint($md) {
    transform: translateX(0);
    position: relative;
    padding-top: 10px;

    .desktop-only {
      .parent-wrapper {
        width: 200px;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

        .parent-item {
          max-width: 250px;
        }

        &:hover {
          cursor: pointer;

          .parent-item {          
            //background: $black;
            color: $color-orange;
          }

          .children {
            visibility: visible;
            opacity: 1;
          }
        }

        .children {
          visibility: hidden;
          border-top: none;
          opacity: 0;
          position: absolute;
          transition: opacity 0.2s ease-in-out;
          top: 0;
          padding-top: 84px;
          padding-left: 20px;
          padding-right: 20px;
          left: 280px;
          min-height: 100vh;
          width: 300px;
          background: rgba($black, 0.75);

          .child-item {
            color: $white;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

            &:first-child {
              border-top: 1px solid $white;
            }
          }

          .nuxt-link-exact-activex .child-item,
          .child-item:hover {
            background-color: $white;
            color: $black;
            cursor: pointer;
          }
        }
      }
    }

  }
}

/* Transitions */
.across-enter,
.across-leave-active {
  animation: acrossIn 10.5s;
}

.across-enter,
.across-leave-active {
  animation: acrossOut 10.5s;
}

</style>