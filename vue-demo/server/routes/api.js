const api = require('../controllers/todolist.js');
const koaRouter = require('koa-router');

const router = koaRouter()

// todolist(router); // 引入koa-router
router.get('/todolist/:id', api.getTodolist)
router.post('/todolistname', api.createTodolist)

module.exports = router; // 导出router规则
