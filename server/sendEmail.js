var send = require('./email.js');


// 创建一个邮件对象
module.exports = function (email, tokon) {
  var mail = {
    // 发件人
    from: '交通事故平台 <951576941@qq.com>',
    // 主题
    subject: '验证码',
    // 收件人
    to: '',
    // 邮件内容，HTML格式
    text: `点击链接重置密码！30分钟有效！
          http://localhost:8080/reset/${tokon}`
    //接收激活请求的链接
  };
  return new Promise((resolve, reject) => {
    mail.to = email
    send(mail).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
