<template>
      <Upload
        multiple
        type="drag"
        :action="action"
        :on-success="handSuccess"
        :on-error="handErro">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽到此处上传</p>
        </div>
    </Upload>
</template>
<script>
import config from '@/config'
const UploadUrl = process.env.NODE_ENV === 'development' ? config.UploadUrl.dev : config.UploadUrl.pro
export default {
  name: 'run-info',
  data () {
    return { action: UploadUrl + 'run_info_upload'
    }
  },
  methods: {
    handSuccess (res, file, fileList) {
      // this.$Message.info(res.msg)
      this.$Notice.info({
        duration: 30,
        desc: res.msg
      })
    },
    handErro (errors, file, fileList) {
      this.$Message.error('文件存在问题检查文件内容，再重试')
    }
  }
}
</script>
