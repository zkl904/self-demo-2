import server from '../../app.js'
import request from 'supertest'

afterEach(() => {
  server.close()
})

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW0iLCJpZCI6MiwiaWF0IjoxNTMzNzk3MDc3fQ.lHvrWcO9Qf-l2eS9U_94gg2TB8qjOVhpEeflMZ4uPQk'

let todoId = null // 用来存放测试生成的todo的id

// 增
test('Created todolist successfully if set the JWT & correct user', async () => {
  const response = await request(server)
    .post('/api/todolistname')
    .send({
      status: false,
      content: '来自测试xxxx',
      id: 2
    })
    .set('Authorization', 'Bearer ' + token) // header处加入token验证
  expect(response.body.success).toBe(true)
})

// 查
test('Getting todolist successfully if set the JWT & correct user', async () => {
  const response = await request(server)
    .get('/api/todolist/2')
    .set('Authorization', 'Bearer ' + token)
  response.body.result.forEach((item, index) => {
    if (item.content === '来自测试') todoId = item.id // 获取id
  })
  expect(response.body.success).toBe(true)
})

// 改
test('Updated todolist successfully if set the JWT & correct todoId', async () => {
  const response = await request(server)
    .put(`/api/todolist/2/${todoId}/0`) // 拿id去更新
    .set('Authorization', 'Bearer ' + token)
  expect(response.body.success).toBe(true)
})

// 删
test('Removed todolist successfully if set the JWT & correct todoId', async () => {
  const response = await request(server)
    .delete(`/api/todolist/2/${todoId}`)
    .set('Authorization', 'Bearer ' + token)
  expect(response.body.success).toBe(true)
})

