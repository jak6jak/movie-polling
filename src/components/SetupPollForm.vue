<template>
  <div class="box container">
    <div>
      <h1 class="subtitle level-left">Poll Title</h1>
      <input
        class="input block"
        placeholder="Poll Title"
        type="text"
        v-model="Title"
      />
      <h1 class="subtitle level-left">Movie Title List: (Seperate by new lines)</h1>
      <textarea
        class="textarea block"
        label="Movies"
        rows="10"
        v-model="MovieList"
      />
      <div>
        <div>
          <h2 class="subtitle level-left block mb-4">Number of Votes:</h2>
        </div>
      </div>
      <div>
        <div class="level">
          <div class="level-item">
            <input
              type="number"
              class="input"
              label="Number of Votes"
              v-model="NumberOfVotes"
            />
          </div>
          <div class="level-item level-right">
            <button class="button is-large" v-on:click="postPoll">New Poll</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = process.env.APP_URL;
import router from "../router/index";

export default {
  name: "SetupPollForm",
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
      console.log(process.env.APP_URL)
      axios
        .post("pollPage", {
          pollName: this.Title,
          MovieList: this.getMovies(),
          numberofPeopleVoted: 0,
          maxVotes: this.NumberOfVotes,
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
}
</script>

<style scoped lang="scss">
@import url(//fonts.googleapis.com/css?family=Vibur);

.subtitle {
  color: #242423;
}
.container{
  background-color: #f0f0f0;
}
textarea {
  background-color: #d8d7d7;
}
input {
  background-color: #d8d7d7;
}
button {
  background-color: #F5CB5C;
  border-radius: .5rem;
  
}
.logo b{
font: 400 19vh "Vibur";
  color: rgb(253, 235, 197);
  text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #eeaf02, 0 0 0.5em #a89152, 0 0 0.1em #c4b63d, 0 10px 3px #000;
}
.logo b span{
  animation: blink linear infinite 2s;
}
.logo b span:nth-of-type(2){
  animation: blink linear infinite 3s;
}

@keyframes blink {
  78% {
    color: inherit;
    text-shadow: inherit;
  }
  79%{
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