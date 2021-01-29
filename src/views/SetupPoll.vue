<template>
  <MDBContainer>
    <h1>Setup Poll</h1>
    <MDBCard text="start" border="light" class="px-3">
      <MDBCardHeader class="my-3">Poll Title</MDBCardHeader>
      <MDBInput label="Poll Title" type="text" v-model="Title" />
      <MDBCardHeader class="my-3"
        >Movie List (Seperate by new lines)</MDBCardHeader
      >
      <MDBTextarea label="Movies" rows="10" v-model="MovieList" />
      <MDBRow class="d-flex">
        <MDBCol col="12" class="mt-3">
          <MDBCardHeader>Number of Votes:</MDBCardHeader>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol col="5" class="align-items-start">
          <MDBInput
            type="number"
            class="mt-3"
            label="Number of Votes"
            v-model="NumberOfVotes"
          />
        </MDBCol>
      </MDBRow>
      <MDBCol col="12" class="d-flex flex-row-reverse align-items-end">
        <MDBBtn size="lg" tag="a" href="#/vote" color="primary" class="my-3" v-on:click="postPoll"
          >New Poll</MDBBtn
        >
      </MDBCol>
    </MDBCard>
  </MDBContainer>
</template>

<script>
import axios from "axios";

import {
  MDBContainer,
  MDBInput,
  MDBTextarea,
  MDBCard,
  MDBCardHeader,
  MDBBtn,
  MDBCol,
  MDBRow,
} from "mdb-vue-ui-kit";
// import { ref } from "vue";
export default {
  name: "SetupPoll",
  components: {
    MDBContainer,
    MDBInput,
    MDBTextarea,
    MDBCard,
    MDBCardHeader,
    MDBBtn,
    MDBRow,
    MDBCol,
  },
  data: function () {
    return {
      Title: '',
      MovieList: '',
      NumberOfVotes: 1
    }
  },
  setup() {
    // const Title = ref("");
    // const MovieList = ref("");
    // const NumberOfVotes = ref("");
    // return {
    //   Title,
    //   MovieList,
    //   NumberOfVotes,
    // };
  },
  methods: {
    postPoll: function () {
      console.log(this.getMovies())
      axios.post('https:localhost:3000/pollPage', {
        pollName: this.Title,
        MovieList: this.getMovies()
      });
    },
    getMovies: function() {
      return this.MovieList.split('\n');
    }
  },
};
</script>