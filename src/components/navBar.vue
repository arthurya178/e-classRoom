<template>
  <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/classroom">
          <strong>
            教室
          </strong>

        </a>
        <a class="navbar-item" href="/edit">
          <strong>
            修改資料
          </strong>

        </a>
          <a class="navbar-item" v-if="usr_data.user_Permission == 'teacher'" href="/control">
            <strong>
              系統控制
            </strong>
          </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-primary" @click="logout">
              <i class="fa-solid fa-door-open"></i>
              &nbsp;&nbsp;
              <strong>登出</strong>
            </button>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "navBar",
  computed:{
    ...mapGetters(["usr_data"])
  },
  methods:{
    logout:function (){
      axios.get('/api/logout').then(()=>{
        this.$router.push('/')
      })

    }
  }
}
</script>

<style scoped>

</style>