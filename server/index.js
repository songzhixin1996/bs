const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session')
const history = require('connect-history-api-fallback');

app.use(history({
  // index: '/dist/index.html'
}))
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(cookieParser())
app.use(session({
  secret: '123456',
  name: 'userInfo',
  cookie: {
    maxAge: 60000 * 60 * 24 * 30
  },
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// 后端api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......')
