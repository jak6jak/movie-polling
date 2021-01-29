<template>
  <div class="home">
    <Movies :Movies="['Mulan', 'Toy Story 2']" :MaxVotes="2"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Movies from '@/components/Movies.vue'

export default {
  name: 'Vote',
  components: {
    Movies
  }
}
</script>
