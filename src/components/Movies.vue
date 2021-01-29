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
          <MDBBtn size="lg" color="primary" href="#/Results" tag="a">Submit</MDBBtn>
        </MDBCol>
      </MDBRow>
    </div>
  </MDBContainer>

  <p v-if="loading">Still Loading...</p>
</template>

<script>
import { ref, onMounted } from "vue";
import { MDBCol, MDBRow, MDBContainer, MDBCard, MDBBtn } from "mdb-vue-ui-kit";
export default {
  name: "Posts",
  // props: {
  //   Movies: Array,
  //   MaxVotes: Number,
  // },
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
  },
  setup(props) {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    let MovieData = ref([]);

    function fetchData(query) {
      let request = new XMLHttpRequest();

      request.open(
        "GET",
        `https://api.themoviedb.org/3/search/movie?api_key=3326e0bbf4e3afc78d9ca480466d90fa&language=en-US&query=${query}&page=1&include_adult=false`,
        true
      );

      request.onload = function () {
        data.value = JSON.parse(this.response);
        // console.log(data.value);
        MovieData.value.push({ data: data.value.results[0], selected: false });
        // console.log(MovieData);
        loading.value = false;
      };

      request.send();
    }

    onMounted(() => {
      props.Movies.forEach((element) => {
        fetchData(element);
      });
    });

    return {
      MovieData,
      loading,
      error,
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