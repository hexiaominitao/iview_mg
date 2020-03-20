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
        <Col span="4">{{ sample_info.cancer }}</Col>
      </Row>
    </Card>
    <br>
    <div v-for="mu in mutations" v-bind:key="mu.id">
      <Card>
        <Row>
          <Col span="4"><div>{{ mu.mu_name_usual }}</div></Col>
          <Col span="20"><Input v-model="mu.annotate_c" maxlength="5000" show-word-limit type="textarea" placeholder="请严肃认真地填写该变异的结果解释..."/></Col>
        </Row>
      </Card>
    </div>
    <Row>
      <Col span="4"><Button type="primary" @click="save">保存</Button></Col>
      <Col span="4" offset="16"><Button type="success" @click="setStage">提交审核结果</Button></Col>
    </Row>
  </div>
</template>
<script>
import { getAnnotateCheck } from '@/api/report'
export default {
  name: 'annotate-check',
  data () {
    return {
      sample_info: [],
      patient_info: [],
      mutations: []
    }
  },
  methods: {
    getAnnotate2 () {
      const id = this.$route.params.name
      getAnnotateCheck(id).then(res => {
        this.sample_info = res.data.sample_info
        this.patient_info = res.data.patient_info
        this.mutations = res.data.mutation
        console.log(this.sample_info)
      })
    },
    setStage () {
      const id = this.$route.params.name
      const stage = '注释复核'
      setReportStage(id, stage).then(res => {
        this.$Message.success(res.data.msg)
        this.getAnnotate2()
      })
    }
  },
  mounted () {
    this.getAnnotate2()
  }
}
</script>
