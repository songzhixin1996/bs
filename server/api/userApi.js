var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var utils = require('../../build/utils')


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

//是否存在用户名
router.get('/isExistUsername', (req, res) => {
  let sql = $sql.user.isExistUsername
  let username = req.query.username
  conn.query(sql, username, (err, result) => {
    if (err) {
      console.log("1111111111111111111111111" + err);
      res.send(err)
    }
    if (result) {
      if (result[0]) {
        res.send({
          code: 1
        })
      } else {
        res.send({
          code: 0
        })
      }
    }
  })
})


// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  let motto = '这个人很懒，什么都没有留下'
  console.log('params: ' + JSON.stringify(params));
  conn.query(sql, [params.username, params.username, params.password, motto], function (err, result) {
    if (err) {
      console.log("1111111111111111111111111" + err);
      res.send(err)
    }
    if (result.affectedRows) {
      res.send({
        code: 1
      })
    }
  })
});


//上传事故
router.post('/addReport', (req, res) => {
  var number = utils.getNumber();
  console.log('NUMBER!!!! ' + utils.getNumber())
  sql = $sql.report.add;
  params = req.body;
  console.log('qqqqparams: ' + JSON.stringify(params));
  conn.query(sql, [params.accidentDate, params.accidentPlace, params.aName, params.aPhone, params.bName, params.bPhone, params.description, params.userId, number], (err, result) => {
    if (err) {
      console.log("error!!! " + JSON.stringify(err));
      res.send(err)
    }
    if (result) {
      jsonWrite(res, result);
      console.log("success!!! " + JSON.stringify(result));
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
        console.log("error!!! " + JSON.stringify(err));
        res.send(err)
      }
      if (result) {
        res.json(result)
        // jsonWrite(res, result);
        console.log("success!!! " + JSON.stringify(result));
      }
    })
  }
})


//登陆验证
router.post('/checkLogin', (req, res) => {
  let user = req.body.username
  let psw = req.body.password
  let sql = $sql.user.getUser
  conn.query(sql, [user, psw], (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result) {
      //存在这个username, 并且密码正确
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
    res.send(req.session.user)
  } else {
    res.json({
      code: 0
    })
  }
})

//登出
router.get('/logoff', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.end()
  }
})
module.exports = router;
