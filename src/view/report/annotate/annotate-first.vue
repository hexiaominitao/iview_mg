<template>
  <div>
    <Card>
      <p slot="title">样本信息</p>
      <Row gutter="2">
        <Col span="4"><div class="sample-info"><div class="sample-label">患者姓名:</div>{{ patient_info.name }}</div></Col>
        <Col span="4"><div class="sample-info"><div class="sample-label">样本类型:</div>{{ sample_info.sample_type }}</div></Col>
        <Col span="4"><div class="sample-info"><div class="sample-label">样本编号:</div>{{ sample_info.mg_id }}</div></Col>
        <Col span="6"><div class="sample-info"><div class="sample-label">临床诊断:</div>{{ sample_info.diagnosis }}</div></Col>
        <Col span="6"><div class="sample-info"><div class="sample-label">病理诊断:</div>{{ sample_info.pathological }}</div></Col>
      </Row>
    </Card>
    <Card>
      <Row>
        <Col span="4">癌症类型:</Col>
        <Col span="16">
        <Select v-model="sample_info.cancer" style="width:200px"
                @on-change="slectGrade($event, index)"
                filterable
                clearable
                remote
                :remote-method="remoteMethod1"
                :loading="loading1">
          <Option v-for="item in cancers" :value="item.value" :key="item.value" >{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="4"><Button type="primary" @click="autoAnnotate">提交癌症类型</Button></Col>
      </Row>
    </Card>
    <br>
    <div v-for="mu in mutations" v-bind:key="mu.id">
      <Row type="flex" justify="center" align="middle">
        <Col span='4'><Card>{{ mu.mu_name_usual }}</Card></Col>
        <Col span='4'><Card>{{ mu.grade }}</Card></Col>
        <Col span='16'><Collapse>
            <Panel>
              药物
              <ul v-for="row in mu.drug" v-bind:key="row.id" slot="content" style="list-style-type:none">
                <li><Card>{{ row.drug }}({{ row.level }}:{{ row.drug_effect }})</Card></li>
              </ul>
            </Panel>
          </Collapse></Col>
      </Row>
    </div>
    <Row>
      <Col span="4"><Button type="primary" @click="save">保存</Button></Col>
      <Col span="4" offset="16"><Button type="success" @click="setStage">提交审核结果</Button></Col>
    </Row>
  </div>
</template>
<script>
import { getAnnotate, putAnnotate, saveExplanation, setReportStage } from '@/api/report'
export default {
  name: 'rep_mutation',
  data () {
    return {
      sample_info: [],
      patient_info: [],
      mutations: [],
      annotate_c: '',
      loading1: false,
      cancers: []
    }
  },
  methods: {
    getAnnotateDate () {
      const id = this.$route.params.name
      getAnnotate(id).then(res => {
        this.sample_info = res.data.sample_info
        this.patient_info = res.data.patient_info
        this.mutations = res.data.mutation
        this.cancers = res.data.cancers
        console.log(this.sample_info)
      })
    },
    autoAnnotate () {
      const rep_id = this.$route.params.name
      const cancer = this.sample_info.cancer
      putAnnotate(rep_id, cancer).then(res => {
        this.$Message.success(res.data.msg)
        this.getAnnotateDate()
      })
    },
    saveExp () {
      saveExplanation(this.mutations, this.sample_info.cancer).then(res => {
        this.$Message.success(res.data.msg)
      })
    },
    save () {
      this.saveExp()
    },
    setStage () {
      const id = this.$route.params.name
      const stage = '生成报告'
      setReportStage(id, stage).then(res => {
        this.$Message.success(res.data.msg)
        this.getAnnotateDate()
      })
    },
    remoteMethod1 (query) {
      if (query !== '') {
        this.loading1 = true
        setTimeout(() => {
          this.loading1 = false
          const list = this.cancers
          this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.options1 = []
      }
    }

  },
  mounted () {
    this.getAnnotateDate()
  }
}
</script>
<style>
  .sample-info {
    font-size: 15px;
    font-weight: 700;
    line-height: 15px;
  }
  .sample-label {
    font-size: 10px;
    font-weight: 400;
    float: left;
    margin-right: 2%;
  }
</style>
