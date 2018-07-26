// db.js作用 用于初始化Sequelize和数据库的连接。

const Sequelize = require('sequelize'); // 引入sequelize

// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码  todolist 自己建的一个库
const Todolist = new Sequelize('mysql://root:root@localhost/todolist',{
  define: {
    timestamps: false, // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  },
  operatorsAliases: false
})

module.exports = {
  Todolist // 将Todolist暴露出接口方便Model调用
}
