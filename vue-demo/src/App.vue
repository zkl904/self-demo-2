<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--<Login></Login> &lt;!&ndash;使用Login组件&ndash;&gt;-->
    <router-view/>
  </div>
</template>

<script>
// import Login from './components/Login' // 引入Login组件
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
