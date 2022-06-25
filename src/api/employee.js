import request from '@/utils/request'
export const getEmployeeList = params => {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}
