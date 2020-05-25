<template>
  <div>
    <Table border height='620' :columns='rep_col' :data="rep_data" >
      <template slot-scope="{ row, index }" slot="actions">
        <!-- <Button type="primary" size="small" @click="startRun(index)">突变初审</Button> -->
        <Button style="margin-right: 8px" type="info" size="small" @click="deleteRep(index)">删除</Button>
      </template>
    </Table>
    <Page :total="total" size="small" :page-size="page_per" show-elevator show-sizer
    @on-page-size-change="pageSize" @on-change="setPage"
      :page-size-opts='page_opts' />
  </div>
</template>
<script>
import { getReport, delReport } from '@/api/admin'
export default {
  name: 'admin_report',
  data () {
    return {
      rep_data: [],
      page: 1,
      page_per: 10,
      total: 0,
      page_opts: [10, 20, 50, 100],
      rep_col: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '迈景编号',
          key: 'req_mg'
        },
        {
          title: '报告名称',
          key: 'report_item'
        },
        {
          title: '报告状态',
          key: 'stage'
        },
        {
          title: '报告人',
          key: 'report_user'
        },
        {
          title: '操作',
          width: 400,
          slot: 'actions'
        }
      ]
    }
  },
  methods: {
    getReportData () {
      getReport(this.page, this.page_per).then(res => {
        this.rep_data = res.data.report
        this.total = res.data.total
      })
    },
    setPage (page) {
      this.page = page
      getReport(page, this.page_per).then(res => {
        this.rep_data = res.data.report
        this.total = res.data.total
      })
    },
    pageSize (size) {
      this.page_per = size
      getReport(this.page, size).then(res => {
        this.rep_data = res.data.report
        this.total = res.data.total
      })
    },
    deleteRep (index) {
      const id = this.rep_data[index].id
      delReport(id).then(res => {
        this.$Message.info(res.data.msg)
        this.rep_data.splice(index, 1)
        this.getReportData()
      })
    }
  },
  mounted () {
    this.getReportData()
  }
}
</script>
