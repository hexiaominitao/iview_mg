<template>
  <div>
    <Table border stripe height='500' :columns='admin_pat_columns' :data='all_patient' size='small'>
      <template slot-scope="{ row, index }" slot="action_rep">
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template></Table>
    <Page :total="total" size="small" :page-size="page_per" show-elevator @on-change="setPage" />
  </div>
</template>
<script>
import {
  getPatientData,
  delPatient
} from '@/api/admin'
export default {
  data () {
    return {
      total: 0,
      page: 0,
      page_per: 10,
      page_opts: [10, 20, 50, 100],
      all_patient: [],
      admin_pat_columns: [{
        type: 'selection',
        width: 55,
        align: 'center',
        'fixed': 'left'
      },
      {
        title: '姓名',
        key: 'name',
        width: '120'
      },
      {
        title: '年龄',
        key: 'age',
        width: '120'
      },
      {
        title: '性别',
        key: 'gender',
        width: '120'
      },
      {
        title: '民族',
        key: 'nation',
        width: '120'
      },
      {
        title: '籍贯',
        key: 'origo',
        width: '120'
      },
      {
        title: '联系方式',
        key: 'contact',
        width: '120'
      },
      {
        title: '身份证',
        key: 'ID_number',
        width: '120'
      },
      {
        title: '其他疾病',
        key: 'other_diseases',
        width: '120'
      },
      {
        title: '抽烟',
        key: 'smoke',
        width: '120'
      },
      {
        title: '操作',
        slot: 'action_rep',
        'fixed': 'left',
        width: '120'
      }
      ]
    }
  },
  methods: {
    getPatData () {
      getPatientData(1, 10).then(res => {
        this.all_patient = res.data.patient
        this.total = res.data.total
      })
    },
    setPage (page) {
      this.page = page
      getPatientData(page, this.page_per).then(res => {
        this.all_patient = res.data.patient
      })
    },
    remove (index) {
      const id = this.all_patient[index].id
      delPatient(id).then(res => {
        this.$Message.success(res.data.msg)
      })
      this.all_patient.splice(index, 1)
      this.getPatData()
    }
  },
  mounted () {
    this.getPatData()
  }
}

</script>
