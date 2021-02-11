<template>
  <section class="section is-medium">
    <div class="columns is-vcentered">
      <div class="column">
        <div class="card">
          <div class="card-image mt-3">
            <img
              src="https://image.tmdb.org/t/p/w185/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" alt="Wonder Woman Poster image"
            />
            <img class="hide"
              src="https://image.tmdb.org/t/p/w185/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg" alt="Soul Movie Poster"
            />
            <img class="hide"
              src="https://image.tmdb.org/t/p/w185/z3kLwALt3uqPFNnrTi8LOLCC5A0.jpg" alt="Tooth Fairy Movie Poster"
            />

            <!-- <img src="https://image.tmdb.org/t/p/w185/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"/>
        <img src="https://image.tmdb.org/t/p/w185/uHwjbztkPEW3lcfsbKGO3XlaPjL.jpg"/>
        <img src="https://image.tmdb.org/t/p/w185/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg"/> -->
          </div>
          <div class="card-content">
            <p class="title">A polling website dedicated to voting on Movies</p>
            <p class="content">
              Movie night poll is a polling website geared towards voting on
              movies. With Movie Night poll you can make informed decisions on
              what movie to vote for.
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card py-6">
          <div class="card-content">
            <p class="title pb-5 my-4">
              Automatically pulls description and movie information for each movie!
            </p>
            <Movie
              id="firstMovie"
              title="Soul"
              poster-path="/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg"
              release-date="2021"
              overview="Ever wonder where your passion, your dreams and your interests come from? What is it that makes you... YOU? In 2020, Pixar Animation Studios takes you on a journey from the streets of New York City to the cosmic realms to discover the answers to life's most important questions."
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Movie from "./Movie";

export default {
  name: "info",
  components: {
    Movie,
  },
};
</script>

<style scoped>

@media (max-width: 629px) {
  .hide {
    display: none;
  }
}
/* .hero-body {
    background-image:url(https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg);
    background-size: cover;
} */
</style>