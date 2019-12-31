<template>
      <Upload
        multiple
        type="drag"
        :action="action">
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
  }
}
</script>
