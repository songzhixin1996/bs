<template>
  <div id="mine">
    <div v-if="logined">
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
    <div v-else>
      <m-cell icon='more' title="登陆/注册" is-link :to="{name:'login'}" ></m-cell>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      // username: this.userInfo.username
    };
  },
  computed: {
    ...mapState(["logined", "userInfo"])
  },
  methods: {
    goMyInfo() {
      this.$router.push(`/${this.username}/set`);
    },
    handleLogout() {
      Indicator.open({
        spinnerType: "fading-circle"
      });
      this.$axios.get("/api/user/logoff").then(res => {
        console.log(res);
        Indicator.close();
        if (res.status === 200) {
          this.$store.commit("setUserInfo", "");
          this.$store.commit("logoff");
          Toast({ message: "注销成功" });
        }
      });
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
.m-button {
  left: 50%;
  transform: translateX(-50%);
}

.user-head {
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


