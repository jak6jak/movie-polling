<template>
  <div>
    <h1 class="logo">
      <b><span>VO</span><span>TE</span></b>
    </h1>

    <div class="container" v-if="!loading">
      <h4 class="subtitle is-4 has-text-white">
        Remaining Votes: {{ MaxVotes - numberOfSelectedMovies }}
      </h4>
      <div v-for="post in MovieData" :key="post.data.id">
        <div
          :class="`movieCard panel block  mb-5 ${
            post.selected ? 'selectedBorder' : ''
          }`"
          @click="selectListItem(post)"
        >
          <div class="columns px-1">
            <div class="column is-1 mx-1">
              <img
                :src="`https://image.tmdb.org/t/p/w92/${post.data.poster_path}`"
                alt=""
              />
            </div>
            <div class="column">
              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <h4 class="title">
                      {{ post.data.title }}
                    </h4>
                  </div>
                  <div class="level-item">
                    <p class="subtitle">
                      {{ new Date(post.data.release_date).getFullYear() }}
                    </p>
                  </div>
                </div>
              </div>
              <p>
                {{ post.data.overview }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h4 class="subtitle is-4 has-text-white">
              Remaining Votes: {{ MaxVotes - numberOfSelectedMovies }}
            </h4>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <share />
          </div>
          <div class="level-item">
            <button class="button" @click="submitVotes(MovieData)">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p v-if="loading">Still Loading...</p>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "../router/index";
import axios from "axios";
import share from "./share";
axios.defaults.baseURL = process.env.APP_URL;

export default {
  name: "Posts",
  data() {
    return {
      numberOfSelectedMovies: 0,
    };
  },
  components: {
    share,
  },
  methods: {
    selectListItem(selectedItem) {
      if (
        this.numberOfSelectedMovies < this.MaxVotes &&
        selectedItem.selected == false
      ) {
        selectedItem.selected = true;
        this.numberOfSelectedMovies++;
      } else if (selectedItem.selected == true) {
        selectedItem.selected = false;
        this.numberOfSelectedMovies--;
      }
    },
    async submitVotes(MovieData) {
      let MovieNames = [];
      console.log(MovieData);
      MovieData.forEach((element) => {
        if (element.selected == true) {
          MovieNames.push(element.movieId);
        }
      });
      await axios
        .patch(`/pollPage/${this.$route.params.id}`, {
          movieList: MovieNames,
        })
        .then(() => {
          router.push({
            name: "Results",
            params: { id: this.$route.params.id },
          });
        });
    },
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    let MovieData = ref([]);
    let Movies = ref([]);
    const route = useRoute();
    let MaxVotes = ref(1);

    function fetchData(query, movieId) {
      axios
        .get(`/pollPage/fetchMovie/${query}`)
        .then((response) => {
          console.log(response);
          data.value = response.data;
          let found = false;
          for (let i = 0; i < data.value.results.length; i++) {
            if (
              data.value.results[i].title.toUpperCase() === query.toUpperCase()
            ) {
              MovieData.value.push({
                data: data.value.results[i],
                selected: false,
                movieId: movieId,
              });
              found = true;
              break;
            }
          }

          if (!found) {
            MovieData.value.push({
              data: {
                title: query,
                overview: "Movie was not found in database",
              },
              selected: false,
              movieId: movieId,
            });
          }
          loading.value = false;
          console.log(movieId);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(() => {
      axios.get(`/pollPage/${route.params.id}`).then((response) => {
        console.log(response);
        Movies.value = response.data.movieList;
        MaxVotes.value = response.data.maxVotes;
        console.log(MaxVotes.value);

        Movies.value.forEach((element) => {
          console.log(element);
          if (element.movies != "") {
            fetchData(element.movies, element._id);
          }
        });
      });
    });

    return {
      MovieData,
      loading,
      error,
      Movies,
      MaxVotes,
    };
  },
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

.logo b {
  font: 400 19vh "Vibur";
  color: rgb(253, 235, 197);
  text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #eeaf02, 0 0 0.5em #a89152,
    0 0 0.1em #c4b63d, 0 10px 3px #000;
}
.logo b span {
  animation: blink linear infinite 2s;
}
.logo b span:nth-of-type(2) {
  animation: blink linear infinite 3s;
}

@keyframes blink {
  78% {
    color: inherit;
    text-shadow: inherit;
  }
  79% {
    color: #333;
  }
  80% {
    text-shadow: none;
  }
  81% {
    color: inherit;
    text-shadow: inherit;
  }
  82% {
    color: #333;
    text-shadow: none;
  }
  83% {
    color: inherit;
    text-shadow: inherit;
  }
  92% {
    color: #333;
    text-shadow: none;
  }
  92.5% {
    color: inherit;
    text-shadow: inherit;
  }
}
</style>