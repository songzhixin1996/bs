<template>
  <div>
    <m-header title="交通事故处理查询系统" fixed>
      <router-link to="/user/mine" slot="left">
        <m-button icon="back" >返回</m-button>
      </router-link>
    </m-header>
    <m-field label="用户名" placeholder="请输入用户名" ></m-field>
    <m-field label="密码" placeholder="密码" type="password" ></m-field>
    <m-button size='large' type='primary'>登陆</m-button>
    <div class="d1">
      <router-link to="./register" ><span class="s1">注册</span></router-link>
      <span>&nbsp; &nbsp; |&nbsp; &nbsp; </span>
      <router-link to="./findPsw"><span class="s2">忘记密码</span></router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {};
</script>

<style scoped>
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

