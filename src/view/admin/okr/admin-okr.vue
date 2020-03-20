<template>
  <div>
    <h3>OKR</h3>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="info" size="small" @click="update_okr">更新</Button>
      </template>
    </Table>
    <Drawer title="上传结果文件" v-model="edit_okr" width="720" :mask-closable="false" :styles="styles">
      <Upload multiple type="drag" :action="action_okr" :data=fileData>
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽到此处上传</p>
        </div>
      </Upload>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="edit_okr = false">关闭</Button>
        <!-- <Button type="primary" @click="submitMutation">提交</Button> -->
      </div>
    </Drawer>
  </div>
</template>
<script>
import config from '@/config'
const UploadUrl = process.env.NODE_ENV === 'development' ? config.UploadUrl.dev : config.UploadUrl.pro
export default {
  name: 'admin-okr',
  data () {
    return {
      edit_okr: false,
      action_okr: UploadUrl + 'okr/',
      columns12: [{
        title: '版本',
        slot: 'name'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 150,
        align: 'center'
      }
      ],
      data6: [{
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park'
      }]
    }
  },
  methods: {
    update_okr () {
      this.edit_okr = true
    }
  }
}

</script>
