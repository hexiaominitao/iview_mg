import axios from '@/libs/api.request'

export const templateItem = () => {
  return axios.request({
    url: 'config/template_item/',
    method: 'get'
  })
}
