<template>
  <div>
    <h3>所有报告</h3>
    <Table border height='520' :columns='report_columns' :data="rep_start">
          <!-- <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" @click="start">开始打磨</Button>
          </template> -->
        </Table>
  </div>
</template>
<script>
import { getReportStart } from '@/api/report'
export default {
  name: 'all_report',
  data () {
    return {
      rep_start: [],
      all_rep: [],
      total_rep: 0,
      report_columns: [
        {
          title: '迈景编号',
          key: 'mg_id'
        },
        {
          title: '检测项目',
          key: 'seq_item'
        },
        {
          title: '备注',
          key: 'note'
        },
        {
          title: '报告状态',
          key: 'tag'
        }
      ]
    }
  },
  methods: {
    start () {
      this.$Message.info('开始制作报告...')
    },
    getRepData () {
      getReportStart().then(res => {
        this.rep_start = res.data.sample
        this.all_rep = res.data.sample
        this.total_rep = res.data.total
      })
    }
  },
  mounted () {
    this.getRepData()
  }
}
</script>
