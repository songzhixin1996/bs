var sqlMap = {
  // 用户
  user: {
    add: 'insert into user( name,username,email, password,motto) values ( ?,?,?, ?,?)',
    getUser: 'select * from user where username =? and password = ? or email=? and password =?',
    isExistUsername: 'select * from user where username =? ',
    isExistEmail: 'select * from user where email = ? ',
    updateUser: 'update user set name=?,age=?,motto=? ,email=? where username=?',
    getUserInfo: 'select * from user where username = ?',
    resetPsw: 'update user set password=? where tokon=?',
    setTokonAndExpTime: 'update user set tokon=?,expiredTime=? where email=?',
    checkTokonValid: 'select * from user where tokon = ?',
    clearTokon: 'update user set tokon = NULL,expiredTime=NULL where tokon = ? '
  },
  report: {
    add: 'insert into report(accidentDate,accidentPlace,aName,aPhone,bName,bPhone,description,uId,number) values( ? , ? , ? , ? , ? , ? , ? , ?, ?)',
    query: 'select * from report where number =?',
    getMyReports: 'select * from report where uId= ?'
  }
}

module.exports = sqlMap;
