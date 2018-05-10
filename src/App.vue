<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import wrapper from "./components/wrapper";
export default {
  name: "App",
  components: {
    wrapper
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
