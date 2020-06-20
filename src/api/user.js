// 用来处理所有与用户相关的网络请求
// 1.0 导入自己封装好的 axios（默认导入： import xx from 'xxxx'）
import myhttp from '../utils/myhttp.js'
// 2.0 封装登录的请求
export function apiLogin ({ mobile, code }) {
  return myhttp({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// 拉黑作者
export function apiDel (autid) {
  return myhttp({
    url: '/app/v1_0/user/blacklists',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 关注作者
export function apiFollow (autid) {
  return myhttp({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 取关作者
export function apiUnFollow (autid) {
  return myhttp({
    url: `/app/v1_0/user/followings/${autid}`,
    method: 'DELETE'
  })
}

// 封装方法: 得到用户自己的信息
export function apiGetUser () {
  return myhttp({
    url: '/app/v1_0/user'
  })
}

// 封装方法： 得到用户的头像 & 昵称 & 介绍
export function apiGetInfoOne () {
  return myhttp({
    url: '/app/v1_0/user'
  })
}

// 封装方法： 得到用户的性别 & 生日
export function apiGetInfoTwo () {
  return myhttp({
    url: '/app/v1_0/user/profile'
  })
}

// 封装方法: 修改用户信息
export function apiUpdateInfo ({ name, gender, birthday, intro }) {
  return myhttp({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: name,
      gender: gender,
      birthday: birthday,
      intro: intro
    }
  })
}

// 定义方法: 修改用户的头像
export function apiUploadPhoto (photo) {
  const fd = new FormData()
  fd.append('photo', photo)
  return myhttp({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}
