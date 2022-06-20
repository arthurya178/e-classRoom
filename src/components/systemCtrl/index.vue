<template>
  <nav-bar ></nav-bar>
  <div class="is-centered columns mt-4">
    <div class=" column card is-half is-centered">
      <p class="title is-2">控制面板</p>
      <hr>
      <div class="card-content">
        <div class="columns">
          <p class="subtitle is-5 column " ><strong>重置並建立教室</strong></p>
          <button class="column button is-primary is-one-fifth" @click="recreateClassroom">重置</button>
        </div>
        <div class="columns">
          <p class="subtitle is-5 column " ><strong>教室名稱</strong></p>
          <input class="column is-4 input mr-2" placeholder="要修改的名稱" v-model="classTitle">
          <button class="column is-3 button is-primary is-one-fifth" @click="updateClassroomTitle">修改</button>
        </div>
        <div class="columns is-centered">
          <p class="subtitle is-5 column " ><strong>{{ classroomTitle }}</strong></p>
        </div>
<!--        <div class="columns">-->
<!--          <p class="subtitle is-5 column " ><strong>調整功能</strong></p>-->
<!--          <button class="column is-one-fifth button is-primary  m-3">OPEN</button>-->
<!--          <button class="column is-one-fifth button is-danger  m-3">ClOSE</button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar";
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "systemControl",
  components: {NavBar},
  data(){
    return{
      classTitle:""
    }
  },
  created() {
    this.$store.dispatch("fetchUserFromSever")
    this.$store.dispatch("fetchClassRoomFromSV")
  },
  methods:{
    recreateClassroom:function(){
      let check = confirm("你確定要修改嗎?")
      if(check){
        axios.get('/api/classroom/create').then(()=>{
          alert("重置完成")
        })
      }
      else {
        alert("重製已取消")
      }

    },
    updateClassroomTitle:function (){
      this.$store.dispatch("setClassroomTitle",this.classTitle)
      this.$store.dispatch("fetchClassRoomFromSV")
    }
  },
  computed:{
    ...mapGetters(['usr_data','classroomTitle'])
  }
}
</script>

<style scoped>

</style>