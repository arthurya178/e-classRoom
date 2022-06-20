<template>
  <nav-bar></nav-bar>
  <personal-card class="mt-4"></personal-card>
  <div class="is-centered">
    <p class="title is-1"> {{classroomTitle}}</p>
  </div>
  <std-classroom></std-classroom>

</template>

<script>
import {mapGetters} from "vuex"
import personalCard from "@/components/classRoom/personalCard";
import StdClassroom from "@/components/classRoom/stdClassroom";
import NavBar from "@/components/navBar";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  components: {
    NavBar,
    StdClassroom,
    personalCard
  },
  created() {
    this.$store.dispatch('fetchUserFromSever')

  },
  methods: {},
  computed: {
    ...mapGetters(['usr_data','classroomTitle'])
  }
}
</script>

<style scoped>

</style>