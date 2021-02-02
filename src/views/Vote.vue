<template>
  <div class="home">
    <Movies/>
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
