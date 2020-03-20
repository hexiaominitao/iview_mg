<template>
  <div>
    <Row>
      <Col span='6'>Run:<strong>{{ title.name }}</strong></Col>
      <Col span='6'>上机时间:<strong>{{ dateToString(title.start_T) }}</strong></Col>
      <Col span='6'>下机时间:<strong>{{ dateToString(title.end_T) }}</strong></Col>
      <Col span='6'>测序平台:<strong>{{ title.platform }}</strong></Col>
    </Row>
    <br>
    <Table border height='520' :columns='seq_columns' :data='seq_data'
        @on-selection-change='selectRep'>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="remove(index)">承包</Button>
        <!-- <Button type="error" size="small" @click="remove(index)">终止</Button> -->
      </template>
    </Table>
    <Button type="primary" @click="startRep">承包</Button>
    <!-- <Button type="error" @click="remove(index)">终止</Button> -->
  </div>
</template>
<script>
import {
  getSeqInfo, startMakeRep
} from '@/api/data'
export default {
  name: 'seq_info',
  data () {
    return {
      title: [],
      seq_data: [],
      selectSam: [],
      seq_columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '迈景编号',
          key: 'sample_name'
        },
        {
          title: '检测项目',
          key: 'item'
        },
        {
          title: 'Barcode',
          key: 'barcode'
        },
        {
          title: '备注',
          key: 'note'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  computed: {
    my_name () {
      return this.$route.params.name
    }
  },
  watch: {
    my_name: function () {
      getSeqInfo(this.$route.params.name).then(res => {
        this.seq_data = res.data.seq
        this.title = res.data.run
        console.log(res.data.seq)
      })
    }
  },
  methods: {
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
    remove (index) {
      this.selectSam = [this.seq_data[index]]
      console.log(this.selectSam)
      this.startRep()
    },
    selectRep (selection) {
      this.selectSam = selection
    },
    startRep () {
      this.$Modal.confirm({
        title: '确定承包这片鱼塘吗?',
        content: '<p>承包后其他人将失去承包的机会,请谨慎承包!!!!!</p>',
        onOk: () => {
          const sams = this.selectSam
          console.log(sams)
          startMakeRep(sams).then(res => {
            this.$Message.success(res.data.msg)
            if (res.data.errs) {
              this.$Notice.warning({
                title: '以下样本未生效:',
                desc: res.data.errs,
                duration: 0
              })
            }
            this.getSeq()
          })
          // this.seq_data.splice(index, 1)
        },
        onCancel: () => {
          this.$Message.info('取消')
        }
      })
    },
    getSeq () {
      getSeqInfo(this.$route.params.name).then(res => {
        this.seq_data = res.data.seq
        this.title = res.data.run
        console.log(res.data.seq)
      })
    }
  },
  mounted () {
    getSeqInfo(this.$route.params.name).then(res => {
      this.seq_data = res.data.seq
      this.title = res.data.run
      console.log(res.data.seq)
    })
  }
}

</script>
