<template>
  <div>
    <Table border :columns='qc_title' :data='qc'></Table>
  </div>
</template>
<script>
import { getQCAndRaw } from '@/api/data'
export default {
  name: 'report_qc',
  data () {
    return {
      qc_title: [],
      qc: []
    }
  },
  methods: {
    getQc () {
      const id = this.$route.params.name
      getQCAndRaw(id).then(res => {
        this.qc_title = res.data.qc_title
        this.qc = res.data.qc
      })
    }
  },
  mounted () {
    this.getQc()
  }
}
</script>
