<template>
  <Logo text="Movie Night Poll" />
  <SetupPollForm />
  <Info/>
</template>

<script>
import SetupPollForm from "../components/SetupPollForm.vue";
import Logo from "../components/Logo";
import Info from '../components/Info'

export default {
  name: "SetupPoll",
  components: {
    SetupPollForm,
    Logo,
    Info
  },
};
</script>
<style scoped lang="scss">
</style>