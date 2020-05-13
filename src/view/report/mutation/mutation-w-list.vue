<template>
  <div>
    <Table height='620' border :columns='w_list_title' :data='w_list'></Table>
  </div>
</template>
<script>
import { getQCAndRaw } from '@/api/data'
export default {
  name: 'mutation_w_list',
  data () {
    return {
      w_list_title: [],
      w_list: []
    }
  },
  methods: {
    getWList () {
      const id = this.$route.params.name
      getQCAndRaw(id).then(res => {
        this.w_list_title = res.data.w_list_title
        this.w_list = res.data.w_list
      })
    }
  },
  mounted () {
    this.getWList()
  }
}
</script>
