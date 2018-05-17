<template>
  <div>
    <m-header title="交通事故处理查询系统" >
      <router-link :to="{name:'mine'}" slot="left" replace>
        <m-button icon="back">返回</m-button>
      </router-link>
    </m-header>
    <div class="content">
      <m-field label="用户名" placeholder="请输入用户名" v-model="username"></m-field>
      <m-field label="邮箱" placeholder="请输入邮箱" v-model="email"></m-field>
      <m-field label="密码" placeholder="密码" type="password" v-model="psw"></m-field>
      <m-field label="确认密码" placeholder="确认密码" type="password" v-model="rePsw"></m-field>
      <m-button size='large' type='primary' @click="handleClick">注册</m-button>
      <div class="d1">
        <router-link to="/login" ><span class="s1">登陆</span></router-link>
        <span>&nbsp; &nbsp; |&nbsp; &nbsp; </span>
        <router-link to="/findPsw"><span class="s2">忘记密码</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      email: "",
      psw: "",
      rePsw: ""
    };
  },
  computed: {
    ready() {
      return this.username && this.email && this.psw && this.psw === this.rePsw;
    }
  },
  methods: {
    checkUsername(username) {
      return new Promise((res, rej) => {
        this.$axios
          .get(`/api/user/validUsername?username=${this.username}`)
          .then(({ data }) => {
            res(data);
          })
          .catch(err => {
            rej(err);
          });
      });
    },
    checkEmail(email) {
      return new Promise((res, rej) => {
        this.$axios
          .get(`/api/user/validEmail?email=${this.email}`)
          .then(({ data }) => {
            res(data);
          })
          .catch(err => {
            rej(err);
          });
      });
    },
    register(username, email, psw) {
      return new Promise((res, rej) => {
        this.$axios
          .post("/api/user/addUser", {
            username: username,
            email: email,
            password: psw
          })
          .then(({ data }) => {
            res(data);
          })
          .catch(err => {
            rej(err);
          });
      });
    },
    handleClick() {
      if (this.ready) {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        Promise.all([
          this.checkUsername(this.username),
          this.checkEmail(this.email)
        ]).then(res => {
          if (res[0].code === 1 && res[1].code === 1) {
            this.register(this.username, this.email, this.psw)
              .then(date => {
                Indicator.close();
                if (date.code === 1) {
                  Toast({ message: "注册成功！" });
                  //发送激活邮箱
                  this.$router.replace({ name: "login" });
                } else {
                  Toast({ message: "注册失败" });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            Indicator.close();
            if (res[0].code === 0 && res[1].code === 0) {
              Toast({ message: "用户名和邮箱已被注册！" });
            } else if (res[0].code === 0) {
              Toast({ message: "用户名已被注册！" });
            } else if (res[1].code === 0) {
              Toast({ message: "邮箱已被注册！" });
            }
          }
        });
      } else {
        Toast({ message: "请输入正确！" });
      }
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 5px;
}
.d1 {
  margin-top: 15px;
  text-align: center;
}
a {
  text-decoration: none;
}
.s2 {
  color: #888;
}
.s1 {
  color: #26a2ff;
}
</style>

