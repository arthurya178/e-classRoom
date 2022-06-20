<template xmlns="http://www.w3.org/1999/html">
  <nav-bar></nav-bar>

  <div class="columns is-centered mt-4">
    <div class="column is-one-third">
      <div class="card-content ">
        <p class="title">
          修改個人資料
        </p>
        <form @submit.prevent="sendRegister" method="post">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">系別</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="系別" required v-model="userDepartment" maxlength="15">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-school"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">班級</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="班級" required v-model="userClass" maxlength="15">
                  <span class="icon is-small is-left">
                  <i class="fa-solid fa-book-open"></i>
                </span>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">學號</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="學號"  maxlength="15" disabled>
                  <span class="icon is-small is-left">
                  <i class="fa-solid fa-user"></i>
                </span>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">姓名</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="姓名" required v-model="userName" maxlength="15" >
                  <span class="icon is-small is-left">
                  <i class="fa-solid fa-id-card"></i>
                </span>
                </p>
              </div>
            </div>
          </div>

          <div class="buttons is-centered">
            <button class="button is-primary" type="submit">註冊帳號</button>
            <button class="button is-warning" type="reset">清除</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";
import NavBar from "@/components/navBar";

export default {
  //eslint-disable-next-line
  name: "index",
  components: {NavBar},
  created() {
    this.$store.dispatch('fetchUserFromSever')
  },
  data(){
    return{
      userName:'',
      userID:"",
      userClass:"",
      userDepartment:"",
    }
  },
  computed:{
    ...mapGetters(["usr_data"])
  },
  mounted() {
    console.log(this.usr_data)

  }
  ,
  methods:{
    sendRegister:function (){
      let postData = {
        stdDepartment:this.userDepartment,
        stdClass:this.userClass,
        stdId:this.userID,
        stdName:this.userName
      }
      axios.post("/api/editAccount",postData).then(res=>{
        if(res.status == 201)
        {
          this.$router.push('/classroom')
        }

      }).catch(e=>{
        if(e.response.status == 403)
        {
          alert("403 ERROR !!! 請聯繫開發者")
          this.$router.push('/classroom')
        }
        else {
          alert("建立失敗")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>