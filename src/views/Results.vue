<template>
  <h1>Results</h1>
  <h2>Number Voted: {{ NumberVoted }}</h2>
  <ul>
    <div v-if="!loading">
    <div v-for="item in sortList(Movies)" :key="item._id">
      <MDBCard class="mb-1">
        <MDBRow>
          <MDBCol>
            <h1>{{ item.movies }}</h1>
          </MDBCol>
          <MDBCol>
            <h2>{{ item.votes }}</h2>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
    </div>
  </ul>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

import { MDBCard, MDBRow, MDBCol } from "mdb-vue-ui-kit";

export default {
  name: "Results",
  components: {
    MDBCard,
    MDBRow,
    MDBCol,
  },

  setup() {
    const Movies = ref([]);
    const NumberVoted = ref(0);
    const loading = ref(true);
    onMounted(() => {
      const route = useRoute();

      axios
        .get(`http://localhost:3000/pollpage/${route.params.id}`)
        .then((response) => {
          console.log(response);
          Movies.value = response.data.movieList;
          NumberVoted.value = response.data.numberofPeopleVoted;
          loading.value = false;
        });
      let socket = new WebSocket(
        `ws:localhost:3000/Results/${route.params.id}`
      );
      socket.onopen = function () {
        console.log("Connection established!");
        socket.send("My name is " + route.params.id);
      };

      socket.onmessage = function (event) {
        console.log(`[message] Data received from server: ${event.data}`);
      };
    });

    return {
      Movies,
      NumberVoted,
      loading
    };
  },
  methods: {
    sortList(Movies) {
      return Movies.sort((first, second) => {
        if (first.votes < second.votes) {
          return 1;
        }
        if (first.votes > second.votes) {
          return -1;
        }
        return 0;
      });
    },
  },
};
</script>

<style scoped>
</style>>

