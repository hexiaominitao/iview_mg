<template>
  <div>
    <p>原始数据</p>
    <hot-table :settings="hotSetting1" width="1000" height="600"></hot-table>
  </div>
</template>
<script>
import { HotTable } from '@handsontable/vue'
import { getIRList } from '@/api/data'
export default {
  name: 'ir_mutation',
  components: {
    HotTable
  },
  data () {
    return {
      hotSetting1: {
        data: [],
        colHeaders: [],
        rowHeaders: true,
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
        filters: true,
        readOnly: true,
        contextMenu: { // 自定义右键菜单，可汉化，默认布尔值
          items: {
            'copy': {
              name: '复制'
            }
          }
        },
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
  methods: {
    getData () {
      const id = this.$route.params.name
      this.$Message.info(id)
      getIRList(id).then(res => {
        this.data = res.data.data
        this.colHeaders = res.data.colHeaders
        console.log(this.colHeaders)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
