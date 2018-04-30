var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(id, name, age) values (0, ?, ?)'
  },
  report: {
    add: 'insert into report(accidentDate,accidentPlace,aName,aPhone,bName,bPhone,description,userId) values( ? , ? , ? , ? , ? , ? , ? , ?)'
  }
}

module.exports = sqlMap;
