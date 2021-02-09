<template>
  <div>
    <div
      :class="`movieCard panel block  mb-5 ${selected ? 'selectedBorder' : ''}`"
    >
      <div class="columns px-1">
        <div class="column is-1 mx-1">
          <img :src="`https://image.tmdb.org/t/p/w92/${posterPath}`" alt="" />
        </div>
        <div class="column">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <h4 class="title">
                  {{ title }}
                </h4>
              </div>
              <div class="level-item">
                <p class="subtitle">
                  {{ new Date(releaseDate).getFullYear() }}
                </p>
              </div>
            </div>
          </div>
          <p>
            {{ overview }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = process.env.APP_URL;

export default {
  name: "Movies",
  props: {
    posterPath: String,
    title: String,
    releaseDate: String,
    overview: String,
    selected: Boolean,
  }

};
</script>

<style scoped lang="scss">
@import "~bulma";
@import url(//fonts.googleapis.com/css?family=Vibur);

button {
  background-color: #f5cb5c !important;
  border-radius: 0.5rem;
}

h4 {
  text-align: left;
}
p {
  text-align: left;
}
.double {
  width: 100%;
}
.selectedBorder {
  box-shadow: 0 0 10pt 5pt #f5cb5c;
}
.movieCard {
  background-color: #f0f0f0;
}

.navbar {
  background-color: #f0f0f0;
}
</style>