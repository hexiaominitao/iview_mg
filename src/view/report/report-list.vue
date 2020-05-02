<template>
  <div>
    <h3>制作列表</h3>
    <!-- <Button type="info" @click="upload_ir_result">上传突变结果文件</Button> -->
    <Table border height='520' :columns='report_columns1' :data="rep_start1" @on-selection-change='selectRep'>
      <!-- <template slot-scope="{ row, index }" slot="upload">
        <Upload :action="action_ir" :data=fileData :show-upload-list="false">
          <Button icon="ios-cloud-upload-outline" @click="repId(index)">上传结果</Button>
        </Upload>
      </template> -->
      <template slot-scope="{ row, index }" slot="actions">
        <!-- <Button type="primary" size="small" @click="startRun(index)">突变初审</Button> -->
        <Button type="success" size="small" @click="reStartRun(index)">突变审核</Button>
        <!-- <Button type="info" size="small" @click="conRun(index)">突变注释</Button> -->
        <!-- <Button type="primary" size="small">审核解释</Button> -->
        <!-- <Button type="info" size="small" @click="toOkr(index)">注释复核</Button> -->
        <Button type="success" size="small" @click="preReport(index)">导出word报告</Button>
      </template>
    </Table>
    <Button @click="createAll">生成所有报告</Button>
    <Button @click="downloadAll">下载所有报告</Button>
    <Card><p>注意：请先生成报告再下载！！！</p></Card>
    <Drawer :title="rep_code_mg" v-model="edit_val" width="520" :mask-closable="false" :styles="styles">
      <p></p>
      <br>
      <Form>
        <FormItem label="报告模板">
          <p>{{ item }}</p>
          <Select v-model="item" style="width:200px">
            <Option v-for="item_rep in template_item" :value="item_rep.value" :key="item_rep.value">{{ item_rep.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否未检测到">
          <RadioGroup v-model="note">
            <Radio :label="1">是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="edit_val = false">关闭</Button>
        <Button type="primary" @click="download1">下载</Button>
        <Button type="primary" @click="downloadApi">生成</Button>
      </div>
      <br>
      <Card><p>备注：先提交生成报告才能下载；未检测到的选择是。</p></Card>
    </Drawer>
  </div>
</template>
<script>
import {
  getReportStart,
  getReportList,
  exportReport,
  setReportStage
} from '@/api/report'
import { templateItem } from '@/api/config'
import config from '@/config'
const UploadUrl = process.env.NODE_ENV === 'development' ? config.UploadUrl.dev : config.UploadUrl.pro
export default {
  name: 'report_list',
  data () {
    return {
      fileData: {
        name: ''
      },
      rep_start1: [],
      template_item: [],
      edit_val: false,
      item: '',
      items: [],
      note: 0,
      edit_id: '',
      rep_code_mg: '',
      selectReport: [],
      action_ir: UploadUrl + 'mutation_upload/',
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      total_rep1: 0,
      report_columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '迈景编号',
          key: 'mg_id'
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
  computed: {
    rep_id (index) {
      return { id: this.rep_start1[index].id }
    }
  },
  methods: {
    repId (index) {
      this.fileData.name = this.rep_start1[index].id
    },
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
      const id = this.rep_start1[index].id
      this.$router.push({
        name: `mutation_list`,
        params: {
          name: id,
          mg_id: mg_id
        },
        meta: {
          title: `${mg_id}-突变初审`
        }
      })
      getReportList(mg_id).then(res => {
        this.$Message.success(res.data.msg)
      })
    },
    reStartRun (index) {
      const mg_id = this.rep_start1[index].mg_id
      const id = this.rep_start1[index].id
      this.$router.push({
        name: `check_mutation`,
        params: {
          name: id,
          mg_id: mg_id
        },
        meta: {
          title: `${mg_id}-突变审核`
        }
      })
    },
    conRun (index) {
      const mg_id = this.rep_start1[index].mg_id
      const id = this.rep_start1[index].id
      this.$router.push({
        name: `rep_mutation`,
        params: {
          name: id,
          mg_id: mg_id
        },
        meta: {
          title: `${mg_id}-突变注释`
        }
      })
    },
    toOkr (index) {
      const mg_id = this.rep_start1[index].mg_id
      const id = this.rep_start1[index].id
      this.$router.push({
        name: `okr_edit`,
        params: {
          name: id,
          mg_id: mg_id
        },
        meta: {
          title: `${mg_id}-okr`
        }
      })
    },
    preReport (index) {
      this.edit_val = true
      this.edit_id = this.rep_start1[index].id
      this.rep_code_mg = this.rep_start1[index].mg_id
      this.item = this.rep_start1[index].report_item
    },
    downloadApi () {
      const stage = '制作完成'
      setReportStage(this.edit_id, stage).then(res => { })
      exportReport(this.edit_id, this.item, this.note).then(res => {
        this.$Message.info(res.data.msg)
      })
    },
    download (data) {
      if (!data) {
        return {}
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.herf = url
      link.setAttribute('download', '12.docx')

      document.body.appendChild(link)
      link.click()
    },
    download1 () {
      this.$Message.info('开始下载')
      const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
      const path = baseUrl + 'download/' + this.edit_id + '_' + this.item + '_' + this.note + '/'
      window.location.href = path
      this.$Message.success('下载完成!!!')
    },
    upload_ir_result () {
      this.edit_val = true
    },
    getTemplateItem () {
      templateItem().then(res => {
        this.template_item = res.data.item
      })
    },
    selectRep (selection) {
      this.selectReport = selection
    },
    createAll () {
      for (var i = 0; i < this.selectReport.length; i++) {
        const id = this.selectReport[i].id
        const item = this.selectReport[i].report_item
        exportReport(id, item, 0).then(res => {
          this.$Message.info(res.data.msg)
        })
      }
    },
    downloadAll () {
      console.log(this.selectReport)
      for (var i = 0; i < this.selectReport.length; i++) {
        const id = this.selectReport[i].id
        const item = this.selectReport[i].report_item
        const mg = this.selectReport[i].mg_id
        this.$Message.info(mg + '开始下载')
        const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
        const path = baseUrl + 'download/' + id + '_' + item + '_' + 0 + '/'
        window.location.href = path
        this.$Message.success(mg + '下载完成!!!')
      }
    }
  },
  mounted () {
    this.getRepData1()
    this.getTemplateItem()
  }
}

</script>
