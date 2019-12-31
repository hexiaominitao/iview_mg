<template>
  <div>
    <Button type="info" @click="toAdd">新增配置</Button>
    <Button>导出所有配置</Button>
    <br>
    <Table border stripe height='500' :columns='admin_template_col'
    :data='all_template' size='small'></Table>
  </div>
</template>
<script>
import { getTemplateAll } from '@/api/admin'
export default {
  name: 'admin_report_template',
  data () {
    return {
      all_template: [],
      admin_template_col: [
        {
          title: '项目',
          key: '项目'
        },
        {
          title: '预览'
        },
        {
          title: '导出配置'
        }
      ]
    }
  },
  methods: {
    getData () {
      getTemplateAll().then(res => {
        this.all_template = res.data.all_template
      })
    },
    toAdd () {
      this.$router.push({ name: `admin_template_upload` })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
