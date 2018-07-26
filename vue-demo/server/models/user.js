// 作用:  里将数据库和表结构文件连接起来

const db = require('../config/db.js'),
      userModel = '../schema/user.js'; // 引入user的表结构

const TodolistDb = db.Todolist; // 引入数据库

const User = TodolistDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

// 查询对应的id
const getUserById = async function (id) { //  去查询数据库中对应的id
  const userInfo = await User.findOne({   // ??? 这个findOne 哪里来的    得知是数据库自带的方法  参考: https://www.2cto.com/database/201708/668077.html
    where: {
      id: id
    }
  });
  return userInfo // 返回数据
}

// 查询用户名
const getUserByName = async function(name){
  const userInfo = await User.findOne({
    where: {
      name: name
    }
  })
  return userInfo
}

module.exports = {
  getUserById , // 导出getUserById的方法，将会在controller里调用
  getUserByName
}
