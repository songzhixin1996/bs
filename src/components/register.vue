<template>
  <div>
    <m-field label="用户名" placeholder="请输入用户名" ></m-field>
    <m-field label="密码" placeholder="密码" type="password" ></m-field>
    <m-field label="确认密码" placeholder="确认密码" type="password" ></m-field>
    <m-button size='large' type='primary'>注册</m-button>
    <div class="d1">
      <a href="./login" ><span class="s1">登陆</span></a>
      <span>&nbsp; &nbsp; |&nbsp; &nbsp; </span>
      <a href="/forgetPsw"><span>忘记密码</span></a>
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
  color: #888;
}
.s1 {
  color: #26a2ff;
}
</style>

