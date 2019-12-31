<template>
<div>
<Card :padding='10'><Row>
  <Col span="8"><Input search placeholder="输入质控编号" /></Col>
</Row></Card>
<Card>
<Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
</Card>
</div>
</template>
<script>
import { getRunInfo } from '@/api/data'
export default {
  name: 'distill-qc',
  data () {
    return {
      columns12: [
        {
          title: '质控编号',
          slot: 'name'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data6: []
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
  },
  mounted () {
    getRunInfo(1, 10).then(res => {
      this.data6 = res.data.run
    })
  }
}
</script>
