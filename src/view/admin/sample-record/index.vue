<template>
  <div>
    <Button type="primary" @click="sales_upload = true">信息登记</Button>
    <Drawer title="文件上传" v-model="sales_upload" width="720" :mask-closable="false">
      <Upload multiple type="drag" :data=fileData1 :action="action_sales">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传</p>
        </div>
      </Upload>
      <Button type="primary" @click="sales_upload = false">信息登记</Button>
    </Drawer>
      <br>
      <br>
    <Card>
      <Row>
        <Col span="4">
          <Select v-model="search_item">
              <Option value="sales">销售</Option>
              <Option value="hospital">医院</Option>
              <Option value="type">样本类型</Option>
            </Select>
        </Col>
        <Col span="20">
          <Input search enter-button placeholder="输入销售名称/医院名称/样本类型" @on-search="searchItem"/>
        </Col>
      </Row>
    </Card>
    <Table :data="my_data" :columns="columns_con"></Table>
  </div>
</template>
<script>
import {
  getrSampleRecordConfig
} from '@/api/sample_record'
import config from '@/config'
const UploadUrl = process.env.NODE_ENV === 'development' ? config.UploadUrl.dev : config.UploadUrl.pro
export default {
  name: 'admin_record',
  data () {
    return {
      action_sales: UploadUrl + 'general_upload/',
      sales_upload: false,
      fileData1: {
        name: 'sales'
      },
      hospital: [],
      columns_con: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '代码',
          key: 'code'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '电话',
          key: 'phone'
        }
      ],
      sample_type: [],
      sales: [],
      search_item: 'sales',
      table_data: [],
      my_data: []
    }
  },
  methods: {
    getSHT () {
      getrSampleRecordConfig().then(res => {
        this.hospital = res.data.hospital
        this.sample_type = res.data.type
        this.sales = res.data.sales
      })
    },
    searchItem (value) {
      const item = this.search_item
      if (item === 'sales') {
        this.table_data = this.sales
      } else if (item === 'hospital') {
        this.table_data = this.hospital
      } else {
        this.table_data = this.sample_type
      }
      if (value !== '') {
        this.my_data = this.table_data.filter(item => item.name.indexOf(value) > -1)
      } else {
        this.my_data = this.table_data
      }
    }
  },
  mounted () {
    this.getSHT()
  }
}
</script>
