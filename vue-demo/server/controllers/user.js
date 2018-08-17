// 用来执行前面的models中的方法  并返回结果

const user = require('../models/user.js');
const jwt = require('jsonwebtoken');    // 下载koa-jwt 会下载这个包
const bcrypt = require('bcryptjs');  // 加密插件

const getUserInfo = async function (ctx) {
  console.log(ctx.params.id)
  const id = ctx.params.id; // 获取url里传过来的参数里的id   params:  通过链接使用的是get方法
  const result = await user.getUserById(id);  // 调用model的方法  ,取到返回的结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const postUserAuth = async function (ctx) {
  // console.log('12345')
  // console.log(ctx.request.body)
  const data = ctx.request.body; // post过来的数据存在request.body里   使用request.body 使用的是post方法
  const userInfo = await user.getUserByName(data.name);  // 获得sql返回的信息
  //
  if(userInfo != null){ // 如果查无此用户会返回null
    if(!bcrypt.compareSync(data.pass, userInfo.pass)){ // 验证密码是否正确
    // if(userInfo.pass != data.pass){
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    }else{ // 如果密码正确
      const userToken = {
        name: userInfo.name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
      const token = jwt.sign(userToken,secret); // 签发token
      ctx.session.token = token
      ctx.session.name = userInfo.name
      ctx.session.pass = '2222222'
      ctx.body = {
        success: true,
        token: token, // 返回token
      }
      // ctx.body = {
      //   success: false, // success标志位是方便前端判断返回是正确与否
      //   info: '争取！'
      // }
    }
  }else{
    ctx.body = {
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

module.exports = {
  getUserInfo,  // 导出getUserById的方法，将会在controller里调用
  postUserAuth
}
