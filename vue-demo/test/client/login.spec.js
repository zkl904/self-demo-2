import Vue from 'vue'
import { mount } from 'vue-test-utils'
import Login from '@/components/Login.vue'
import elementUI from 'element-ui'
// 这个axios 用的是下面的 mock axios  有点变量提升的味道
import axios from 'axios'
Vue.use(elementUI)
Vue.prototype.$http = axios
let wrapper

beforeEach(() => {
  wrapper = mount(Login) // 每次测试前确保我们的测试实例都是是干净完整的。返回一个wrapper对象
})

test('Should have two input & one button', () => {
  const inputs = wrapper.findAll('.el-input') // 通过findAll来查找dom或者vue实例
  const loginButton = wrapper.find('.el-button') // 通过find查找元素
  expect(inputs.length).toBe(2) // 应该有两个输入框
  expect(loginButton).toBeTruthy() // 应该有一个登录按钮。 只要断言条件不为空或这false，toBeTruthy就能通过。
})

test('Should have the expected html structure', () => {
  expect(wrapper.element).toMatchSnapshot() // 调用toMatchSnapshot来比对快照
})

test('loginToDo should be called after clicking the button', () => {
  const stub = jest.fn() // 伪造一个jest的mock funciton
  wrapper.setMethods({ loginTodo: stub }) // setMethods将loginToDo这个方法覆写
  wrapper.find('.el-button').trigger('click') // 对button触发一个click事件
  expect(stub).toBeCalled() // 查看loginToDo是否被调用
})

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({
    data: {
      success: false,
      info: '用户不存在！'
    }
  }))
}))

test('Failed to login if not typing the correct password', async () => {
  wrapper.setData({
    account: 'mm',
    password: '1234'
  }) // 模拟用户输入数据
  const result = await wrapper.vm.loginTodo() // 模拟异步请求的效果
  expect(result.data.success).toBe(false) // 期望返回的数据里success是false
  console.log(result,'xxxxxxx')
  expect(result.data.info).toBe('密码错误！')
})
