<template>
<div>
<Card style="width:100%">
        <p slot="title">
            {{ my_title }}
        </p>
        <Row>
          <Col span='4'><b>患者姓名:</b></Col>
          <Col span='8'><a @click="toPatientInfo">{{ data.name }}</a></Col>
          <Col span='4'><b>年龄:</b></Col>
          <Col span='8'>{{ data.age }}</Col>
        </Row>
        <Row v-for="(item,key) in data" :key=key>
        <Col span="6">{{key}}:</Col>
        <Col span="6">{{item}}</Col>
    </Row>
    </Card>
</div>
</template>
<script>
import { getSampleInfoByName } from '@/api/data'
export default {
  name: 'sample_name',
  data () {
    return {
      data: []
    }
  },
  computed: {
    my_name () {
      return this.$route.params.name
    }
  },
  watch: {
    my_name: function () {
      getSampleInfoByName(this.$route.params.name).then(res => {
        this.data = res.data.sample
        console.log(res.data.sample)
      })
    }
  },
  methods: {
    toPatientInfo () {
      this.$Message.info('点击了' + this.data.name)
      // this.route.push({ name: ``, params: {}, meta: {} })
    }
  },
  mounted () {
    getSampleInfoByName(this.$route.params.name).then(res => {
      this.data = res.data.sample
      console.log(res.data.sample)
    })
  }
}
</script>
