<template>
  <div class="bv-example-row pt-4 has-text-centered mt-3 mb-5">
    <h2 class="title is-1 has-text-centered has-text-weight-light" style="display: block;">Kontakt</h2>
    <div id="mapid"></div>
    <template>
      <section class="hero is-primary is-medium" style="display: none;">
        <div class="hero-body">
          <div>
            <h1 class="title">
              MAP
            </h1>
            <h2 class="subtitle">
              TOKEN
            </h2>
          </div>
        </div>
      </section>
      <div class="container mt-5 mb-3">
        <div class="columns is-multiline">
          <div class="column is-4 animated fadeIn delay-1s slower has-text-left">
            <h5 class="has-text-weight-bold" style="color: #ee6c40 !important;">UNSERE STANDORTE</h5>
          </div>
          <div class="column is-8">
            <div class="columns is-multiline">
              <div class="column is-6 animated fadeIn delay-1s slower has-text-left" v-for="filiale in filialen" v-if="filialen && filialen.length">
                <h5 class="has-text-weight-bold" v-html="filiale.title" v-if="filiale.title && filiale.title.length"></h5>
                <p class="has-text-weight-light" v-html="filiale.content" v-if="filiale.content && filiale.content.length"><br>
                CH-7018 Flims Waldhaus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TeamSingle
      :member='post.acf.contact[0].post_name'
      :title='post.acf.title'
      :message='post.acf.message'
      v-if="post && post.acf && post.acf.contact && post.acf.contact.length"
      ></TeamSingle>
    </template>
  </div>
</template>

<script>

import TeamSingle from '../components/components/TeamSingle.vue';
import Leaflet from 'leaflet';

export default {
  components: {
    TeamSingle
  },
  data() {
    return {
      post: {
        acf: {
          contact: []
        }
      },
      filialen: null
    }
  },

  computed: {

  },

  mounted () {
    this.getPost()
    this.getMap()
  },

  methods: {
    getPost: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'pages?slug=kontakt')
      .then(response => {
        setTimeout(() => {
          this.post = response.data[0];
          this.filialen = this.post.acf.filialen
        }, 20)
      })
      .catch(e => {
        console.log(e);
      })
    },
    getMap () {
      var mymap = L.map('mapid').setView([4.7187437, -74.0343933], 17);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2FtaWxvZGVsdmFzdG8iLCJhIjoiY2pva2tneWl5MDBzdzNxb2Vscnp3OHk0eCJ9.gMrwCZe6xG0LGJ15ZqnScg'
        }).addTo(mymap);
      var circle = L.circle([4.7187437, -74.0343933], {
        color: 'white',
        fillColor: '#ffa500',
        fillOpacity: 0.5,
        radius: 50
    }).addTo(mymap);
      circle.bindPopup("<b>Hello world!</b><br>I am here.");
    }
  }
}
</script>

<style lang="scss">
@import url("https://unpkg.com/leaflet@1.3.4/dist/leaflet.css");

#mapid {
    height: 400px;
    min-height: 400px;
    z-index: 1;
  }
</style>