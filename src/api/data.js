import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = (info) => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}

export const getSampleInfo = () => {
  return axios.request({
    url: 'data/get_sample_info',
    method: 'get'
  })
}

export const getSampleInfoById = (mg_id) => {
  return axios.request({
    url: 'data/get_sample_info/',
    method: 'get',
    params: {
      mg: mg_id
    }
  })
}

export const getSampleInfoByName = (name) => {
  return axios.request({
    url: 'data/get_sample_name/',
    method: 'get',
    params: {
      name: name
    }
  })
}

export const getRunInfo = (page, page_per) => {
  return axios.request({
    url: 'data/get_run_info/',
    method: 'get',
    params: {
      page: page,
      page_per: page_per
    }
  })
}

export const delRunInfo = (id) => {
  const data = {
    id
  }
  return axios.request({
    url: 'data/get_run_info/',
    method: 'post',
    data
  })
}

export const getSeqInfo = (name) => {
  return axios.request({
    url: 'data/get_seq_info/',
    method: 'get',
    params: {
      name: name
    }
  })
}

export const startMakeRep = (sams) => {
  const data = {
    sams
  }
  return axios.request({
    url: 'data/get_seq_info/',
    method: 'post',
    data
  })
}

export const getMGId = () => {
  return axios.request({
    url: 'data/get_mg_id/',
    method: 'get'
  })
}

export const distillQC = ({ qc_code, targetKey }) => {
  const data = {
    qc_code,
    targetKey
  }
  return axios.request({
    url: 'qc/select/',
    data,
    method: 'post'
  })
}

export const getOkrCancers = () => {
  return axios.request({
    url: 'data/okr/',
    method: 'get'
  })
}

export const getOkrFiles = () => {
  return axios.request({
    url: 'data/okrfile/',
    method: 'get'
  })
}

export const clearFile = () => {
  return axios.request({
    url: 'data/okrfile/',
    method: 'delete'
  })
}
