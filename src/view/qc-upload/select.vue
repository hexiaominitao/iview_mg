<template>
<Row>
        <Col span="12">
        <Transfer
        :data="data2"
        :target-keys="targetKeys2"
        filterable
        :list-style='listStyle'
        :filter-method="filterMethod"
        @on-change="handleChange2"></Transfer>
        </Col>
        <Col span="12">
        <Input v-model="qc_code" placeholder="输入质控编号" style="width: 300px" />
        <Button @click="submitQC">提取质控</Button></Col>
</Row>
</template>
<script>
import { getMGId, distillQC } from '@/api/data'
import { mapActions } from 'vuex'
export default {
  name: 'select-sample',
  data () {
    return {
      data: '',
      data2: [],
      qc_code: '',
      targetKeys2: JSON.parse(localStorage.getItem('TargetKey')) || [],
      listStyle: {
        width: '44%',
        height: '600px'
      }
    }
  },
  methods: {
    ...mapActions([
      'addSample'
    ]),
    handleChange2 (newTargetKeys) {
      // console.log(newTargetKeys)
      this.targetKeys2 = newTargetKeys
      localStorage.setItem('TargetKey', JSON.stringify(newTargetKeys))
      this.addSample(this.targetKeys2)
      console.log(this.$store.getters.selectSampleTarget)
    },
    filterMethod (data, query) {
      return data.label.indexOf(query) > -1
    },
    submitQC () {
      this.$Message.info(this.qc_code)
      const qc_code = this.qc_code
      const targetKey = JSON.stringify(this.targetKeys2)
      console.log(this.targetKeys2)
      distillQC({ qc_code, targetKey }).then(res => {
        console.log(res.data)
      }).catch(err => {
        reject(err)
      })
    }
  },
  mounted () {
    getMGId().then(res => {
      this.data2 = res.data.data
    })
    this.addSample(this.targetKeys2)
  }
}
</script>
