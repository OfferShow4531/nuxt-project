<template>
  <nav>
    <header>
      <nuxt-link to="/">MAIN</nuxt-link>
      <nuxt-link to="/info">INFO</nuxt-link>
    </header>
    <HomePage />
    <footer>
      VUE-EXAMPLE (2024)
    </footer>
  </nav>
</template>

<script>
import HomePage from '@/components/HomePage.vue'
export default {
  name: 'IndexPage',
  component: {
    HomePage
  }
}
</script>
<style scoped>
nav{
  padding: 40px;
}
header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  background: rgb(197, 200, 202);
  padding: 10px;
  font-weight: 600;
  border-radius: 16px;
}
footer{
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  background: aliceblue;
  padding: 10px;
  align-items: center;
  font-weight: 600;
  border-radius: 16px;
}
a{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  padding: 40px;
}
</style>
