<template>
  <div class="wpmenu-wrapper unselectable"
  v-bind:class="{ 'is-active': showMenu }"
  >
    <div class="menu-breakdown mobile-only animated fadeInLeft">
      <div class="parent-wrapper"
        v-for="(item, index) in menu.items"  
      >
        <router-link class="parent-item" v-on:click.native="hideMenu()" :to="fixPath(item.url)" exact v-if="item.classes[0] !== 'not-link' && item.menu_item_parent == 0">
          <span v-html="item.title"></span>
        </router-link>
        <div class="parent-item" v-else-if="item.classes[0] == 'not-link' && item.menu_item_parent == 0">
          <span v-html="item.title"></span>
        </div>
        <router-link class="child-item" v-on:click.native="hideMenu()" :to="fixPath(item.url)" exact v-else-if="item.classes[0] !== 'not-link' && item.menu_item_parent !== 0">
          <span v-html="item.title"></span>
        </router-link>
      </div>
    </div>
    <div class="menu-breakdown desktop-only animated fadeInLeft">
      <div class="parent-wrapper desktop-only"
        v-for="(item, index) in menu.items"
      >
        <router-link class="parent-item" v-on:click.native="hideMenu()" :to="fixPath(item.url)" exact v-if="item.classes[0] !== 'not-link' && item.menu_item_parent == 0">
          <span v-html="item.title"></span>
        </router-link>
        <div class="parent-item" v-else-if="item.classes[0] == 'not-link' && item.menu_item_parent == 0">
          <span v-html="item.title"></span>
        </div>
        <router-link class="child-item" v-on:click.native="hideMenu()" :to="fixPath(item.url)" exact v-else-if="item.classes[0] !== 'not-link' && item.menu_item_parent !== 0">
          <span v-html="item.title"></span>
        </router-link>
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
    showMenu () {
      return this.$store.state.showMenu
    },
    menu () {
      return this.$store.state.menu
    }
  },
  mounted () {
    this.openItem = ''
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
    },
    hideMenu () {
      this.$store.commit('setShowMenu', false)
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

        & a:hover {
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