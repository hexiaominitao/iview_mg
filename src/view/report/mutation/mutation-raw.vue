<template>
  <div>
    <Table height='620' border :columns='raw_title' :data='raw'></Table>
  </div>
</template>
<script>
import { getQCAndRaw } from '@/api/data'
export default {
  name: 'mutation_raw',
  data () {
    return {
      raw_title: [],
      raw: []
    }
  },
  methods: {
    getRaw () {
      const id = this.$route.params.name
      getQCAndRaw(id).then(res => {
        this.raw_title = res.data.raw_title
        this.raw = res.data.raw
      })
    }
  },
  mounted () {
    this.getRaw()
  }
}
</script>
