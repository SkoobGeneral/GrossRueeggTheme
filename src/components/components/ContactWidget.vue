<template>
  <div
    v-if="post && !showMobileMenu"
    class="contact-widget animated fadeIn delay-1s"
    style="position: absolute; top: 132px; left: 0; z-index: 100; background: #dddddd; width: 52px;"
    @click.stop="triggerWidget(true)"
    v-bind:class="{ 'expanded': showContactWidget }"
  >
  <div style="background: rgba(41,44,49,1); color:white;">
    <div class="close-widget animated fadeIn" v-bind:class="{ 'expanded': showContactWidget }" @click.stop="triggerWidget(false)" style="cursor: pointer; display: none;">
      <Icons
      iconwidth="25px"
      iconheight="25px"
      icon="close"
      fill="white"
    />
    </div>
    <ul class="is-marginless languages-tagline-container animated has-text-left has-text-weight-bold fadeIn mb-2"
      v-bind:class="{ 'expanded': showContactWidget }"
      style="display: inline-flex; max-width: 52px; cursor: pointer; overflow: hidden;" 
    >
      <li 
        :key="index"
        v-for="(language, index) in assets"
        v-html="assets[index].language"
        @click="selectLanguage(index)"
        v-bind:class="{'active':(current % assets.length === index)}"
      ></li>
    </ul>
    <div class="tagline-main-container" v-bind:class="{ 'expanded': showContactWidget }">
      <div class="tagline-container container animated has-text-left has-text-weight-bold fadeIn"
        v-for="(language, index) in assets"
        v-bind:class="{ 'expanded': showContactWidget }"
        style="display: none;" 
      >
        <h6 class="animated fadeIn is-marginless" 
          v-html="assets[index].tagline"
          v-if="current % assets.length === index"
        ></h6>
      </div>
    </div>
    <Icons
      iconwidth="35px"
      iconheight="35px"
      icon="caret-down"
      fill="white"
      class="contact-widget-svg-container"
    />
  </div>
  <div class="contact-container container mt-4" style="display: none;" v-bind:class="{ 'expanded': showContactWidget }">
      <div class="animated fadeIn">
        <figure>
          <img :src="post.acf.picture.url" v-if="post.acf.picture.url && post.acf.picture.url.length"/>
        </figure>
      </div>
      <div class="mb-3 has-text-left animated fadeIn" style="margin-top: auto;">
        <h6 class="mb-2 has-text-weight-bold" v-html="post.acf.name" v-if="post.acf.name && post.acf.name.length"></h6>
        <h6 class="is-marginless" v-html="post.acf.degree" v-if="post.acf.degree && post.acf.degree.length"></h6>
        <h6 class="is-marginless"v-html="post.acf.position" v-if="post.acf.position && post.acf.position.length"></h6>
        <h6 class="is-marginless" v-if="post.acf.email && post.acf.email.length">E <span v-html="post.acf.email" v-if="post.acf.email && post.acf.email.length"></span></h6>
        <h6 class="is-marginless" v-if="post.acf.telephone && post.acf.telephone.length">T <span v-html="post.acf.telephone" v-if="post.acf.telephone && post.acf.telephone.length"></span></h6>
      </div>
    </div>
  </div>
</template>
  


<script>
import Loader from '../partials/Loader.vue';
import { mapGetters } from 'vuex';
import Icons from '../components/Icons.vue';

export default {
  props: [ "assets", "member"],
  data() {
    return {
      post: this.post,
      current: 0,
      showContactWidget: false
    }
  },

  computed: {
    showMobileMenu () {
      return this.$store.state.showMobileMenu
    }
  },

  mounted() {
    this.getPost()
  },

  methods: {
    getPost: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'team?slug=' + this.member)
      .then(response => {        
        setTimeout(() => {
          this.post = response.data[0];
        }, 20)
      })
    },
    selectLanguage (index) {
      this.current = index
    },
    triggerWidget (param) {
      if (param) {
        this.showContactWidget = param
        return
      }
      else {
        this.showContactWidget = !this.showContactWidget
      }
    }
  },

  components: {
    Loader,
    Icons
  }
}
</script>

<style lang="scss">
  .close-widget {
    position: absolute;
    padding: 5px;
    right: 5px;
    color: white;
    & svg {
      fill:white;
    }
    &.expanded {
      display: block !important;
    }
  }
  .languages-tagline-container li {
    color: rgba(255,255,255,0.3);
    font-size: 14px;
    font-weight: 100; 
    padding: 0px 5px;
    border-left: 1px solid rgba(255,255,255,0.3);
    min-width: 22px;
    &:nth-child(1) {
    border: none;
    }
    &.active {
      color: white;
      font-weight: 600 !important;
    }
  }
  .contact-widget-svg-container svg {
    position: absolute;
    fill: rgba(41,44,49,1);
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-15px);
    &.expanded {
      display: block;
    }
  }
  .contact-container h6 {
    font-size: 14px;
  }
  .contact-widget{
    &.expanded {
      width: 220px !important;
    }
  }
  .languages-tagline-container {
    &.expanded {
      width: 220px !important;
    }
  }
  .tagline-main-container {
    &.expanded {
      padding-bottom: 1rem !important;
    }
  }
  .tagline-container {
    &.expanded {
      display: block !important;
    }
  }
  .contact-container {
    &.expanded {
      display: block !important;
    }
  }

</style>