import axios from '@/libs/api.request'

export const getUserData = () => {
  return axios.request({
    url: 'admin/user/',
    method: 'get'
  })
}

export const addUser = (name, mail, passwd, role) => {
  const data = {
    name,
    mail,
    passwd,
    role
  }
  return axios.request({
    url: 'admin/user/',
    method: 'post',
    data
  })
}

export const getSampleData = (page, page_per) => {
  return axios.request({
    url: 'admin/sample/',
    method: 'get',
    params: {
      page: page,
      page_per: page_per
    }
  })
}

export const delSample = (id) => {
  const data = {
    id
  }
  return axios.request({
    url: 'admin/sample/',
    method: 'post',
    data
  })
}

export const delSampleAll = () => {
  return axios.request({
    url: 'admin/sample/',
    method: 'delete'
  })
}

export const getPatientData = (page, page_per) => {
  return axios.request({
    url: 'admin/patient/',
    method: 'get',
    params: {
      page: page,
      page_per: page_per
    }
  })
}

export const delPatient = (id) => {
  const data = {
    id
  }
  return axios.request({
    url: 'admin/patient/',
    method: 'post',
    data
  })
}

export const delPatientAll = () => {
  return axios.request({
    url: 'admin/patient/',
    method: 'delete'
  })
}

export const getTemplateAll = () => {
  return axios.request({
    url: 'admin/template/',
    method: 'get'
  })
}

export const setTemplate = (templates) => {
  const data = {
    templates
  }
  return axios.request({
    url: 'admin/template/',
    method: 'post',
    data
  })
}

export const getRole = () => {
  return axios.request({
    url: 'admin/role/',
    method: 'get'
  })
}

export const getCancerTypes = () => {
  return axios.request({
    url: 'admin/config/',
    method: 'get'
  })
}

export const getReport = (page, page_per) => {
  return axios.request({
    url: 'admin/report/',
    method: 'get',
    params: {
      page: page,
      page_per: page_per
    }
  })
}

export const delReport = (id) => {
  const data = {
    id
  }
  return axios.request({
    url: 'admin/report/',
    method: 'delete',
    data
  })
}
