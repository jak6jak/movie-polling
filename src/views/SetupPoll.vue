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
        <MDBBtn
          size="lg"
          tag="a"
          color="primary"
          class="my-3"
          v-on:click="postPoll"
          >New Poll</MDBBtn
        >
      </MDBCol>
    </MDBCard>
  </MDBContainer>
</template>

<script>
import axios from "axios";
import router from "../router/index";
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
      Title: "",
      MovieList: "",
      NumberOfVotes: 1,
      pollId: 0,
    };
  },
  methods: {
    postPoll: function () {
      console.log(this.getMovies());
      axios
        .post("http://localhost:3000/pollPage", {
          pollName: this.Title,
          MovieList: this.getMovies(),
          numberofPeopleVoted: 0,
          maxVotes: this.NumberOfVotes
          
        })
        .then((result) => {
          console.log(result);
          this.pollId = result.data._id;
          router.push("/vote/" + this.pollId);
        });
    },
    getMovies: function () {
      const data = this.MovieList.split("\n");
      let returnData = [];
      for (let i in data) {
        let item = data[i];

        returnData.push({
          movies: item,
          votes: 0,
        });
      }

      return returnData;
    },
  },
};
</script>