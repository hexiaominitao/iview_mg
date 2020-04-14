import axios from '@/libs/api.request'

export const getrSampleRecord = (page, page_per) => {
  return axios.request({
    url: '/sample_record/',
    method: 'get',
    params: {
      page: page,
      page_per: page_per
    }
  })
}
