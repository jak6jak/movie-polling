<template>
  <button class="button" @click="copyUrl">
    <span class="icon">
      <i class="fas fa-share"></i>
    </span>
    <span> Share </span>
  </button>
</template>

<script>
export default {
  name: "share",
  methods: {
    copyUrl() {
      console.log("hello0");
      const el = document.createElement("textarea");
      el.value = window.location.href;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    },
  },
};
</script>

<style>
</style>