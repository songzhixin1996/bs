<template>
  <div id="wrapper" :style="{padding:showHeader?'40px 0 55px':'0 0 55px'}" >
    <m-header v-show="showHeader" title="交通事故处理查询系统" fixed  >
    </m-header>
    <router-view></router-view>
    <tab :selected='getSelected' @changeSel=changeSel></tab>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tab from "./tab";
export default {
  data: () => {
    return {
      clientHeight: document.body.clientHeight,
      showHeader: this.getSelected === "map" ? false : true
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
  components: {
    Tab
  },
  methods: {
    changeSel(val) {
      this.getSelected = val;
    }
  },
  watch: {
    getSelected(val, oldVal) {
      this.$router.replace({ name: val });
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
    this.getSelected;
  }
};
</script>
<style scoped>
#wrapper {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}
</style>


