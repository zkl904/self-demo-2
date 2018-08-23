// 定义路由用的

// const auth = require('../controllers/user.js');
const tool = require('../util/tool')
const auth = require('../controllers/user.js')
const koaRouter = require('koa-router');
const router = koaRouter()
console.log('luyou')

router.get('/user/:id', auth.getUserInfo); // 定义url的参数是id,用user的auth方法引入router  去查询 某个 某个id返回的数据
router.post('/username',tool.notoken, auth.postUserAuth);

// 上传oss图片到阿里云服务器
router.post('/upfile', tool.upfile)

module.exports = router; // 把router规则暴露出去
