<template>
  <b-container class="bv-example-row pt-4 mb-5">
    <div
      class="container has-text-centered mb-2 animated fadeIn delay-2s"
    >
      <ul style="margin: auto;">
        <li class="is-paddingless"
            :style="{transform: `translate(-${index}px)`}"
            v-for="(taxonomy, index) in taxonomies"
            v-if="taxonomy.count && hasPosts(taxonomy.id) || taxonomy.id === 0"
          >
          <a href="#" 
            @click="selectTaxonomy(taxonomy)"
            :class="{'active': currentTaxonomy === taxonomy.id}"
            v-html="taxonomy.name"
          ></a>
        </li>
      </ul>
    </div>
  </b-container>
</template>

<script>

export default {
  components: {
  },
  props: [ "taxonomyName", "selected", "posts"],
  data () {
    return {
      taxonomies: [{
        id: 0,
        name: 'Alle'
      }],
      currentTaxonomy: 0,
      fade: false,
    }
  },

  methods: {
    getTaxonomies: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + this.taxonomyName)
      .then(response => {
        var tax = this.taxonomies.concat(response.data);
        this.taxonomies = tax.filter(item => {
          return item.count || item.id === 0
        })
      })
      .catch(e => {
        console.log(e);
      })
    },
    fadeThis: function() {
      this.fade = !this.fade
    },
    selectTaxonomy (taxonomy) {
      this.currentTaxonomy = taxonomy.id
      this.$emit('select:taxonomy', { taxonomy: taxonomy.taxonomy, term: taxonomy.id })
      event.preventDefault()
    },
    hasPosts(taxonomyId) {
      return true
      // This function would hide/show categories in the bar if the posts array in memory doesn't have any item. Disabled for now.
      const filtered = this.posts.filter(post => {
        return post.classification.includes(taxonomyId)
      })
      return filtered.length > 0
    },
    getReferencesForThisTaxonomy(taxonomyId) {
      /*
      axios.get(...&tax_id=taxonomyId)
        .then(response => {
          this.$store.commit('ADD_MORE_ENTRIES', {
            taxonomyId: taxonomyId,
            posts: response.data
          })
        }

        // en es store, use Vue.set eventually
        if (state.store.entries) {
          state.store.entries = state.store.entries.concat(posts)
        } else {
          state.store.entries = posts
        }
      */
    }
  },

  mounted () {
    this.getTaxonomies()

    if (this.selected) {
      this.currentTaxonomy = this.selected
    }
  }
}
</script>

<style scoped lang="scss">
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  li {
    border-left: 1px solid #f25f2e;
    border-right: 1px solid #f25f2e;
  }
  a {
    color: #AAA !important;
    padding: 0 10px;
    font-weight: bold;
    &:hover { cursor: pointer; }
    &.active {
      color: #f25f2e !important;
    }
  }
</style>