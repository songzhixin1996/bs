<template>
  <m-tabbar  v-model="message"  fixed >
      <m-tabItem id="map">地图   
      </m-tabItem>
      <m-tabItem id="report">报案   
      </m-tabItem>
      <m-tabItem id="query">查询
      </m-tabItem>
      <m-tabItem id="mine">我的
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

