import axios from '@/libs/api.request'

export const getReportStart = (page, page_per) => {
  return axios.request({
    url: 'report/start/',
    method: 'get',
    params: {
      page: page,
      page_per: page_per
    }
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

export const getMutationList = (id) => {
  return axios.request({
    url: 'report/mutation_list/',
    method: 'get',
    params: {
      id: id
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

// 突变注释
export const saveExplanation = (sams, cancer) => {
  const data = {
    sams,
    cancer
  }
  return axios.request({
    url: 'report/annotate_mutation/',
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

export const checkMtation = (id) => {
  return axios.request({
    url: 'report/edit_mutation/',
    method: 'get',
    params: {
      id: id
    }
  })
}

export const editMtation = (sams, mg_id) => {
  const data = {
    sams,
    mg_id
  }
  return axios.request({
    url: 'report/edit_mutation/',
    method: 'post',
    data
  })
}

export const deleteMutation = (sams) => {
  const data = {
    sams
  }
  return axios.request({
    url: 'report/edit_mutation/',
    method: 'delete',
    data
  })
}

export const getOkrCSV = (id, item) => {
  const data = {
    id,
    item
  }
  return axios.request({
    url: 'report/okr/',
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

export const setReportStage = (id, stage) => {
  const data = {
    id,
    stage
  }
  return axios.request({
    url: 'report/report_stage/',
    method: 'post',
    data
  })
}

export const getAnnotate = (id) => {
  return axios.request({
    url: 'report/annotate_mutation/',
    method: 'get',
    params: {
      id: id
    }
  })
}

export const putAnnotate = (id, cancer) => {
  return axios.request({
    url: 'report/annotate_mutation/',
    method: 'put',
    params: {
      id: id,
      cancer: cancer
    }
  })
}

export const getAnnotateCheck = (id) => {
  return axios.request({
    url: 'report/annotate_check/',
    method: 'get',
    params: {
      id: id
    }
  })
}

export const exportReport = (id, item, note, hospital) => {
  return axios.request({
    url: 'report/export_report/',
    method: 'post',
    params: {
      id: id,
      item: item,
      note: note,
      hospital: hospital
    }
  })
}
