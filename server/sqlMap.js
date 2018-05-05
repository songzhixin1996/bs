var sqlMap = {
  // 用户
  user: {
    add: 'insert into user( name,username, password,motto) values ( ?,?, ?,?)',
    getUser: 'select * from user where username =? and password = ?',
    isExistUsername: 'select * from user where username =?'
  },
  report: {
    add: 'insert into report(accidentDate,accidentPlace,aName,aPhone,bName,bPhone,description,userId,number) values( ? , ? , ? , ? , ? , ? , ? , ?,?)',
    query: 'select * from report where number =?'
  }
}

module.exports = sqlMap;
