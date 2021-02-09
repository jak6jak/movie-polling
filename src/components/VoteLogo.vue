<template>
      <h1 class="logo">
      <b><span>VO</span><span>TE</span></b>
    </h1>
</template>

<script>
export default {
 name:"voteLogo"
}
</script>

<style>
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
</style>