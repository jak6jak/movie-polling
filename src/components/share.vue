<template>
  <button class="button" @click="copyUrl">
    <span class="icon">
      <i class="fas fa-share"></i>
    </span>
    <span> Copy Link </span>
  </button>
</template>

<script>
import { toast } from "bulma-toast";

export default {
  name: "share",
  methods: {
    copyUrl() {
      this.displayToast();
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

    displayToast() {
      toast({
        message: "Copied link to clipboard!",
        type: "is-primary",
        position: "top-center",
        dismissible: true,
        pauseOnHover: false,
      });
    },
  },
};
</script>

<style>
</style>