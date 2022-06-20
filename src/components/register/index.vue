<template>


  <div class="columns is-centered ">
    <div class="column is-one-third">
      <div class="card-content ">
        <p class="title">
          註冊帳號
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
                  <input class="input" type="text" placeholder="學號" required v-model="userID" maxlength="15">
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

export default {
  //eslint-disable-next-line
  name: "index",
  data(){
    return{
      userName:"",
      userID:"",
      userClass:"",
      userDepartment:""
    }
  },
  methods:{
    sendRegister:function (){
      let postData = {
        stdDepartment:this.userDepartment,
        stdClass:this.userClass,
        stdId:this.userID,
        stdName:this.userName
      }
      axios.post("/api/register",postData).then(res=>{
        if(res.status == 201)
        {
          this.$router.push('/classroom')
        }

      }).catch(e=>{
        if(e.response.status == 403)
        {
          alert("帳號已被建立 !! 新增失敗")
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