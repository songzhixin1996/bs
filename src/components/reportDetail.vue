<template>
  <div>
    <m-header title="交通事故处理查询系统" fixed>
        <router-link :to="{name:'myReports',params:{uid:userInfo.username}}" slot="left">
          <m-button icon="back" >返回</m-button>
        </router-link>
    </m-header>
    <div class="content">
      <h5>事故信息</h5>
      <m-cell title="事故时间"   :value="item.accidentDate"></m-cell>
      <m-cell title="事故地点" :value="item.accidentPlace"></m-cell>
      <h5>甲方信息</h5>
      <m-cell title="甲方姓名"   :value="item.aName"></m-cell>
      <m-cell title="甲方电话"    :value="item.aPhone"></m-cell>
      <h5>乙方信息</h5>
      <m-cell title="事故时间" :value="item.bName"></m-cell>
      <m-cell title="事故地点"    :value="item.bPhone"></m-cell>
      <m-cell title="描述"   :value="item.description" ></m-cell>
    </div> 
  </div>
</template>
<style scoped>
h5 {
  margin: 50px 5px 0;
}
</style>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["reports", "userInfo"]),
    item() {
      this.reports[this.number].accidentDate = this.reports[
        this.number
      ].accidentDate.split("T")[0];
      return this.reports[this.number];
    },
    number() {
      return this.$route.query.number;
    }
  }
};
</script>

