// 定义路由用的

// const auth = require('../controllers/user.js');
const auth = require('../controllers/user.js')
const koaRouter = require('koa-router');
const router = koaRouter()

router.get('/user/:id', auth.getUserInfo); // 定义url的参数是id,用user的auth方法引入router  去查询 某个 某个id返回的数据
router.post('/username', auth.postUserAuth);

module.exports = router; // 把router规则暴露出去
