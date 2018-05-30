<template>
<div id="query">
  <m-field label='事故编号'  placeholder="请输入事故编号" v-model="number"></m-field>
  <m-button class="m-button" type='primary'  @click="query">确定</m-button>
</div>
</template>

<script >
/* eslint-disable */
import { MessageBox, Toast, Indicator } from "mint-ui";
export default {
  data: () => {
    return {
      number: "",
      info: ""
    };
  },
  computed: {
    ready: {
      get: function() {
        return this.number;
      }
    }
  },
  methods: {
    query() {
      if (this.ready) {
        Indicator.open();
        this.$axios
          .get("/api/user/query?number=" + this.number)
          .then(({ data }) => {
            Indicator.close();
            let report = data[0];
            if (!report) {
              Toast({ message: "请输入正确编号", duration: 1000 });
            } else {
              let rep = { [report.number]: report };
              this.$store.commit("setReports", rep);
              this.$router.push({
                name: "reportDetail",
                query: { number: report.number }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast({ message: "请输入编号", duration: 1000 });
        // console.log("not ready");
      }
    }
  }
};
</script>

<style scoped>
.m-button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
