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
        <Select v-model="sample_info.cancer" style="width:200px" @on-change="slectGrade($event, index)">
          <Option v-for="item in cancers" :value="item.value" :key="item.value" >{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="4"><Button type="primary" @click="autoAnnotate">提交癌症类型</Button></Col>
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
import { getAnnotate, putAnnotate, saveExplanation, setReportStage } from '@/api/report'
export default {
  name: 'rep_mutation',
  data () {
    return {
      sample_info: [],
      patient_info: [],
      mutations: [],
      annotate_c: '',
      cancers: [
        {
          value: '非小细胞肺癌',
          label: '非小细胞肺癌'
        },
        {
          value: '小细胞肺癌',
          label: '小细胞肺癌'
        },
        {
          value: '结直肠癌',
          label: '结直肠癌'
        },
        {
          value: '乳腺癌',
          label: '乳腺癌'
        }
      ]
    }
  },
  methods: {
    getAnnotateDate () {
      const id = this.$route.params.name
      getAnnotate(id).then(res => {
        this.sample_info = res.data.sample_info
        this.patient_info = res.data.patient_info
        this.mutations = res.data.mutation
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
      const stage = '注释复核'
      setReportStage(id, stage).then(res => {
        this.$Message.success(res.data.msg)
        this.getAnnotateDate()
      })
    }
  },
  mounted () {
    this.getAnnotateDate()
  },
  beforeDestroy () {
    this.saveExp()
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
