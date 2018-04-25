<template>
  <div>
    <m-header fixed title="交通事故处理查询系统">
      <m-button icon="more" slot="right"></m-button>
    </m-header>
    <router-view></router-view>
    <m-tabbar  v-model="getSelected" fixed >
      <m-tabItem id="map">地图</m-tabItem>
      <m-tabItem id="report">报案</m-tabItem>
      <m-tabItem id="query">查询</m-tabItem>
      <m-tabItem id="mine">我的</m-tabItem>
    </m-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      // selected: this.$store.state.selected
    };
  },
  computed: {
    getSelected: {
      get() {
        return this.$store.state.selected;
      },
      set(val) {
        this.$store.commit("changeSel", val);
      }
    }
  },
  watch: {
    getSelected(val, oldVal) {
      this.$router.push(val);
    }
  },

  created() {
    // console.log(selected);
  }
};
</script>

