<template>
  <div class="columns is-centered">
    <div class="column is-one-third ">
      <div class="card box">
        <br>
        <p class="title is-2">線上課程 網站登入</p>
        <p class="title is-5">課程名稱:網頁設計</p>
        <br>
        <a :href=lineVerifyHref>
          <button class="button title is-5 is-bold is-rounded line-style">
            <i class="is-size-3 fa-brands fa-line"></i>&nbsp;&nbsp;Line 登入
          </button>
        </a>
        <br>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data(){
    return{
      lineVerifyHref:"https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657023760&redirect_uri=http%3A%2F%2Fmagicgo.taipei%3A8080%2Fline%2Fauth&state=12345abcde&scope=openid"
    }
  },
  created() {
    axios.get("/api/line/state").then((res)=>{
      this.lineVerifyHref = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657023760&redirect_uri=http%3A%2F%2Fmagicgo.taipei%3A8080%2Fline%2Fauth&state=${res.data}&scope=openid`
    })
  }
}
</script>

<style scoped>
.line-style {
  background-color: #00ba00;
  color: white
}

.line-style:hover {
  background-color: #37a337;
  color: white
}

.line-style:focus {
  background-color: #37a337;
  color: white
}


</style>