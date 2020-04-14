<template>
  <div>
    <Button @click="upload1 = true" type="primary">上传</Button>
    <Button @click="refresh" type="success">刷新</Button>
    <Button @click="del_all" type="warning">清空</Button>
    <Drawer width="520" :mask-closable="false" v-model="upload1" closable>
      <br>
      <h3>癌症类型: {{ fileData.cancer }}</h3>
      <br>
      <br>
      <Card>
      <Row>
        <Col span="4">癌症类型:</Col>
        <Col span="20">
        <Form :rules="ruleValidate">
          <FormItem prop="cancer">
            <Select v-model="fileData.cancer" style="width:200px"
                @on-change="slectGrade($event, index)"
                filterable
                clearable
                remote
                :remote-method="remoteMethod2"
                :loading="loading1">
          <Option v-for="item in cancers" :value="item.value" :key="item.value" >{{ item.label }}</Option>
        </Select>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </Card>
    <Upload
        multiple
        type="drag"
        :action="okr_upload"
        :data=fileData>
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽到此处上传</p>
        </div>
    </Upload>
    </Drawer>
    <Table border height='520' :columns='file_columns' :data="filelist">
      <template slot-scope="{ row, index }" slot="actions">
        <Button type="primary" @click="download(index)">下载</Button>
      </template>
    </Table>
  </div>
</template>
<script>
import { getOkrCancers, getOkrFiles, clearFile } from '@/api/data'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
export default {
  name: 'okr_575',
  data () {
    return {
      fileData: {
        cancer: ''
      },
      cancers: [],
      filelist: [],
      file_columns: [
        {
          title: '文件名',
          key: 'file'
        },
        {
          title: '操作',
          width: 400,
          slot: 'actions'
        }
      ],
      upload1: false,
      okr_upload: baseUrl + 'data/okr/',
      ruleValidate: {
        cancer: [
          { required: true, message: '请填写癌症类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    remoteMethod1 (query) {
      if (query !== '') {
        this.loading1 = true
        setTimeout(() => {
          this.loading1 = false
          const list = this.cancers
          this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.options1 = []
      }
    },
    download (index) {
      this.$Message.info('开始下载')
      const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
      const path = baseUrl + 'download_okr/' + this.filelist[index].file + '/'
      window.location.href = path
    },
    getCancers () {
      getOkrCancers().then(res => {
        this.cancers = res.data.cancers
      })
    },
    getOkrFile () {
      getOkrFiles().then(res => {
        this.filelist = res.data.files
        console.log(this.filelist)
      })
    },
    refresh () {
      this.getOkrFile()
    },
    del_all () {
      clearFile().then(res => {
        this.$Message.info(res.data.msg)
      })
      this.getOkrFile()
    }
  },
  mounted () {
    this.getCancers()
    this.getOkrFile()
  }
}
</script>
