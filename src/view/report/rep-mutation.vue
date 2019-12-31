<template>
  <div>
    <h3>{{ mg_id }}--结果解释</h3>
    <br>
    <h4>综合解读</h4>
    <br>
    <div v-for="mu in mutation" v-bind:key="mu.id">
      <Card>
        <Row>
          <Col span="8"><div>{{ mu.mu_name_usual }}</div></Col>
          <Col span="16"><Input type="textarea" v-model="mu.explanations" :autosize="true"></Input></Col>
        </Row>
      </Card>
    </div>
    <Button type="primary" @click="save">保存</Button>
  </div>
</template>

<script>
import {
  explanationMuta,
  saveExplanation
} from '@/api/report'
export default {
  name: 'rep_mutation',
  data () {
    return {
      mg_id: this.$route.params.name,
      mutation: []
    }
  },
  methods: {
    getExplanation () {
      explanationMuta(this.mg_id).then(res => {
        this.mutation = res.data.mutation
      })
    },
    saveExp () {
      saveExplanation(this.mutation).then(res => {
        this.$Message.success(res.data.msg)
      })
    },
    save () {
      this.saveExp()
    }
  },
  mounted () {
    this.getExplanation()
  },
  beforeDestroy () {
    console.log('销毁')
    this.saveExp()
  }
}

</script>
