<template>
  <div>
    <Table border height='460' :columns='col_mutation' :data="check_mutation">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="info" size="small" @click="editMutations(index)">编辑</Button>
      </template>
    </Table>
    <Drawer title="编辑结果" v-model="edit_value" width="720" :mask-closable="false" :styles="styles">
      <Form>
        <FormItem label="功能影响">
                    <Input v-model="edit_mutations.fu_type" />
                </FormItem>
        <FormItem label="变异全称">
                    <Input v-model="edit_mutations.mu_name" />
                </FormItem>
        <FormItem label="临床突变常用名称">
                    <Input v-model="edit_mutations.mu_name_usual" />
                </FormItem>
        <FormItem label="突变频率">
                    <Input v-model="edit_mutations.mu_af" />
                </FormItem>
        <FormItem label="临床意义级别">
                    <Input v-model="edit_mutations.grade" />
                </FormItem>
      </Form>
      <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="edit_value = false">取消</Button>
          <Button type="primary" @click="submitMutation">提交</Button>
        </div>
    </Drawer>
  </div>
</template>
<script>
import {
  checkMtation, editMtation
} from '@/api/report'
export default {
  name: 'check_mutation',
  data () {
    return {
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      edit_mutations: [],
      edit_value: false,
      check_mutation: [],
      col_mutation: [{
        title: '位置',
        width: 150,
        key: 'locus'
      },
      {
        title: '基因',
        width: 100,
        key: 'gene'
      },
      {
        title: '功能影响',
        width: 150,
        key: 'fu_type'
      },
      {
        title: '变异全称',
        key: 'mu_name'
      },
      {
        title: '突变频率',
        width: 100,
        key: 'mu_af'
      },
      {
        title: '临床突变常用名称',
        width: 200,
        key: 'mu_name_usual'
      },
      {
        title: '临床意义级别',
        width: 100,
        key: 'grade'
      },
      {
        title: '操作',
        width: 100,
        slot: 'action'
      }
      ]
    }
  },
  methods: {
    get_check_mutation () {
      const mg_id = this.$route.params.name
      checkMtation(mg_id).then(res => {
        this.check_mutation = res.data.mutation
      })
    },
    editMutations (index) {
      this.edit_value = true
      this.edit_mutations = this.check_mutation[index]
    },
    submitMutation () {
      this.edit_value = false
      const sams = this.edit_mutations
      const mg_id = this.$route.params.name
      editMtation(sams, mg_id).then(res => {
        this.$Message.info(res.data.msg)
      })
    }
  },
  mounted () {
    this.get_check_mutation()
  }
}

</script>
