<template>
  <div class="columns is-multiline" >
    <div class="column is-2" v-for="std in classroomAll" :key="std">
      <std-list class="std-card-style " :card-info="std"></std-list>
    </div>

  </div>

</template>

<script>
import StdList from "@/components/classRoom/stdList";
import {mapGetters} from "vuex";

export default {
  name: "stdClassroom",
  components: {StdList},
  created() {
    this.$store.dispatch('fetchClassRoomFromSV')
    //eslint-disable-next-line
    this.timer = setInterval(()=>{
      console.log("UpdateClassRoom")
      this.$store.dispatch('fetchClassRoomFromSV')
    },3000)
  },
  data() {
    return {
      timer:null
    }
  },
  computed:{
    ...mapGetters(['classroomAll','classroomTitle','userStatus'])
  },
  unmounted() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
</style>