var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

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

// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log('params: ' + JSON.stringify(params));
  conn.query(sql, [params.username, params.age], function (err, result) {
    if (err) {
      console.log("1111111111111111111111111" + err);
      res.send(err)
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/addReport', (req, res) => {
  sql = $sql.report.add;
  params = req.body;
  console.log('qqqqparams: ' + JSON.stringify(params));
  conn.query(sql, [params.accidentDate, params.accidentPlace, params.aName, params.aPhone, params.bName, params.bPhone, params.description, params.userId], (err, result) => {
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

module.exports = router;
