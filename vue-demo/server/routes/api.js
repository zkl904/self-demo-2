const tool = require('../util/tool')
const api = require('../controllers/todolist.js');
const koaRouter = require('koa-router');

const router = koaRouter()

// todolist(router); // 引入koa-router
router.get('/todolist/:id', tool.token ,  api.getTodolist)
router.post('/todolistname', api.createTodolist)
router.delete('/todolist/:userId/:id', api.removeTodolist)
router.put('/todolist/:userId/:id/:status', api.updateTodolist)

module.exports = router; // 导出router规则
