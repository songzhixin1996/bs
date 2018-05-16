<template>
  <div class="myReports"> 
    <m-header title="我的报案记录" class="header">
      <router-link :to="{name:'mine'}" slot="left">
        <m-button icon="back" >返回</m-button>
      </router-link>
    </m-header> 
    <m-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" class="loadmore" >   
      <div v-if="!noResults"> 
        <m-cell v-for="item in reports" :key="item.id" :title="item.number"  is-link :to="'/'+userInfo.username+'/reportDetail?number='+item.number" >
        </m-cell>  
      </div>
      <div v-else class="blank">空空如也~</div>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </m-loadmore>
  </div>

</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      topStatus: "",
      noResults: true
    };
  },
  computed: {
    ...mapState(["userInfo", "reports"])
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    getMyReports() {
      this.$axios
        .get("/api/user/getMyReports/?username=" + this.userInfo.username)
        .then(res => {
          //将reports存入store里
          let allReports = {};
          for (let report of res.data) {
            allReports[report.number] = report;
          }
          console.log(allReports);
          this.$store.commit("setReports", allReports);
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
  created() {
    if (!this.reports[0]) {
      this.getMyReports();
    }
  }
};
</script>
<style scoped>
.myReports {
  height: 100%;
}
.content {
  height: 100%;
}
.blank {
  text-align: center;
  height: 100%;
}
.loadmore {
  height: 100%;
}
</style>
