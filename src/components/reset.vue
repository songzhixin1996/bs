<template>
  <div v-show="tokonValid">
    <m-header title="重置密码" >
    </m-header>
    <div class="content">
      <m-field label="新密码" placeholder="新密码" type="password" v-model="psw"></m-field>
      <m-field label="确认密码" placeholder="确认密码" type="password" v-model="rePsw"></m-field>
      <m-button size='large' type='primary' @click="handleClick">提交</m-button>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      psw: "",
      rePsw: "",
      tokonValid: ""
    };
  },
  computed: {
    ready() {
      return this.psw && this.rePsw && this.psw === this.rePsw;
    }
  },
  methods: {
    handleClick() {
      if (this.ready) {
        Indicator.open();
        this.$axios
          .get(
            `/api/user/resetPsw?psw=${this.psw}&tokon=${
              this.$route.params.tokon
            }`
          )
          .then(({ data }) => {
            Indicator.close();
            if (data.code === 1) {
              MessageBox.alert("密码修改成功").then(action => {
                if (action === "confirm") {
                  this.$router.replace({ name: "login" });
                }
              });
              this.$axios.get(
                "/api/user/clearTokon?tokon=" + this.$route.params.tokon
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast({ message: "密码格式不对！" });
      }
    }
  },
  //判断tokon是否有效
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // console.log(vm.$axios);
      vm.$axios
        .get("/api/user/checkTokonValid?tokon=" + to.params.tokon)
        .then(({ data }) => {
          if (data.code !== 1) {
            vm.tokonValid = false;
            alert("链接无效！");
          } else {
            vm.tokonValid = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
</script>

