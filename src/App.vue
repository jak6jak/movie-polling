<template>
  <router-view/>
  <br/>
  <footer class="footer">
    <p class="title is-4 has-text-white">Created by Jacob Edie</p>
    <p>Made with ❤️ on <a href="https://github.com/jak6jak/movie-polling">Github</a></p>
  </footer>
</template>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  margin: 0;
}
html {
  background-color: #2c3e50;
  overflow: hidden;
}
p a {
  color: white;
  text-decoration: underline;
}
body{
  background: rgb(0, 0, 0) url(assets/Background.jpg) center repeat;
  background-size: auto;
  margin: 0px;

}
footer {

  p {
    color: white;
  }
   background: rgb(0, 0, 0) url(assets/Background.jpg) center repeat-y !important;
   background-size: cover !important;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
