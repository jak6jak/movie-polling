<template>
  <div class="home">
    <Logo text="Vote" />
    <div class="container" v-if="!loading">
      <h4 class="subtitle is-4 has-text-white">
        Remaining Votes: {{ MaxVotes - numberOfSelectedMovies }}
      </h4>
      <div v-for="post in orderedMovies" :key="post.data.id">
        <Movie
          :title="post.data.title"
          :poster-path="post.data.poster_path"
          :release-date="post.data.release_date"
          :overview="post.data.overview"
          :selected ="post.selected"
          @click="selectListItem(post)"
        />
        
      </div>
    </div>
    <div class="container" v-if="loading">
      <div v-for="post in Movies" :key="post._id">
        <div class="movieCard panel mb-5">
          <div class="load-wraper">
            <div class="activity"></div>
          </div>
        </div>
      </div>
    </div>
    <VoteBar :remainingVotes="MaxVotes - numberOfSelectedMovies" @submit-votes="submitVotes(MovieData)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Movie from "@/components/Movie.vue";
import Logo from "@/components/Logo.vue";
import VoteBar from "@/components/voteBar.vue";
import axios from "axios";
import router from "../router/index";
import { ref, shallowRef, onMounted } from "vue";
import { useRoute } from "vue-router";


export default {
  name: "Vote",
  components: {
    Movie,
    Logo,
    VoteBar,
  },
    data() {
    return {
      numberOfSelectedMovies: 0,
    };
  },
  computed: {
    orderedMovies: function () {
      let newMovies = this.MovieData;
      return newMovies.sort((first, second ) => (first.data.title > second.data.title) ? 1: -1);
    },
    remainingVotes: function () {
      return this.MaxVotes - this.numberOfSelectedMovies;
    }
  },
  methods: {
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
  },
  setup() {
    const loading = ref(true);
    let MovieData = ref([]);
    let Movies = shallowRef([]);
    const route = useRoute();
    let MaxVotes = ref(1);

    function fetchData(query, movieId) {
      axios
        .get(`/pollPage/fetchMovie/${encodeURIComponent(query)}`)
        .then((response) => {
         let  data = response.data;
          let found = false;
          for (let i = 0; i < data.results.length; i++) {
            if (
              data.results[i].title.toUpperCase() === query.toUpperCase()
            ) {
              MovieData.value.push({
                data: data.results[i],
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
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(() => {
      axios.get(`/pollPage/${route.params.id}`).then((response) => {
        Movies.value = response.data.movieList;
        MaxVotes.value = response.data.maxVotes;
        Movies.value.forEach((element) => {
          if (!element.movies !== "") {
            fetchData(element.movies, element._id);
          }
        });
        console.log(MovieData);
      });
    });

    return {
      MovieData,
      loading,
      Movies,
      MaxVotes,
    };
  },
};
</script>
<style scoped lang="scss">
@import "~bulma";

.load-wraper {
  position: relative;
  height: 10rem;
  width: 100%;
  background-color: rgb(211, 211, 211);
  z-index: 44;
  overflow: hidden;
  border-radius: 5px;
}
.activity {
  position: absolute;
  left: -45%;
  height: 100%;
  width: 45%;
  background-image: linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  background-image: -moz-linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  background-image: -webkit-linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  animation: loading 1s infinite;
  z-index: 45;
}
@keyframes loading {
  0% {
    left: -45%;
  }
  100% {
    left: 100%;
  }
}
</style>