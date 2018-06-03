var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var utils = require('../../build/utils')
var send = require('../sendEmail');
const crypto = require('crypto');



// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

//用户名能否注册
router.get('/validUsername', (req, res) => {
  let sql = $sql.user.isExistUsername,
    params = req.query.username
  conn.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err)
    }
    if (result) {
      if (result[0]) {
        res.send({
          code: 0
        })
      } else {
        res.send({
          code: 1
        })
      }
    }
  })
})

//邮箱能否注册
router.get('/validEmail', (req, res) => {
  let sql = $sql.user.isExistEmail,
    params = req.query.email;
  conn.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err)
    }
    if (result) {
      if (result[0]) {
        res.send({
          code: 0
        })
      } else {
        res.send({
          code: 1
        })
      }
    }
  })
})


// 增加用户接口
router.post('/addUser', (req, res) => {
  let sql = $sql.user.add;
  let params = req.body;
  let motto = '这个人很懒，什么都没有留下'
  conn.query(sql, [params.username, params.username, params.email, params.password, motto], function (err, result) {
    if (err) {
      res.send(err)
    }
    if (result) {
      if (result.affectedRows) {
        res.send({
          code: 1
        })
      } else {
        res.send(result)
      }
    }
  })
});


//上传事故
router.post('/addReport', (req, res) => {
  let number = utils.getNumber();
  sql = $sql.report.add;
  params = req.body;
  conn.query(sql, [params.accidentDate, params.accidentPlace, params.aName, params.aPhone, params.bName, params.bPhone, params.description, params.username, number], (err, result) => {
    if (err) {
      console.log("error!!! " + JSON.stringify(err));
      res.send(err)
    }
    if (result.affectedRows) {
      res.send({
        code: 1,
        msg: number
      })
    } else {
      res.send({
        code: 0,
        msg: result
      })
    }
  })

})

//查询事故
router.get('/query', (req, res) => {
  // console.log('query:  ' + req.query)
  sql = $sql.report.query
  let num = req.query.number
  if (req.query.number) {
    conn.query(sql, num, (err, result) => {
      if (err) {
        res.send(err)
      }
      if (result) {
        res.json(result)
      }
    })
  }
})


//登陆验证
router.post('/checkLogin', (req, res) => {
  let usernameOrEmail = req.body.username
  let psw = req.body.password
  let sql = $sql.user.getUser
  conn.query(sql, [usernameOrEmail, psw, usernameOrEmail, psw], (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result) {
      console.log(result)
      //用户名密码正确
      if (result[0]) {
        //将用户信息保存在session，客户端cookie里有一个sessionId
        req.session.user = result[0]
        res.json({
          code: 1
        })
      } else { //username不存在或者密码错误
        res.json({
          code: 0
        })
      }
    }
  })
})

//获取用户信息            
router.get('/userInfo', (req, res) => {
  if (req.session.user) {
    // res.send(req.session.user)
    let sql = $sql.user.getUserInfo
    let params = req.session.user.username
    conn.query(sql, params, ((err, result) => {
      if (err) {
        res.send(err)
      }
      if (result) {
        // console.log('123 ' + JSON.stringify(result))
        if (result[0]) {
          req.session.user = result[0]
          res.send(result[0])
        }
      }
    }))
  } else {
    res.json({
      code: 0
    })
  }
})

//获取用户报案记录
router.get('/getMyReports', (req, res) => {
  let sql = $sql.report.getMyReports
  let params = req.query.username
  conn.query(sql, params, (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result) {
      res.send(result)
    }
  })
})

//更新用户信息
router.post('/updateUser', (req, res) => {
  let sql = $sql.user.updateUser
  let body = req.body
  let params = [body.name, body.age, body.motto, body.email, body.username]
  conn.query(sql, params, (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result) {
      if (result.affectedRows === 1) {
        //这里要修改session 
        res.send({
          code: 1
        })
      } else {
        res.send({
          code: 0,
          err: result
        })
      }
    }
  })
})

//重置密码
router.get('/resetPsw', (req, res) => {
  let psw = req.query.psw,
    tokon = req.query.tokon,
    sql = $sql.user.resetPsw,
    params = [psw, tokon]
  conn.query(sql, params, (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result) {
      console.log(result)
      if (result.affectedRows === 1) {
        res.send({
          code: 1
        })
      } else {
        res.send({
          code: 0,
          err: result
        })
      }
    }
  })
})

//发送验证邮箱
router.get('/sendEmail', (req, res) => {
  let email = req.query.email;
  let secretKey = crypto.randomBytes(16).toString('hex');
  let hmac = crypto.createHmac('sha256', secretKey);
  let str = email + Math.ceil(Math.random() * 10000) + String(new Date().getTime())
  hmac.update(str)
  let tokon = hmac.digest('hex')
  let expiredTime = new Date().getTime() + 1000 * 60 * 30 //半个小时
  //设置 tokon 和 expiredTime
  let sql = $sql.user.setTokonAndExpTime
  let params = [tokon, expiredTime, email]
  conn.query(sql, params, (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result) {
      // console.log(result)
      if (result.affectedRows === 1) {
        //发送邮件
        send(email, tokon).then(data => {
          console.log(data)
          //发送成功
          res.send({
            code: 1,
            msg: data
          })
        }).catch(err => {
          //发送失败
          res.send({
            code: 2,
            msg: err
          })
          console.log(err)
        });

      } else {
        res.send({
          //邮箱未注册
          code: 0,
          err: result
        })
      }
    }
  })

})

//检查链接有效性
router.get('/checkTokonValid', (req, res) => {
  let params = req.query.tokon,
    sql = $sql.user.checkTokonValid
  conn.query(sql, params, (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result) {
      let curTime = new Date().getTime()
      if (result[0] && result[0].expiredTime > curTime) {
        //tokon有效
        res.send({
          code: 1,
          message: 'valid'
        })
      } else {
        //tokon无效
        res.send({
          code: 0,
          message: 'invalid'
        })
      }
    }
  })

})

//重置密码后删除tokon和expiredTime
router.get('/clearTokon', (req, res) => {
  let sql = $sql.user.clearTokon,
    params = [req.query.tokon];
  conn.query(sql, params, (err, result) => {
    if (err) {
      res.send(err)
    } else if (result) {
      res.send(result)
    }
  })
})

//登出
router.get('/logoff', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.end()
  }
})
module.exports = router;
