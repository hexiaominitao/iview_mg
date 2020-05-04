<template>
  <div>
    <Row>
      <Col span='6'>Run:<strong>{{ title.name }}</strong></Col>
      <Col span='6'>上机时间:<strong>{{ dateToString(title.start_T) }}</strong></Col>
      <Col span='6'>下机时间:<strong>{{ dateToString(title.end_T) }}</strong></Col>
      <Col span='6'>测序平台:<strong>{{ title.platform }}</strong></Col>
    </Row>
    <br>
    <Table border height='520' :columns='seq_columns' :data='seq_data' @on-selection-change='selectRep'>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="remove(index)">保存结果</Button>
        <Button type="info" size="small" @click="reAnalys(index)">重新分析</Button>
      </template>
    </Table>
    <Modal v-model="view_run" fullscreen title="编辑" footer-hide :closable='false'>
      <Table height='520' :columns='edit_title' :data='edit_data'>
        <template slot-scope="{ row, index }" slot="sample_name">
          <Input v-model="edit_data[index].sample_name"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="sample_mg">
          <Input v-model="edit_data[index].sample_mg"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="item">
          <Input v-model="edit_data[index].item"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="gender">
          <Input v-model="edit_data[index].gender"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="sam_type">
          <Input v-model="edit_data[index].sam_type"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="cell_percent">
          <Input v-model="edit_data[index].cell_percent"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="barcode">
          <Input v-model="edit_data[index].barcode"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="cancer">
          <Input v-model="edit_data[index].cancer"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="report_item">
          <Input v-model="edit_data[index].report_item"></Input>
        </template>
        <template slot-scope="{ row, index }" slot="note">
          <Input v-model="edit_data[index].note"></Input>
        </template>
      </Table>
      <Button @click="saveEdit">保存</Button>
      <Button @click="closeModal">关闭</Button>
    </Modal>
    <Button type="primary" size="small" @click="startRep">保存所有结果</Button>
    <Button type="info" size="small" @click="reAnalysAll">重新分析</Button>
    <Button type="error" size="small" @click="editSeq">编辑</Button>
    <!-- <Button type="error" @click="remove(index)">终止</Button> -->
  </div>
</template>
<script>
import {
  getSeqInfo,
  startMakeRep,
  reAnalysSeq,
  editSeqInfo
} from '@/api/data'
export default {
  name: 'seq_info',
  data () {
    return {
      title: [],
      view_run: false,
      edit_save: false,
      seq_data: [],
      selectSam: [],
      seq_columns: [],
      edit_title: [],
      edit_data: []
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
        this.seq_columns = res.data.seq_title
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
    editSeq () {
      if (this.selectSam.length > 0) {
        this.view_run = true
        this.edit_save = false
        this.edit_data = this.selectSam
        this.edit_title = this.seq_columns.slice(3).map(item => {
          return {
            title: item.title,
            slot: item.key,
            width: item.width
          }
        })
      } else {
        this.$Message.info('未选择，请选择测序信息进行编辑')
      }
    },
    saveEdit () {
      const sams = this.edit_data
      editSeqInfo(sams).then(res => {
        this.$Message.info(res.data.msg)
        this.edit_save = true
      })
    },
    closeModal () {
      if (this.edit_save === false) {
        this.$Modal.confirm({
          title: '确定要关闭吗',
          content: '<p>上机信息未保存</p>',
          onOk: () => {
            this.view_run = false
            this.getSeq()
          },
          onCancel: () => {
            this.$Message.info('取消')
          } })
      } else {
        this.view_run = false
        this.getSeq()
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
        onCancel: () => {
          this.$Message.info('取消')
        }
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
        onCancel: () => {
          this.$Message.info('取消')
        }
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
              columns: [{
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
            }
          })
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
        this.seq_columns = res.data.seq_title
      })
    }
  },
  mounted () {
    this.getSeq()
  }
}

</script>
