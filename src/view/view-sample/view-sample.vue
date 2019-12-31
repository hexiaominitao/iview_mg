<template>
  <div>
    <div id='search-sample'>
      <Input autofocus search enter-button v-model="val" @on-search="remoteMethod1"></Input>
    </div>
    <div v-show="val">
      <Table border height='400' :columns='columns' :data='my_data'>
      </Table></div>
  </div>
</template>
<script>
import { getSampleInfo } from '@/api/data'
export default {
  name: 'view_sample',
  data () {
    return {
      val: '',
      columns: [
        {
          title: '迈景编号',
          key: 'mg_id',
          render: (h, params) => {
            return h('div', [
              h('div', {
                on: {
                  click: () => {
                    // eslint-disable-next-line standard/object-curly-even-spacing
                    this.$router.push({ name: `sample_mg`,
                      params: { mg_id: params.row.mg_id },
                      meta: { title: `${params.row.mg_id}-详细信息` } })
                    this.$Message.info('点击了' + params.row.mg_id)
                  }
                }
              }, params.row.mg_id)
            ])
          }
        },
        {
          title: '患者姓名',
          key: 'patient_name'
        },
        {
          title: '申请单号',
          key: 'req_mg'
        },
        {
          title: '检测项目',
          key: 'seq_item'
        }
      ],
      data: [],
      my_data: []
    }
  },
  computed: {
    filter_data () {
      return []
    }
  },
  methods: {
    serachInfo () {
      this.serachSam()
    },
    serachSam () {
    },
    remoteMethod1 (query) {
      if (query !== '') {
        this.my_data = this.data.filter(item => item.mg_id.toLowerCase().indexOf(query.toLowerCase()) > -1)
      } else {
        this.my_data = []
      }
    }
  },
  mounted () {
    getSampleInfo().then(res => {
      this.data = res.data.all_sample
    })
  }
}
</script>
<style scoped>

</style>
