import './env.js'
var Koa = require('koa')
var koaRouter = require('koa-router')
var json = require('koa-json')
var logger = require('koa-logger'); // 引入各种依赖
var bodyParser = require('koa-bodyparser');
var auth = require('./server/routes/auth');
// var jwt = require('koa-jwt')
var api = require('./server/routes/api.js')

var path =require('path')
var serve = require('koa-static');

var historyApiFallback = require('koa-history-api-fallback'); // 引入依赖

const session = require('koa-session2');
const Store = require('./src/sessionStore.js');
const Myconfig = require('./server/config/config')


var app = new Koa()
app.use(session({
  store: new Store()
}));
const router = koaRouter()



app.use(bodyParser());
app.use(json());
app.use(logger());



app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async function (ctx, next){  //  如果JWT验证失败，返回验证失败信息
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  }
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});


router.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
// router.use('/api', jwt({secret: 'vue-koa-demo'}), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
// router.use('/api', api.routes());
router.use("/api",jwt({secret: 'vue-koa-demo'}),api.routes()) // 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致
app.use(router.routes()) // 将路由规则挂载到Koa上。

app.use(historyApiFallback()); // 在这个地方加入。一定要加在静态文件的serve之前，否则会失效

// 静态文件serve在koa-router的其他规则之上
app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录


// app.use(koa.routes()); // 将路由规则挂载到Koa上。

// ...省略


// app.listen(8000)
//
// console.log(`listening on port 8000`)
// module.exports = app;
console.log(process.env.PORT,'xxxxxxxxxxxx')
let port = process.env.PORT
console.log(process.env.PORT)

module.exports = app.listen(port, () => {
  console.log(`Koa is listening in 8000`)
})
