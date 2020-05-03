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

export const getrSampleById = (apply_id) => {
  return axios.request({
    url: '/sample_record/search/',
    method: 'get',
    params: {
      apply_id: apply_id
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

export const delSampleRecord = (samples) => {
  const data = {
    samples
  }
  return axios.request({
    url: '/sample_record/',
    method: 'delete',
    data
  })
}

export const getrSampleRecordConfig = () => {
  return axios.request({
    url: '/sample_record_config/',
    method: 'get'
  })
}
