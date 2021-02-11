<template>
  <Logo text="Results"/>
  <h2 class="title has-text-white">Number Voted: {{ NumberVoted }}</h2>
  <ul>
    <div v-if="!loading">
      <div v-for="item in sortList(Movies)" :key="item._id">
        <div class="box container mb-3">
          <div class="columns">
            <div class="column">
              <h1 class="title">{{ item.movies }}</h1>
            </div>
            <div class="column">
              <h2 class="title">{{ item.votes }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ul>
</template>

<script>
import Logo from '../components/Logo'
import { onMounted, ref } from "vue";
import axios from "axios";
axios.defaults.baseURL = process.env.APP_URL;
import { useRoute } from "vue-router";

export default {
  name: "Results",
  components: {
    Logo
  },
  setup() {
    const Movies = ref([]);
    const NumberVoted = ref(0);
    const loading = ref(true);
    onMounted(() => {
      const route = useRoute();

      axios.get(`/pollpage/${route.params.id}`).then((response) => {
        console.log(response);
        Movies.value = response.data.movieList;
        NumberVoted.value = response.data.numberofPeopleVoted;
        loading.value = false;
      });
    });

    return {
      Movies,
      NumberVoted,
      loading,
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

<style scoped lang="scss">
</style>>

