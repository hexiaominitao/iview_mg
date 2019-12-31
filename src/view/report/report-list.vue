<template>
  <div>
    <h3>打磨列表</h3>
    <Table border height='520' :columns='report_columns1' :data="rep_start1">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" @click="startRun(index)">开始打磨</Button>
            <Button type="success" size="small" @click="reStartRun(index)">审核结果</Button>
            <Button type="info" size="small" @click="conRun(index)">继续打磨</Button>
            <!-- <Button type="primary" size="small">审核解释</Button> -->
            <Button type="info" size="small" @click="toOkr(index)">OKR</Button>
            <Button type="success" size="small" @click="download(index)">生成报告</Button>
          </template>
        </Table>
  </div>
</template>
<script>
import { getReportStart, getReportList } from '@/api/report'
import config from '@/config'
export default {
  name: 'report_list',
  data () {
    return {
      rep_start1: [],
      total_rep1: 0,
      report_columns1: [
        {
          title: '迈景编号',
          key: 'mg_id'
        },
        {
          title: '检测项目',
          key: 'seq_item'
        },
        {
          title: '报告状态',
          key: 'tag'
        },
        {
          title: '操作',
          width: 400,
          slot: 'action'
        }
      ]
    }
  },
  methods: {
    start () {
      this.$Message.info('开始制作报告...')
    },
    getRepData1 () {
      getReportStart().then(res => {
        this.rep_start1 = res.data.sample
        this.total_rep1 = res.data.total
      })
    },
    startRun (index) {
      const mg_id = this.rep_start1[index].mg_id
      this.$router.push({ name: `mutation_list`,
        params: { name: mg_id },
        meta: { title: `${mg_id}-突变信息` } })
      getReportList(mg_id).then(res => {
        this.$Message.success(res.data.msg)
      })
    },
    reStartRun (index) {
      const mg_id = this.rep_start1[index].mg_id
      this.$router.push({ name: `check_mutation`,
        params: { name: mg_id },
        meta: { title: `${mg_id}-突变审核` } })
    },
    conRun (index) {
      const mg_id = this.rep_start1[index].mg_id
      this.$router.push({ name: `rep_mutation`,
        params: { name: mg_id },
        meta: { title: `${mg_id}-结果解释` } })
    },
    toOkr (index) {
      const mg_id = this.rep_start1[index].mg_id
      this.$router.push({ name: `okr_edit`,
        params: { name: mg_id },
        meta: { title: `${mg_id}-okr` } })
    },
    download (index) {
      const mg_id = this.rep_start1[index].mg_id
      // reportDownload(mg_id).then(res => {
      //   this.$Message.success(res.data.msg)
      // })
      const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
      const path = baseUrl + 'download/' + mg_id + '_12'
      window.location.href = path
      console.log(path)
    }
  },
  mounted () {
    this.getRepData1()
  }
}
</script>
