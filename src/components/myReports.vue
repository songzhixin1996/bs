<template>
  <div> 
    <m-header title="交通事故处理查询系统" >
      <router-link to="/user/mine" slot="left">
        <m-button icon="back" >返回</m-button>
      </router-link>
    </m-header> 
    <m-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" >    
      <m-cell v-for="item in reports" :key="item.id" :title="item.number"  is-link :to="'/'+username+'/reportDetail?number='+item.number" ></m-cell>  
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </m-loadmore>
    <!-- <m-cell  is-link :to="'/'+username+'/reportDetail'" ></m-cell>  -->
  </div>

</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      topStatus: "",
      // ...
      list: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
      // reports: []
    };
  },
  computed: {
    ...mapState(["username", "reports"])
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    getMyReports() {
      this.$axios
        .get("/api/user/getMyReports/?username=" + this.username)
        .then(res => {
          // console.log(res.data);
          //将reports存入store里
          let allReports = {};
          for (let report of res.data) {
            allReports[report.number] = report;
          }
          // console.log(allReports);
          this.$store.commit("setReports", allReports);
          // this.reports = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadTop() {
      // 加载更多数据
      this.getMyReports();
      this.$refs.loadmore.onTopLoaded(); //固定方法
    }
    // ...
  },
  mounted() {
    this.getMyReports();
  }
};
</script>
<style scoped>

</style>
