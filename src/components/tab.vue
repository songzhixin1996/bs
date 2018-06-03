<template>
  <m-tabbar  v-model="message"  fixed >
    <m-tabItem id="map">
      <img slot="icon" src="../assets/map.svg">地图   
    </m-tabItem>
    <m-tabItem id="report">
      <img slot="icon" src="../assets/edit.svg">报案   
    </m-tabItem>
    <m-tabItem id="query">
      <img slot="icon" src="../assets/search.svg">查询
    </m-tabItem>
    <m-tabItem id="mine">
      <img slot="icon" src="../assets/account.svg">我的
    </m-tabItem>
  </m-tabbar>
</template>

<script>
export default {
  data() {
    return {
      message: this.selected
    };
  },
  props: ["selected"],
  watch: {
    message(val, oldVal) {
      this.$emit("changeSel", val);
    }
  }
};
</script>

