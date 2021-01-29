<template>
  <div class="movieCard">
    <h1>{{ movieTitle }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    movieTitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(props);
    return {};
  },

};
</script>

<style>
.movieCard{
    display: flex;
    flex-wrap: wrap;
    border-style: solid;
    border-radius: 5px;
    border-color: black;
}
</style>