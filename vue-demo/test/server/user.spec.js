import server from '../../app.js'
import request from 'supertest'

afterEach(() => {
  server.close() // 当所有测试都跑完了之后，关闭server
})

// 如果输入用户名为Molunerfinn，密码为1234则无法登录。正确应为molunerfinn和123。
test('Failed to login if typing Molunerfinn & 1234', async () => { // 注意用了async
  const response = await request(server) // 注意这里用了await
    .post('/auth/username') // post方法向'/auth/user'发送下面的数据
    .send({
      name: 'Molunerfinn',
      pass: '1234'
    })
  expect(response.body.success).toBe(false) // 期望回传的body的success值是false（代表登录失败）
})

// 密码错误
test('Successed to login if typing Molunerfinn & 123', async () => {
  const response = await request(server)
    .post('/auth/username')
    .send({
      name: 'mm',
      pass: '1235'
    })
  console.log(response.body, 'xxxxxxxxxxxxxx')
  expect(response.body.info).toBe('密码错误！')
})

// 登陆错误
test('Successed to login if typing Molunerfinn & 123', async () => {
  const response = await request(server)
    .post('/auth/username')
    .send({
      name: 'mm',
      pass: '1232'
    })
  console.log(response.body, 'xxxxxxxxxxxxxx')
  expect(response.body.success).toBe(true)
})


test('Getting the user info is null if the url is /auth/user/10', async () => {
  const response = await request(server)
    .get('/auth/user/10')
  expect(response.body).toEqual({})
})

test('Getting user info successfully if the url is /auth/user/2', async () => {
  console.log('22222222222222')
  const response = await request(server)
    .get('/auth/user/2')
  expect(response.body.name).toBe('mm')
})


test('Failed to login if typing MARK & 123', async () => {
  const response = await request(server)
    .post('/auth/username')
    .send({
      name: 'MARK',
      pass: '123'
    })
  expect(response.body.info).toBe('用户不存在！')
})
