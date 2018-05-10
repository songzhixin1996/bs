<template>
  <div id="wrapper" :style="{padding:showHeader?'40px 0 26px':'0 0 26px'}" >
    <m-header v-show="showHeader" title="交通事故处理查询系统" fixed  >
      <m-button icon="more" slot="right"></m-button>
    </m-header>
    <router-view></router-view>
    <m-tabbar  v-model="getSelected"  fixed >
      <m-tabItem id="map">地图   
      </m-tabItem>
      <m-tabItem id="report">报案   </m-tabItem>
      <m-tabItem id="query">查询



      </m-tabItem>
      <m-tabItem id="mine">我的


      </m-tabItem>
    </m-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      clientHeight: document.body.clientHeight,
      showHeader: true
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
      console.log("val: " + val);
      this.$router.push(val);
      if (val === "map") {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    }
  },
  mounted() {
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight;
    };
  }
};
</script>
<style scoped>
#wrapper {
  height: 100%;
  /* padding: 40px 0 20px; */
  box-sizing: border-box;
  overflow: auto;
}
</style>


