<template>
<div>
  <m-field label='事故编号'  placeholder="请输入事故编号" v-model="number"></m-field>
  <m-button class="m-button" type='primary' @click="query">确定</m-button>
  <h5>事故信息</h5>
  <m-field   type='textarea' rows="9" readonly v-model="info"></m-field></div>
</template>

<script>
/* eslint-disable */
import { MessageBox, Toast } from "mint-ui";
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
        this.$axios
          .get("/api/user/query?number=" + this.number)
          .then(res => {
            let a = res.data[0];
            if (res.data.length === 0) {
              Toast({ message: "请输入正确编号", duration: 1000 });
            } else {
              Toast({ message: "ok" });
              this.info = `事故时间：${a.accidentDate.substr(0, 10)}
事故地点：${a.accidentPlace}
甲方姓名：${a.aName}
甲方电话：${a.aPhone}
乙方姓名：${a.bName}
乙方电话：${a.bPhone}
描述：${a.description}`;
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

<style>
.m-button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
