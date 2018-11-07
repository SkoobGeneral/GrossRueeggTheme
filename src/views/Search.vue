<template>
  <section id="search" class="container" role="search" ref="autoSuggest" style="padding-top: 2.5rem !important; margin-top: 2.5rem !important; min-height: 100vh;">
    <div class="inner-container" :class="{ 'results-visible': resultsVisible && searchQuery }">
      <div class="container mb-5 is-flex" id="assetsContainer" ref="inputContainer" :class="{'search-open': searchOpen}">
        <span class="title is-2 mr-2" style="margin-bottom: 0; font-weight: 400;">Suche: </span>
        <div class="is-flex">
          <input name="search" placeholder="" ref="searchQuery" type="text" v-model="searchQuery"
            @keyup.prevent="debounceSearch($event)"
            @keydown.prevent.enter="enter"
            @keydown.prevent.down="down"
            @keydown.prevent.up="up"
            @focus="resultsVisible = true"
            class ="title is-4"
            style="border: none; border-bottom: 2px solid #000507!important; margin-bottom: 0; outline: none; font-style: italic; font-weight: 400; min-height: 45px;"
            autofocus>
          <div class="ºpinner-container float-right is-flex">
            <button type="submit" class="button search-button mr-1" style="font-size: 1.5rem; padding: 0;" @click.prevent="clearSearchQuery">
              <svg class="animated fadeIn" v-if="searchQuery" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </button>
            <!--<div class="scaling-squares-spinner spinner animated fadeIn" v-if="spinnerVisible" style="position: relative; left: 0; right: 0; margin: auto; left: -45px;">
              <div class="square"></div>
              <div class="square"></div>
              <div class="square"></div>
              <div class="square"></div>
            </div>-->
          </div>
        </div>
      </div>
      <transition name="fade">
        <ul class="results container mb-5" v-if="searchQuery && resultsVisible && apiResponse">
          <li class="container mb-5 animated fadeIn" ref="result" v-for="(article, index) in articles" :key="article.id">
            <router-link :to="fixPath(article.link, article.type)" :class="{'active': selectedResult(index)}" @mouseover.native="current = index">
              <h4 class="is-marginless" v-html="article.title.rendered" v-if="article.title.rendered"></h4>
              <p class="p-small is-marginless" v-if="article.type">(<span v-html="article.type" v-if="article.type"></span>)</p>
              <p class="is-marginless" v-html="article.excerpt.rendered" v-if="article.excerpt"></p>
              <p class="is-marginless" v-html="article.content.rendered" v-if="article.content"></p>
            </router-link>
          </li>
          <li class="no-results animated fadeIn delay-1s" v-if="searchQuery && (articles.length === 0) && (apiResponse)"><h4>No results found.</h4></li>
        </ul>
      </transition>
    </div>
    <div class="shade" @click.prevent="resultsVisible = false" :class="{ 'results-visible': searchQuery && resultsVisible }"></div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'
import moment from 'moment'



