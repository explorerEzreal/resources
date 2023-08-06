import request from '@/utils/request'

export function login(data) {
  return request(
    {
      url: '/sys/login',
      method: 'post',
      data
    }
  )
}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function role(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

export function department(data) {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
