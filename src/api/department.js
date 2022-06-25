import request from '@/utils/request'

export const getDepartmentInfo = () => { // 获取部门结构信息
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

export const delDepartment = id => { // 删除部门信息
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
export const addDepartment = data => { // 添加部门
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
export const getDepartmentDetail = id => { // 获取部门详情
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
export const editDepatmentDetail = (id, data) => { // 获取部门数据
  return request({
    url: `/company/department/${id}`,
    method: 'PUT',
    data
  })
}
