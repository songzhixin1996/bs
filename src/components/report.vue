<template>
<div class="rep">
  <div class="head">
    <div>事故信息</div>
  </div>
  <m-field label="事故时间" type='date'  v-model="accidentDate"></m-field>
  <m-field label="事故地点"  placeholder="请输入地点" v-model="accidentPlace"></m-field>
  <div class="head">
    <div>甲方信息</div>
  </div>
  <m-field label="甲方姓名"  placeholder="请输入甲方姓名" v-model="aName"></m-field>
  <m-field label="甲方电话"  type='number' placeholder="请输入甲方电话" v-model="aPhone"></m-field>
  <div class="head">
    <div>乙方信息</div>
  </div>
  <m-field label="事故时间"  placeholder='请输入乙方姓名' v-model="bName"></m-field>
  <m-field label="事故地点"  type='number' placeholder="请输入乙方电话" v-model="bPhone"></m-field>
  <m-field label="描述"  type="textarea" rows="4" v-model="description" ></m-field>
  <div class="m-button">
    <m-button class="mButton" type='primary' @click="handleClick">完成</m-button>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import { MessageBox, Toast, Indicator } from "mint-ui";
export default {
  name: "report",
  data: () => {
    return {
      accidentDate: "",
      accidentPlace: "",
      aName: "",
      aPhone: "",
      bName: "",
      bPhone: "",
      description: ""
    };
  },
  computed: {
    ready() {
      return (
        this.accidentDate && this.accidentPlace && this.aName && this.aPhone
      );
    },
    username() {
      return this.$store.state.userInfo.username;
    }
  },
  mounted() {
    document.addEventListener("paste", function(e) {
      let num = e.clipboardData.getData("text");
      document.activeElement.innerHtml = num;
    });
  },
  methods: {
    clear() {
      this.accidentDate = this.accidentPlace = this.aName = this.aPhone = this.bName = this.bPhone = this.description =
        "";
    },
    handleClick() {
      if (this.ready) {
        MessageBox({
          title: "提示",
          message: "确定提交?",
          showCancelButton: true
        }).then(action => {
          if (action === "confirm") {
            Indicator.open();
            this.$axios
              .post("/api/user/addReport", {
                accidentDate: this.accidentDate,
                accidentPlace: this.accidentPlace,
                aName: this.aName,
                aPhone: this.aPhone,
                bName: this.bName,
                bPhone: this.bPhone,
                description: this.description,
                username: this.username
              })
              .then(({ data }) => {
                Indicator.close();
                if (data.code === 1) {
                  MessageBox({
                    title: "提交成功！",
                    message: `报案号为：${data.msg}`,
                    showCancelButton: true,
                    // cancleButtonClass: "copy_btn",
                    cancelButtonText: "复制"
                  }).then(action => {
                    if (action === "cancel") {
                      //copy number
                      function handler(event) {
                        event.clipboardData.setData("text", data.msg);
                        document.removeEventListener("copy", handler, true);
                        event.preventDefault();
                      }
                      document.addEventListener("copy", handler, true);
                      document.execCommand("copy");
                    }
                  });
                  this.clear();
                } else {
                  // MessageBox.alert("操作失败");
                  Toast({
                    message: "操作失败"
                  });
                }
              })
              .catch(err => {
                console.log("error " + err);
              });
          } else {
            console.log("取消");
          }
        });
      } else {
        MessageBox.alert("请输入完整！");
      }
    }
  }
};
</script>

<style scoped>
.rep {
  height: 100%;
  overflow: auto;
}
.m-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}
.head {
  text-align: center;
  padding: 10px 0 0;
  width: 100%;
}
.head div {
  color: rgba(133, 134, 130, 0.664);
  position: relative;
}
.head div::after,
.head div::before {
  position: absolute;
  display: inline-block;
  top: 50%;
  background: rgba(179, 175, 175, 0.74);
  content: "";
  height: 1px;
  width: calc(50% - 2.5rem);
}
/*调整背景横线的左右距离*/
.head div::before {
  left: 0;
}
.head div:after {
  right: 0;
}
</style>
