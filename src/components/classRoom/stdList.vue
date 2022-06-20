<template>
  <div class="p-2" >
      <div class="card is-one-third std-card-style"
           :class="{'un-finish':cardInfo.stdStatus==0,'finish':cardInfo.stdStatus==1,'question':cardInfo.stdStatus==-1}">
        <div class="card-content std-card-overflow" style="height: 200px;margin-bottom: 15px">
          <p class="title is-3"> {{ cardInfo.stdName }} </p>
          <p class="title is-5">{{ cardInfo.stdId }}</p>
        </div>
        <div class="card-footer columns is-centered">
          <p class="subtitle is-3 " v-if="cardInfo.stdStatus==1">
            已完成
          </p>
          <p class="subtitle is-3" v-if="cardInfo.stdStatus==0">
            未完成
          </p>
          <p class="subtitle is-3" v-if="cardInfo.stdStatus==-1">
            有問題
          </p>

        </div>
      </div>
  </div>

</template>

<script>


import {mapGetters} from "vuex";

export default {
  name: "stdList",
  props: {
    "cardInfo": {}
  },
  computed:{
    ...mapGetters(["usr_data"])
  }
}
</script>

<style scoped>
.std-card-style {
  height: 250px;
}

.std-card-overflow {
  overflow-y: hidden;
  overflow-x: hidden;
}


.un-finish {
  background-color: #f1b483;
  transition: all 2s linear;
}

.finish {
  background-color: #9efc9e;
  transition: all 2s linear;
}

.question {
  background-color: #ff8585;
  transition: all 2s linear;
}
</style>