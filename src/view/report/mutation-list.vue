<template>
  <div>
    <h3>{{ mg_id }}--突变列表</h3>
    <Button @click="toIR">原始数据</Button><Button>白名单</Button>
    <br>
    <Table border height='460' :columns='col_mutation' :data="mutation"
    @on-selection-change='selectMutation'>
          <!-- <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" @click="startRun(index)">开始打磨</Button>
          </template> -->
        </Table>
    <Button type="primary" @click="passCheck">审核通过</Button>
    <Button type="warning" @click="delteAAA">从报告中移除</Button>
  </div>
</template>
<script>
import { getMutationList, passCheckMutation, delteMutation } from '@/api/report'
export default {
  name: 'mutation_list',
  data () {
    return {
      total: 0,
      mg_id: this.$route.params.name,
      mutation: [],
      selectMu: [],
      col_mutation: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '位置',
          width: 150,
          key: '位置'
        },
        {
          title: '基因',
          width: 100,
          key: '基因'
        },
        {
          title: '功能影响',
          width: 150,
          key: '功能影响'
        },
        {
          title: '变异全称',
          key: '变异全称'
        },
        {
          title: '突变频率',
          width: 100,
          key: '突变频率'
        },
        {
          title: '临床突变常用名称',
          width: 200,
          key: '临床突变常用名称'
        },
        {
          title: 'maf',
          width: 100,
          key: 'maf'
        },
        {
          title: '状态',
          width: 100,
          key: 'tag'
        }
      ]
    }
  },
  methods: {
    getMutation () {
      const mg_id = this.$route.params.name
      getMutationList(mg_id).then(res => {
        this.mutation = res.data.mutation
        this.total = res.data.total
        console.log(this.mutation)
      })
    },
    passCheck () {
      this.$Modal.confirm({
        title: '确定通过这些突变吗!',
        content: '<p>请仔细审核后再通过</p>',
        onOk: () => {
          const sams = this.selectMu
          passCheckMutation(sams, this.mg_id).then(res => {
            this.$Message.success(res.data.msg)
          })
          // this.seq_data.splice(index, 1)
          this.getMutation()
        },
        onCancel: () => {
          this.$Message.info('取消')
        }
      })
    },
    selectMutation (selection) {
      this.selectMu = selection
    },
    toIR () {
      this.$router.push({ name: `ir_list` })
    },
    delteAAA () {
      this.$Modal.confirm({
        title: '确定移除这些突变吗!',
        content: '<p>请仔细审核后再移除</p>',
        onOk: () => {
          const sams = this.selectMu
          delteMutation(sams, this.mg_id).then(res => {
            this.$Message.info(res.data.msg)
          })
          // this.seq_data.splice(index, 1)
          this.getMutation()
        },
        onCancel: () => {
          this.$Message.info('取消')
        }
      })
    }
  },
  mounted () {
    this.getMutation()
  }
}
</script>
