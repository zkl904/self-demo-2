var Koa = require('koa')
var koaRouter = require('koa-router')
var json = require('koa-json')
var logger = require('koa-logger'); // 引入各种依赖
var bodyParser = require('koa-bodyparser');
var auth = require('./server/routes/auth');
var jwt = require('koa-jwt')
var api = require('./server/routes/api.js')

var app = new Koa()
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


// app.use(koa.routes()); // 将路由规则挂载到Koa上。

// ...省略


app.listen(8000)

console.log(`listening on port 8000`)
// module.exports = app;
