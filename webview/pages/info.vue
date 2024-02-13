<template>
  <div class="main">
    <h1>USER INFORMATION</h1>
    <div class="row-split" v-show="userInfo">
      <img :src="userInfo.picture?.medium" alt="Avatar">
      <div class="userInfo">
        <p>{{ userInfo.name?.first }} {{ userInfo.name?.last }}</p>
        <p>{{ userInfo.location?.city }}, {{ userInfo.location?.country }}</p>
        <p>{{ userInfo.phone }}</p>
        <p>{{ userInfo.gender }}</p>
        <p>{{ userInfo.registered.date }}</p>
        <p>{{ `Registered ${userInfo.registered.age} time ago`}}</p>
      </div>
    </div>
    <button @click="back()">RETURN</button>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo () {
      return this.$route.query
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
div{
  width: 100%;
}

button{
  margin-top: 40px;
  width: 320px;
  height: 50px;
  border-radius: 16px;
  background-color: #5cccc3 !important;
  color: #fff;
  border: none;
}
button:hover{
  background-color: #478ddd !important;
  border: 1px solid #f9f9f9;
}
button:active{
  background-color: #47dd74 !important;
}
</style>
