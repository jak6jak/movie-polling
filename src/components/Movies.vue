<template>
  <MDBContainer class="bg-light">
    <h1>MOVIES</h1>
    <div v-if="!loading">
      <div v-for="post in MovieData" :key="post.data.id">
        <MDBCard
          :class="`my-3 MovieCard bg-light border-${post.selected ? 5 : 1}`"
          :border="post.selected ? 'success' : 'primary'"
          @click="selectListItem(post)"
        >
          <MDBRow class="align-items-start my-3">
            <MDBCol md="2">
              <img
                :src="`https://image.tmdb.org/t/p/w92/${post.data.poster_path}`"
                alt=""
              />
            </MDBCol>
            <MDBCol>
              <MDBRow>
                <MDBCol md="auto">
                  <h4 class="float start">
                    {{ post.data.title }}
                  </h4>
                </MDBCol>
                <MDBCol md="auto">
                  <p class="float-start px-3">
                    {{ new Date(post.data.release_date).getFullYear() }}
                  </p>
                </MDBCol>
              </MDBRow>
              <p class="d-flex-block justify-content-start text-left me-4">
                {{ post.data.overview }}
              </p>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </div>
      <MDBRow>
        <MDBCol>
          <h4>Remaining Votes: {{ MaxVotes - numberOfSelectedMovies }}</h4>
        </MDBCol>
        <MDBCol class="d-flex flex-row-reverse">
          <MDBBtn
            size="lg"
            color="primary"
            tag="a"
            @click="submitVotes(MovieData)"
            >Submit</MDBBtn
          >
        </MDBCol>
      </MDBRow>
    </div>
  </MDBContainer>

  <p v-if="loading">Still Loading...</p>
</template>

<script>
import { ref, onMounted } from "vue";
import { MDBCol, MDBRow, MDBContainer, MDBCard, MDBBtn } from "mdb-vue-ui-kit";
import { useRoute} from "vue-router";
import router from "../router/index";
import axios from "axios";
export default {
  name: "Posts",
  components: {
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCard,
    MDBBtn,
  },
  data() {
    return {
      numberOfSelectedMovies: 0,
    };
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
      await axios.patch(
        `http://localhost:3000/pollPage/${this.$route.params.id}`,
        {
          movieList: MovieNames,
        }
      ).then(()=> {
        router.push({name: 'Results', params: {id: this.$route.params.id}})
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
        .get(`http://localhost:3000/pollPage/fetchMovie/${query}`)
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
          // console.log(MovieData);
          loading.value = false;
          console.log(movieId);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(() => {
      axios
        .get(`http://movienightpoll.com:3000/pollPage/${route.params.id}`)
        .then((response) => {
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
h4 {
  text-align: left;
}
p {
  text-align: left;
}
.double {
  width: 100%;
}
</style>