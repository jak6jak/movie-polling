<template>
  <div class="navbar is-fixed-bottom">
        <div class="navbar-start">
          <div class="navbar-item">
            <h4 class="subtitle is-4">
              Remaining Votes: {{remainingVotes }}
            </h4>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <share />
          </div>
          <div class="navbar-item">
            <button class="button" @click="submitVotes()">
              Submit
            </button>
          </div>
        </div>
      </div>
</template>

<script>
import share from "./share";

export default {
name:"voteBar",
props: {
 remainingVotes: Number
},
methods: {
  submitVotes() {
    this.$emit("submitVotes")
  }
},
components: {
    share
}

}
</script>

<style>

</style>