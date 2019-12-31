<template>
  <div>
    <Button @click="getOkr">获取数据</Button>
    <Button @click="UploadOkr">上传</Button>
    <Drawer
            title="OKR数据上传"
            v-model="up_value"
            width="720"
            :mask-closable="true"
            :styles="styles">
            <Upload multiple type="drag" :action="action" :data="mg_id">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击或拖拽到此处上传</p>
      </div>
      </Upload>
    </Drawer>
    <br>
    <Table border height='520' :columns='okr_columns' :data="okr_data"></Table>
  </div>
</template>
<script>
import { getOkrData } from '@/api/report'
import config from '@/config'
const UploadUrl = process.env.NODE_ENV === 'development' ? config.UploadUrl.dev : config.UploadUrl.pro
export default {
  name: 'okr_edit',
  data () {
    return {
      mg_id: { mg_id: this.$route.params.name },
      up_value: false,
      action: UploadUrl + 'okr_upload',
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      okr_columns: [
        {
          title: '基因组改变',
          key: '基因组改变'
        },
        {
          title: 'FDA',
          key: 'FDA'
        },
        {
          title: 'NCCN',
          key: 'NCCN'
        },
        {
          title: 'EMA',
          key: 'EMA'
        },
        {
          title: 'ESMO',
          key: 'ESMO'
        },
        {
          title: 'Clinical Trials',
          key: 'Clinical Trials'
        }
      ],
      okr_data: []
    }
  },
  methods: {
    UploadOkr () {
      this.up_value = true
    },
    getOkr () {
      let mg_id = this.$route.params.name
      getOkrData(mg_id).then(res => {
        this.okr_data = res.data.okr
        this.$Message.info('得到了很多okr数据')
      })
    }
  }
}
</script>
