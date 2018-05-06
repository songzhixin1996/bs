<template>
  <div>
    <m-header title="交通事故处理查询系统" fixed>
        <router-link to="/user/mine" slot="left">
          <m-button icon="back" >返回</m-button>
        </router-link>
    </m-header>
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
</template>
<style scoped>

</style>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["reports"]),
    item() {
      return this.reports[this.number];
    },
    number() {
      return this.$route.query.number;
    }
  },
  mounted() {
    console.log(this.reports);
  }
};
</script>

