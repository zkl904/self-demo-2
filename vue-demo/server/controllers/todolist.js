const todolist = require('../models/todolist.js');

const getTodolist = async function (ctx) { // 获取某个用户的所有todolist
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const result = await todolist.getTodolistById(id);  // 通过yield “同步”地返回查询结果
  ctx.body = {
    success: true,
    result // 将请求的结果放到response的body里返回
  }
}

const createTodolist = async function (ctx){ // 给某个用户创建一条todolist
  console.log(12345)
  console.log(ctx.request.body)
  const data = ctx.request.body; // post请求，数据是在request.body里的
  const result = await todolist.createTodolist(data);
  ctx.body = {
    success: true
  }
}

const removeTodolist = async function (ctx){
  const id = ctx.params.id;
  const user_id = ctx.params.userId;
  const result = await todolist.removeTodolist(id,user_id);

  ctx.body = {
    success: true
  }
}

const updateTodolist = async function (ctx){
  console.log(ctx.params)
  const id = ctx.params.id;
  const user_id = ctx.params.userId;
  let status = ctx.params.status;
  status == '0' ? status = true : status =  false;// 状态反转（更新）

  const result = await todolist.updateTodolist(id,user_id,status);

  ctx.body = {
    success: true
  }
}


module.exports = {
  getTodolist,
  createTodolist,
  removeTodolist,
  updateTodolist
}
