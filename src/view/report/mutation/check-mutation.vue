<template>
  <div>
    <Table border height='460' :columns='col_mutation' :data="check_mutation" @on-selection-change='selectMutation'>
      <template slot-scope="{ row, index }" slot="grade">
        <Select v-model="row.grade" style="width:80px" @on-change="slectGrade($event, index)">
          <Option v-for="item in grades" :value="item.value" :key="item.value" >{{ item.label }}</Option>
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="info" size="small" @click="editMutations(index)">编辑</Button>
      </template>
    </Table>
    <Row gutter="2">
      <Col span="2"><Button type="info" @click="submitAllMutation">二审通过</Button></Col>
      <Col span="6">
        <Button type="success" @click="setStage">提交审核结果</Button>
        <Button type="error" @click="reStage">退回上一步</Button>
      </Col>
    </Row>
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
          <!-- <Input v-model="edit_mutations.grade" /> -->
          <Select v-model="edit_mutations.grade" style="width:200px">
            <Option v-for="item in grades" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Row :gutter="2">
          <Col span="6"><Button style="margin-right: 8px" @click="edit_value = false">取消</Button></Col>
          <Col span="6"><Button type="primary" @click="submitMutation">二审通过</Button></Col>
          <Col span="6"><Button type="error" @click="delMutation">二审不通过</Button></Col>
        </Row>
      </div>
    </Drawer>
  </div>
</template>
<script>
import {
  checkMtation,
  editMtation,
  deleteMutation,
  setReportStage
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
      selectMutations: [],
      col_mutation: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '状态',
          width: 100,
          key: 'status'
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
          width: 120,
          slot: 'grade'
        },
        {
          title: '操作',
          width: 100,
          slot: 'action'
        }
      ],
      grades: [
        {
          value: 'I类',
          label: 'I类'
        },
        {
          value: 'II类',
          label: 'II类'
        },
        {
          value: 'III类',
          label: 'III类'
        },
        {
          value: 'IV类',
          label: 'IV类'
        }
      ]
    }
  },
  methods: {
    get_check_mutation () {
      const id = this.$route.params.name
      checkMtation(id).then(res => {
        this.check_mutation = res.data.mutation
        this.mg_id = res.data.mg_id
      })
    },
    selectMutation (selection) {
      this.selectMutations = selection
    },
    slectGrade (value, index) {
      this.check_mutation[index].grade = value
    },
    editMutations (index) {
      this.edit_value = true
      this.edit_mutations = this.check_mutation[index]
    },
    submitAllMutation () {
      const sams = this.selectMutations
      const mg_id = this.$route.params.name
      editMtation(sams, mg_id).then(res => {
        this.$Message.info(res.data.msg)
        this.get_check_mutation()
      })
    },
    submitMutation () {
      this.edit_value = false
      const sams = this.edit_mutations
      const mg_id = this.$route.params.name
      editMtation(sams, mg_id).then(res => {
        this.$Message.info(res.data.msg)
        this.get_check_mutation()
      })
    },
    delMutation () {
      this.edit_value = false
      const sams = this.edit_mutations
      deleteMutation(sams).then(res => {
        this.$Message.error(res.data.msg)
        this.get_check_mutation()
      })
    },
    setStage () {
      const id = this.$route.params.name
      const stage = '突变注释'
      setReportStage(id, stage).then(res => {
        this.$Message.success(res.data.msg)
        this.get_check_mutation()
      })
    },
    reStage () {
      const err_id = this.$route.params.name
      const err_stage = '突变初审'
      setReportStage(err_id, err_stage).then(res => {
        this.$Message.error(res.data.msg)
        this.get_check_mutation()
      })
    }
  },
  mounted () {
    this.get_check_mutation()
  }
}

</script>
