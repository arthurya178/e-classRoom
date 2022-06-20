<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="columns">
              <div class="column ">
                <div class="columns">
                  <div class="column  is-half">
                    <span class="title is-3">系別:</span>
                    <span class="subtitle is-3"> {{ usr_data.user_department }} </span>
                  </div>
                  <div class="column  is-half">
                    <span class="title is-3">班級:</span>
                    <span class="subtitle is-3">{{ usr_data.user_class }}</span>
                  </div>
                </div>
                <div class="columns">
                  <div class="column  is-half">
                    <span class="title is-3">學號:</span>
                    <span class="subtitle is-3"> {{ usr_data.user_std_id }} </span>
                  </div>
                  <div class="column  is-half">
                    <span class="title is-3">姓名:</span>
                    <span class="subtitle is-3">{{ usr_data.user_name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item " @click="questionFinish" v-if="userStatus != 1 && usr_data.user_Permission == 'student'">
            完成
          </a>
          <a  class="card-footer-item " @click="questionUndone" v-if="userStatus != 0 && usr_data.user_Permission == 'student' ">
            未完成
          </a>
          <a  class="card-footer-item " @click="questionExist" v-if="userStatus !=- 1  && usr_data.user_Permission == 'student'">
            我有問題
          </a>
        </footer>
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: "personalCard",
  created() {
    this.$store.dispatch('fetchUserFromSever')
    this.$store.dispatch('fetchClassRoomFromSV')
  },
  methods: {
    questionFinish:function (){
      this.$store.dispatch('changeStatus',1)
      this.$store.dispatch('fetchClassRoomFromSV')
    },
    questionUndone:function (){
      this.$store.dispatch('changeStatus',0)
      this.$store.dispatch('fetchClassRoomFromSV')
    },
    questionExist:function (){
      this.$store.dispatch('changeStatus',-1)
      this.$store.dispatch('fetchClassRoomFromSV')
    }
  },
  computed: {
    ...mapGetters(['usr_data','userStatus'])
  }
}
</script>

<style scoped>

</style>