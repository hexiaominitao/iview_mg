<template>
  <div>
    <h3>上传报告配置文件</h3>
    <Upload multiple type="drag" :action="action">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击或拖拽到此处上传</p>
      </div>
    </Upload>
    <Card>
      <h4>注意:</h4>
      <ol style="margin-left: 5%;">
        <li>配置文件为JSON格式,<a href="#">查看文件详情</a>;</li>
        <li>上传相同项目的配置文件后上传的会覆盖之前上传的(可用于更新);</li>
      </ol>
    </Card>
  </div>
</template>
<script>
import config from '@/config'
const UploadUrl = process.env.NODE_ENV === 'development' ? config.UploadUrl.dev : config.UploadUrl.pro
export default {
  name: 'admin_template_upload',
  data () {
    return {
      action: UploadUrl + 'template_json'
    }
  }
}

</script>
