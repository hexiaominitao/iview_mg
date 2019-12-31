<template>
<div>
  <Table border stripe height='500' :columns='admin_sam_columns'
    :data='all_sample' size='small'>
      <template slot-scope="{ row, index }" slot="action_rep">
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
      <template slot-scope="{ row }" slot="diagnosis_date">
          <div>{{ dateToString(row.diagnosis_date) }}</div>
        </template>
      <template slot-scope="{ row }" slot="pathological_date">
          <div>{{ dateToString(row.pathological_date) }}</div>
        </template>
      <template slot-scope="{ row }" slot="recive_date">
          <div>{{ dateToString(row.recive_date) }}</div>
        </template>
      <template slot-scope="{ row }" slot="send_sample_date">
          <div>{{ dateToString(row.send_sample_date) }}</div>
        </template>
      <template slot-scope="{ row }" slot="seq_date">
          <div>{{ dateToString(row.seq_date) }}</div>
        </template>
    </Table>
    <Page :total="total" size="small" :page-size="page_per" show-elevator @on-change="setPage" />
    <Button type="error" @click="remove(index)">删除</Button>
    <!-- <Button type="error" @click="removeAll">全部删除</Button> -->
</div>
</template>
<script>
import { getSampleData, delSample } from '@/api/admin'
export default {
  name: 'admin_sample',
  data () {
    return {
      total: 0,
      page: 0,
      page_per: 10,
      page_opts: [10, 20, 50, 100],
      all_sample: [],
      admin_sam_columns: [
        {
          type: 'selection',
          width: 55,
          align: 'center',
          'fixed': 'left'
        },
        {
          title: '迈景编号',
          key: 'mg_id',
          width: '120'
        },
        {
          title: '申请单号',
          key: 'req_mg',
          width: '125'
        },
        {
          title: '检测项目',
          key: 'seq_item',
          width: '180'
        },
        {
          title: '医生姓名',
          key: 'doctor',
          width: '100'
        },
        {
          title: '医院名称',
          key: 'hosptial',
          width: '180'
        },
        {
          title: '科室',
          key: 'room',
          width: '120'
        },
        {
          title: '临床诊断',
          key: 'diagnosis',
          width: '240'
        },
        {
          title: '临床诊断日期',
          slot: 'diagnosis_date',
          width: '120'
        },
        {
          title: '病理诊断',
          key: 'pathological',
          width: '240'
        },
        {
          title: '病理诊断日期',
          slot: 'pathological_date',
          width: '120'
        },
        {
          title: '样本收到日期',
          slot: 'recive_date',
          width: '120'
        },
        {
          title: '样本运输方式',
          key: 'mode_of_trans',
          width: '120'
        },
        {
          title: '送检日期',
          slot: 'send_sample_date',
          width: '120'
        },
        {
          title: '收样人',
          key: 'reciver',
          width: '120'
        },
        {
          title: '收样日期',
          slot: 'recive_room_date',
          width: '120'
        },
        {
          title: '样本状态',
          key: 'sample_status',
          width: '120'
        },
        {
          title: '样本类型',
          key: 'sample_type',
          width: '120'
        },
        {
          title: '样本大小',
          key: 'sample_size',
          width: '120'
        },
        {
          title: '样本数量',
          key: 'sample_count',
          width: '120'
        },
        {
          title: '检测日期',
          slot: 'seq_date',
          width: '120'
        },
        {
          title: '备注',
          key: 'note',
          width: '240'
        },
        {
          title: '信息录入',
          key: 'recorder',
          width: '120'
        },
        {
          title: '信息审核',
          key: 'reviewer',
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
    dateToString (str) {
      if (str) {
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
          var dateTime = year + '.' + month + '.' + day
          return dateTime
        } else {
          return date
        }
      } else {
        return str
      }
    },
    getData () {
      getSampleData(1, 10).then(res => {
        this.all_sample = res.data.sample
        this.total = res.data.total
        console.log(this.all_sample)
      })
    },
    setPage (page) {
      this.page = page
      getSampleData(page, this.page_per).then(res => {
        this.all_sample = res.data.sample
      })
    },
    remove (index) {
      const id = this.all_sample[index].id
      delSample(id).then(res => {
        this.$Message.success(res.data.msg)
      })
      this.all_sample.splice(index, 1)
      this.getData()
    },
    removeAll () {
      delSample().then(res => {
        this.$Message.success(res.data.msg)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