export default {
  components: {
  },

  data () {
    return {
      apiResponse: false,
      articles: [],
      current: -1,
      resultsVisible: false,
      searchOpen: false,
      searchQuery: '',
      spinnerVisible: false
    }
  },

  methods: {
    debounceSearch: debounce(function (event) {
      this.apiResponse = false
      this.spinnerVisible = false
      this.resultsVisible = false
      this.spinnerVisible = false
      if (event.keyCode == 27) {
        this.searchQuery = ""
        this.articles = []
        return
      }
      else {
        this.search()
      }
    }, 200),

    down () {
      (this.current < this.articles.length - 1)
        ? this.current++
        : this.current = 0
    },

    enter () {
      this.$refs.result[this.current].querySelector('a').click()
    },

    clearSearchQuery () {
      this.resultsVisible = false
      this.searchQuery = ''
      this.$refs.searchQuery.focus()
      this.articles = []
      this.spinnerVisible = false
    },

    search () {
      if (this.searchQuery === '') {
        return
      }
      this.spinnerVisible = true
      axios.get(window.SETTINGS.API_BASE_PATH + 'search/'+this.searchQuery)
      .then(response => {
        setTimeout(() => {
          this.articles = response.data;
          this.spinnerVisible = false
        }, 200)
      })
      .catch(e => {
        console.log(e);
      })
      this.apiResponse = true
      this.resultsVisible = true
    },

    selectedResult (index) {
      return index === this.current
    },

    timestamp (date) {
      return moment(date).format('MMM D, YYYY')
    },

    fixPath (url, type) {
      var path = [];
      path = url.split( '/' );
      if (type === "page"){
        path = "/"+path[path.length-2];
      }
      else {
        path = ("/"+path[path.length-3]+"/"+path[path.length-2]);
      }
      return path
    },

    toggleSearch () {
      if (!this.searchOpen) {
        this.$refs.searchQuery.focus()
        this.resultsVisible = true
      } else {
        this.resultsVisible = false
      }
      this.searchOpen = !this.searchOpen
    },

    up () {
      (this.current <= 0)
        ? this.current = this.articles.length - 1
        : this.current--
    }
  },

  watch: {
    '$route' () {
      this.apiResponse = false
      this.current = -1
      this.searchQuery = ''
      this.searchOpen = false
      this.resultsVisible = false
    }
  },

  mounted() {
    this.$refs.searchQuery.focus()
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss";
  #assetsContainer {
    @include breakpoint($phone-small) {
      display: block !important;
    }
  }
  .search-button {
    min-width: 45px;
    height: 45px;
    /*background: rgba($color-bg-dark, 0.7);*/
    border: none;
    border-radius: 0 !important;
    border-bottom: 2px solid rgb(0, 5, 7) !important;
    background: transparent;
    & svg {
      transition: fill .3s ease;
    }
    &:hover svg {
      fill: #ee6c40;
    }
  }
  .p-small {
    font-size: 14px !important;
    color: #656565 !important;
    font-style: italic;
  }

// SPINNEER
  .scaling-squares-spinner, .scaling-squares-spinner * {
      box-sizing: border-box;
    }
    .scaling-squares-spinner {
      height: 45px;
      width: 45px;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      animation: scaling-squares-animation 1250ms;
      animation-iteration-count: infinite;
      transform: rotate(0deg);
    }

    .scaling-squares-spinner .square {
      height: calc(45px * 0.25 / 1.3);
      width: calc(45px * 0.25 / 1.3);
      margin-right: auto;
      margin-left: auto;
      border: calc(45px * 0.04 / 1.3) solid #f25f2e;
      position: absolute;
      animation-duration: 1250ms;
      animation-iteration-count: infinite;
    }

    .scaling-squares-spinner .square:nth-child(1) {
      animation-name: scaling-squares-spinner-animation-child-1;
    }

    .scaling-squares-spinner .square:nth-child(2) {
      animation-name: scaling-squares-spinner-animation-child-2;
    }

    .scaling-squares-spinner .square:nth-child(3) {
      animation-name: scaling-squares-spinner-animation-child-3;
    }

    .scaling-squares-spinner .square:nth-child(4) {
      animation-name: scaling-squares-spinner-animation-child-4;
    }


    @keyframes scaling-squares-animation {

      50% {
        transform: rotate(90deg);
      }

      100% {
        transform: rotate(180deg);
      }
    }

    @keyframes scaling-squares-spinner-animation-child-1 {
      50% {
        transform: translate(150%,150%) scale(2,2);
      }
    }

    @keyframes scaling-squares-spinner-animation-child-2 {
      50% {
        transform: translate(-150%,150%) scale(2,2);
      }
    }

    @keyframes scaling-squares-spinner-animation-child-3 {
      50% {
        transform: translate(-150%,-150%) scale(2,2);
      }
    }

    @keyframes scaling-squares-spinner-animation-child-4 {
      50% {
        transform: translate(150%,-150%) scale(2,2);
      }
    }

</style>