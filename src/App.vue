<template>
  <div id="app">
    <router-view></router-view>
    <m-header fixed title="交通事故处理查询系统">
      <router-link to="/" slot="left" v-if="showBack">
        <m-button icon="back">返回</m-button>
      </router-link>
      <m-button icon="more" slot="right"></m-button>
    </m-header>
    <router-view></router-view>
    <m-tabbar v-model="selectde" fixed v-if="showNav">
      <m-tabItem id="map">地图</m-tabItem>
      <m-tabItem id="report">报案</m-tabItem>
      <m-tabItem id="query">查询</m-tabItem>
      <m-tabItem id="mine">我的</m-tabItem>
    </m-tabbar>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
export default {
  name: "App",
  data: () => {
    return {
      selectde: "report"
    };
  },
  computed: mapState(["showNav", "showBack"]),
  watch: {
    selectde: function(val, oldVal) {
      this.$router.push(val);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
