import axios from '@/libs/api.request'

export const getReportStart = () => {
  return axios.request({
    url: 'report/start/',
    method: 'get'
  })
}

export const getReportList = (mg_id) => {
  return axios.request({
    url: 'report/mutation/',
    method: 'get',
    params: {
      mg: mg_id
    }
  })
}

export const getMutationList = (mg_id) => {
  return axios.request({
    url: 'report/mutation_list/',
    method: 'get',
    params: {
      mg: mg_id
    }
  })
}

export const passCheckMutation = (sams, mg_id) => {
  const data = {
    sams,
    mg_id
  }
  return axios.request({
    url: 'report/mutation_list/',
    method: 'post',
    data
  })
}

export const delteMutation = (sams, mg_id) => {
  const data = {
    sams,
    mg_id
  }
  return axios.request({
    url: 'report/mutation_list/',
    method: 'delete',
    data
  })
}

export const getIRList = (mg_id) => {
  return axios.request({
    url: 'report/irlist/',
    method: 'get',
    params: {
      mg: mg_id
    }
  })
}

export const aDDIrList = (sams) => {
  const data = {
    sams
  }
  return axios.request({
    url: 'report/irlist/',
    method: 'post',
    data
  })
}

export const explanationMuta = (mg_id) => {
  return axios.request({
    url: 'report/mutation_check/',
    method: 'get',
    params: {
      mg: mg_id
    }
  })
}

export const saveExplanation = (sams) => {
  const data = {
    sams
  }
  return axios.request({
    url: 'report/mutation_check/',
    method: 'post',
    data
  })
}

export const reportDownload = (mg_id) => {
  return axios.request({
    url: 'report/download/',
    method: 'get',
    params: {
      mg: mg_id
    }
  })
}

export const checkMtation = (mg_id) => {
  return axios.request({
    url: 'report/check_mutation/',
    method: 'get',
    params: {
      mg: mg_id
    }
  })
}

export const editMtation = (sams, mg_id) => {
  const data = {
    sams,
    mg_id
  }
  return axios.request({
    url: 'report/check_mutation/',
    method: 'post',
    data
  })
}

export const getOkrData = (mg_id) => {
  return axios.request({
    url: 'report/get_okr/',
    method: 'get',
    params: {
      mg: mg_id
    }
  })
}
