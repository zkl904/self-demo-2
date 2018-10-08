const OSS = require('ali-oss');
const formidable = require("formidable");
const co = require('co');

const client = new OSS({
  region: 'oss-cn-beijing', //自定义项
  accessKeyId: 'LTAIA6471Zh0fD2k', //自定义项
  accessKeySecret: 'CVvHU8YrLR3N8QJGRWPIsaCfBuRJVl' //自定义项
});

 // 使用koa-session2  实现登陆拦截
const token = async function (ctx ,next) {
  console.log(ctx.cookie,'cookie')
  console.log(ctx.session, 'session')
  console.log(ctx.cookies.get('koa:sess'),ctx.path, 'xxxxx')
  if(!ctx.cookies.get('koa:sess') && ctx.path !== '/auth/username'){
    console.log('未登录')
    ctx.body ={
      errorCode: '403',
      errorInf0: '请重新登陆'
    }
    return   // 这个return 是必要的,  不然前端返回的就不是这边的ctx.body 而是后面的ctx.body 覆盖了前面的内容
    console.log(ctx.body)
  }
  await next()
  console.log('session验证22')
}

const notoken = async function (ctx, next) {
  await next()
}


// 使用oss 上传  upload

const upfile = async(ctx, next) => {
  var alioss_upfile = function() {
    return new Promise(function(resolve, reject) {
      var form = new formidable.IncomingForm();
      console.log(form)
      form.parse(ctx.req, function(err, fields, files) {
        console.log(err, fields, files , '222')
        if (err) { throw err; return; }
        // 文件名
        var date = new Date();
        var time = '' + date.getFullYear() + date.getMonth() + 1 + date.getDate();
        var filepath = time + '/' + date.getTime();
        var fileext = files.file.name.split('.');
        var upfile = files.file.path;
        var newfile = filepath + '.' + fileext[1];
        //ali-oss
        co(function*() {
        // async function(ctx) {
          client.useBucket('aliyun-oss-zkluoload'); //自定义项
          var result = yield client.put(newfile, upfile);
          //var result = yield client.put(fields.store, new Buffer(fields.buffer));
          console.log('文件上传成功!', result.url);
          ctx.response.type = 'json';
          ctx.response.body = result.url;
          resolve(next());
        }).catch(function(err) {
          console.log(err);
        });
      });
    });
  };
  await alioss_upfile();
};

module.exports = {
  token,
  notoken,
  upfile
}
