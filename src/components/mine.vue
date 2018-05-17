<template>
  <div class="mine">
    <div v-if="logined" class="logined">
      <div class="user-head">  
        <router-link class="user-img" :to="{name:'set',params:{uid:userInfo.username}}"> 
          <img src="../assets/bg2.png" width="80" height="80"> 
        </router-link>  
        <div class="user-name" >  
          {{userInfo.name}}
        </div>  
      </div>  
      <m-cell title="我的报案记录" is-link :to="{name:'myReports',params:{uid:userInfo.username}}"></m-cell>
      <m-cell title="个性签名" :label='userInfo.motto'  ></m-cell>
      <m-cell title="设置" is-link :to="'/'+userInfo.username+'/set'"></m-cell>
      <m-button class="m-button" type='danger' @click="handleLogout">退出登陆</m-button>
    </div>
    <div v-else class="not-login">
      <!-- <m-cell  title="登陆/注册" is-link :to="{name:'login'}" ></m-cell> -->
      <m-button plain type='primary' @click="handleLogin">登陆/注册</m-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { Toast, Indicator } from "mint-ui";
export default {
  computed: {
    ...mapState(["logined", "userInfo"])
  },
  methods: {
    goMyInfo() {
      this.$router.push(`/${this.username}/set`);
    },
    handleLogin() {
      this.$router.push({ name: "login" });
    },
    handleLogout() {
      Indicator.open({
        spinnerType: "fading-circle"
      });
      this.$axios.get("/api/user/logoff").then(res => {
        console.log(res);
        Indicator.close();
        if (res.status === 200) {
          this.clearInfo();
          Toast({ message: "注销成功" });
        }
      });
    },
    clearInfo() {
      this.$store.commit("setUserInfo", {});
      this.$store.commit("setReports", {});
      this.$store.commit("logoff");
    },
    getUserInfo() {
      this.$axios.get("/api/user/userInfo").then(res => {
        console.log(res);
        if (res.data.code !== 0) {
          let info = res.data;
          this.$store.commit("setUserInfo", {
            name: info.name,
            username: info.username,
            age: info.age,
            motto: info.motto,
            email: info.email
          });
          this.$store.commit("login");
        } else {
          //未登录
          this.$store.commit("logoff");
        }
      });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script scoped>


<style scoped>
.mine {
  height: 100%;
}
.logined {
  height: 100%;
  overflow: auto;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.m-button {
  left: 50%;
  transform: translateX(-50%);
}

.user-head {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-img {
  background-color: #fff;
}

.user-img img {
  border-radius: 50%;
}
</style>


