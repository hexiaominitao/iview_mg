<template>
<div>
<Card style="width:100%">
        <p slot="title">
            {{ my_title }}
        </p>
        <Row>
          <Col span='4'><b>患者姓名:</b></Col>
          <Col span='8'><a @click="toPatientInfo">{{ data.patient_name }}</a></Col>
          <Col span='4'><b>申请单号:</b></Col>
          <Col span='8'>{{ data.mg_id }}</Col>
        </Row>
        <Row v-for="(item,key) in data" :key=key>
        <Col span="6">{{key}}:</Col>
        <Col span="6">{{item}}</Col>
    </Row>
    </Card>
</div>
</template>
<script>
import { getSampleInfoById } from '@/api/data'
export default {
  name: 'sample_mg',
  data () {
    return {
      data: []
    }
  },
  computed: {
    my_title () {
      return this.$route.params.mg_id
    }
  },
  watch: {
    my_title: function () {
      getSampleInfoById(this.$route.params.mg_id).then(res => {
        this.data = res.data.sample
        console.log(res.data.sample)
      })
    }
  },
  methods: {
    toPatientInfo () {
      this.$Message.info('点击了' + this.data.patient_name)
      this.$router.push({ name: `sample_name`,
        params: { name: this.data.patient_name },
        meta: { title: `${this.data.patient_name}-详细信息` } })
    }
  },
  mounted () {
    getSampleInfoById(this.$route.params.mg_id).then(res => {
      this.data = res.data.sample
      console.log(res.data.sample)
    })
  }
}
</script>
