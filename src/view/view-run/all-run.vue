<template>
  <div>
    <Table border height='520' :columns='columns' :data='data'>
        <template slot-scope="{ row }" slot="start_T">
          <div>{{ dateToString(row.start_T) }}</div>
        </template>
        <template slot-scope="{ row }" slot="end_T">
          <div>{{ dateToString(row.end_T) }}</div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" @click="remove1(index)">删除</Button>
        </template>
      </Table>
    <Page :total="total" size="small" :page-size="page_per" show-elevator show-sizer
    @on-page-size-change="pageSize" @on-change="setPage"
      :page-size-opts='page_opts' />
  </div>
</template>
<script>
import { getRunInfo, delRunInfo } from '@/api/data'
export default {
  name: 'all_run',
  data () {
    return {
      data: [],
      total: 0,
      page: 0,
      page_per: 10,
      page_opts: [10, 20, 50, 100],
      columns: [
        {
          title: 'Run',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('div', {
                on: {
                  click: () => {
                    this.$router.push({ name: `seq_info`,
                      params: { name: params.row.name },
                      meta: { title: `${params.row.name}-测序信息` } })
                    this.$Message.info('点击了' + params.row.name)
                  }
                }
              }, params.row.name)
            ])
          }
        },
        {
          title: '上机时间',
          slot: 'start_T'
        },
        {
          title: '下机时间',
          slot: 'end_T'
        },
        {
          title: '测序平台',
          key: 'platform'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  computed: {
    a_height () {
      return this.page_per * 52
    }
  },
  methods: {
    setPage (page) {
      this.page = page
      getRunInfo(page, this.page_per).then(res => {
        this.data = res.data.run
      })
    },
    dateToString (str) {
      var date = new Date(str + '+0800')
      if (date instanceof Date) {
        var year = date.getFullYear()
        var month = (date.getMonth() + 1).toString()
        var day = (date.getDate()).toString()
        var hour = (date.getHours()).toString()
        var min = (date.getMinutes()).toString()
        if (month.length === 1) {
          month = '0' + month
        }
        if (day.length === 1) {
          day = '0' + day
        }
        if (hour.length === 1) {
          hour = '0' + hour
        }
        if (min.length === 1) {
          min = '0' + min
        }
        var dateTime = year + '.' + month + '.' + day + ' ' + hour + ':' + min
        return dateTime
      } else {
        return date
      }
    },
    pageSize (size) {
      this.page_per = size
      getRunInfo(this.page, size).then(res => {
        this.data = res.data.run
      })
    },
    remove1 (index) {
      this.$Modal.confirm({
        title: '确定删除所选Run!!!!',
        content: '<p>点击确定将删除整个run!!!</p><p>删除后无法恢复,请慎重操作!!!!</p>',
        onOk: () => {
          const id = this.data[index].id
          delRunInfo(id).then(res => {
            this.$Message.success(res.data.msg)
          })
          this.data.splice(index, 1)
          this.getDataRun()
        },
        onCancel: () => { this.$Message.info('取消') }
      })
    },
    getDataRun () {
      getRunInfo(1, 10).then(res => {
        this.data = res.data.run
        this.total = res.data.total
      })
    }
  },
  mounted () {
    this.getDataRun()
  }
}
</script>
