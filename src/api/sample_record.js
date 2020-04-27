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

export const saveSampleRecord = (samples) => {
  const data = {
    samples
  }
  return axios.request({
    url: '/sample_record/',
    method: 'post',
    data
  })
}

export const updataSampleRecord = (samples) => {
  const data = {
    samples
  }
  return axios.request({
    url: '/sample_record/',
    method: 'put',
    data
  })
}

export const getrSampleRecordConfig = () => {
  return axios.request({
    url: '/sample_record_config/',
    method: 'get'
  })
}
