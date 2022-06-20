<template>
  <p class="title">404</p>
  <p class="sub-title">頁面不存在</p>
  <router-link to="/">
    <button class="button is-link ">回到首頁</button>
  </router-link>
</template>

<script>

export default {
  name: "error-404",
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 200px;
  font-weight: bolder;
}

.sub-title {
  font-size: 50px;
  font-weight: bolder;
}
</style>