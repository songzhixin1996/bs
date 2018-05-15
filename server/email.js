var nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com',
  secureConnection: true,
  port: 465,
  auth: {
    user: '951576941@qq.com', //刚才注册的邮箱账号
    pass: 'ravscdltbqpqbdcd' //邮箱的授权码，不是注册时的密码
  }
};

// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

// 发送邮件
module.exports = function (mail) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mail, function (error, info) {
      if (error) {
        reject(error)
      } else {
        resolve('mail sent:' + info.response)
      }
    });
  })

};
