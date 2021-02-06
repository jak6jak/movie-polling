<template>
  <h1 class="logo">
    <b><span>Re</span><span>su</span><span>lts</span></b>
  </h1>
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
import { onMounted, ref } from "vue";
import axios from "axios";
axios.defaults.baseURL = process.env.APP_URL;
import { useRoute } from "vue-router";

export default {
  name: "Results",

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
.logo b {
  font: 400 19vh "Vibur";
  color: rgb(253, 235, 197);
  text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #eeaf02, 0 0 0.5em #a89152,
    0 0 0.1em #c4b63d, 0 10px 3px #000;
}
.logo b span {
  animation: blink linear infinite 2s;
}
.logo b span:nth-of-type(2) {
  animation: blink linear infinite 3s;
}

@keyframes blink {
  78% {
    color: inherit;
    text-shadow: inherit;
  }
  79% {
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
</style>>

