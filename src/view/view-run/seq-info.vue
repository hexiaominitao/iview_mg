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
        <Button type="primary" size="small" @click="remove(index)">保存结果</Button>
        <Button type="info" size="small" @click="reAnalys(index)">重新分析</Button>
        <!-- <Button type="error" size="small" @click="remove(index)">终止</Button> -->
      </template>
    </Table>
    <Modal
        v-model="view_run"
        fullscreen
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <Table :columns='seq_columns' :data='seq_data'></Table>
    </Modal>
    <Button type="primary" size="small" @click="startRep">保存所有结果</Button>
    <Button type="info" size="small" @click="reAnalysAll">重新分析</Button>
    <!-- <Button type="error" @click="remove(index)">终止</Button> -->
  </div>
</template>
<script>
import {
  getSeqInfo, startMakeRep, reAnalysSeq
} from '@/api/data'
export default {
  name: 'seq_info',
  data () {
    return {
      title: [],
      view_run: false,
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
    reAnalys (index) {
      // this.view_run = true
      this.$Modal.confirm({
        title: '确定重新分析所选样本!!!!',
        content: '<p>点击确定将重分析所选样本!!!</p><p>请慎重操作!!!!</p>',
        onOk: () => {
          const sams = [this.seq_data[index]]
          reAnalysSeq(sams).then(res => {
            this.$Message.info(res.data.msg)
          })
          this.getSeq()
        },
        onCancel: () => { this.$Message.info('取消') }
      })
    },
    reAnalysAll () {
      this.$Modal.confirm({
        title: '确定重新分析所选样本!!!!',
        content: '<p>点击确定将重分析所选样本!!!</p><p>请慎重操作!!!!</p>',
        onOk: () => {
          const sams = this.selectSam
          reAnalysSeq(sams).then(res => {
            this.$Message.info(res.data.msg)
          })
          this.getSeq()
        },
        onCancel: () => { this.$Message.info('取消') }
      })
    },
    selectRep (selection) {
      this.selectSam = selection
    },
    startRep () {
      this.$Modal.confirm({
        title: '确定保存所选样本结果?',
        // content: '<p>承包后其他人将失去承包的机会,请谨慎承包!!!!!</p>',
        render: (h) => {
          return h('Table', {
            props: {
              columns: [
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
                }
              ],
              data: this.selectSam
            },
            on: {
              input: (val) => {
                this.value = val
              }
            } })
        },
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
          this.seq_data.splice(index, 1)
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
    this.getSeq()
  }
}

</script>
