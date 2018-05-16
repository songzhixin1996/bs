<template>
  <div class="myReports"> 
    <m-header title="我的报案记录" class="header" fixed>
      <router-link :to="{name:'mine'}" slot="left">
        <m-button icon="back" >返回</m-button>
      </router-link>
    </m-header> 
    <m-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" class="loadmore" >   
      <div v-if="!noResults" class="list"> 
        <m-cell v-for="item in reports" :key="item.id" :title="item.number"  is-link :to="{name:'reportsDetail',params:{uid:userInfo.username},query:{number:item.number}}" >
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
import {Indicator} from 'mint-ui'
export default {
  data() {
    return {
      topStatus: ""
    };
  },
  computed: {
    ...mapState(["userInfo", "reports"]),
    noResults() {
      return Object.keys(this.reports).length === 0;
    }
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    getMyReports() {
      Indicator.open()
      this.$axios
        .get("/api/user/getMyReports?username=" + this.userInfo.username)
        .then(res => {
          Indicator.close()
          //res ==>   {data:[{}],...}  ||{data:[]}
          //将reports存入store里
          let allReports = {};
          console.log(res);
          if (res.data[0]) {
            //结果不为空
            for (let report of res.data) {
              allReports[report.number] = report;
            }
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
    },
  },
  created() {
    if (Object.keys(this.reports).length===0) {
      this.getMyReports()
    }
  }
};
</script>
<style scoped>
.myReports {
  height: 100%;
  overflow: auto;
}
.content {
  height: 100%;
}
.blank {
  text-align: center;
  height: 100%;
  margin-top: 40px;
}
.list{
  height: 100%;
  margin-top: 40px
}
.loadmore {
  height: 100%;
}
</style>
