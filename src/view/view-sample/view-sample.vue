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
          key: '迈景编号',
          width: '120'
        },
        {
          title: 'PI姓名',
          key: 'PI姓名',
          width: '120'
        },
        {
          title: '销售代表',
          key: '销售代表',
          width: '120'
        },
        {
          title: '申请单号',
          key: '申请单号',
          width: '120'
        },
        {
          title: '患者姓名',
          key: '患者姓名',
          width: '120'
        },
        {
          title: '病人性别',
          key: '病人性别',
          width: '120'
        },
        {
          title: '病人年龄',
          key: '病人年龄',
          width: '120'
        },
        {
          title: '民族',
          key: '民族',
          width: '120'
        },
        {
          title: '籍贯',
          key: '籍贯',
          width: '120'
        },
        {
          title: '检测项目',
          key: '检测项目',
          width: '120'
        },
        {
          title: '病人联系方式',
          key: '病人联系方式',
          width: '120'
        },
        {
          title: '病人身份证号码',
          key: '病人身份证号码',
          width: '120'
        },
        {
          title: '病人地址',
          key: '病人地址',
          width: '120'
        },
        {
          title: '门诊/住院号',
          key: '门诊/住院号',
          width: '120'
        },
        {
          title: '医生姓名',
          key: '医生姓名',
          width: '120'
        },
        {
          title: '医院名称',
          key: '医院名称',
          width: '120'
        },
        {
          title: '科室',
          key: '科室',
          width: '120'
        },
        {
          title: '病理号',
          key: '病理号',
          width: '120'
        },
        {
          title: '临床诊断',
          key: '临床诊断',
          width: '120'
        },
        {
          title: '诊断日期',
          key: '诊断日期',
          width: '120'
        },
        {
          title: '病理诊断',
          key: '病理诊断',
          width: '120'
        },
        {
          title: '诊断日期.1',
          key: '诊断日期.1',
          width: '120'
        },
        {
          title: '病理样本收到日期',
          key: '病理样本收到日期',
          width: '120'
        },
        {
          title: '组织大小（单位mm）',
          key: '组织大小（单位mm）',
          width: '120'
        },
        {
          title: '病理审核',
          key: '病理审核',
          width: '120'
        },
        {
          title: '标本内细胞总量',
          key: '标本内细胞总量',
          width: '120'
        },
        {
          title: '肿瘤细胞含量',
          key: '肿瘤细胞含量',
          width: '120'
        },
        {
          title: '特殊说明',
          key: '特殊说明',
          width: '120'
        },
        {
          title: '是否接受化疗',
          key: '是否接受化疗',
          width: '120'
        },
        {
          title: '开始时间',
          key: '开始时间',
          width: '120'
        },
        {
          title: '结束时间',
          key: '结束时间',
          width: '120'
        },
        {
          title: '治疗效果',
          key: '治疗效果',
          width: '120'
        },
        {
          title: '是否靶向药治疗',
          key: '是否靶向药治疗',
          width: '120'
        },
        {
          title: '开始时间.1',
          key: '开始时间.1',
          width: '120'
        },
        {
          title: '结束时间.1',
          key: '结束时间.1',
          width: '120'
        },
        {
          title: '治疗效果.1',
          key: '治疗效果.1',
          width: '120'
        },
        {
          title: '是否放疗',
          key: '是否放疗',
          width: '120'
        },
        {
          title: '起始时间',
          key: '起始时间',
          width: '120'
        },
        {
          title: '结束时间.2',
          key: '结束时间.2',
          width: '120'
        },
        {
          title: '治疗效果.2',
          key: '治疗效果.2',
          width: '120'
        },
        {
          title: '有无家族遗传疾病',
          key: '有无家族遗传疾病',
          width: '120'
        },
        {
          title: '有无其他基因疾病',
          key: '有无其他基因疾病',
          width: '120'
        },
        {
          title: '有无吸烟史',
          key: '有无吸烟史',
          width: '120'
        },
        {
          title: '项目类型',
          key: '项目类型',
          width: '120'
        },
        {
          title: '样本来源',
          key: '样本来源',
          width: '120'
        },
        {
          title: '取样时间',
          key: '取样时间',
          width: '120'
        },
        {
          title: '对照样本取样时间',
          key: '对照样本取样时间',
          width: '120'
        },
        {
          title: '采样方式',
          key: '采样方式',
          width: '120'
        },
        {
          title: '样本类型',
          key: '样本类型',
          width: '120'
        },
        {
          title: '样本类型（报告用）',
          key: '样本类型（报告用）',
          width: '120'
        },
        {
          title: '数量',
          key: '数量',
          width: '120'
        },
        {
          title: '运输方式',
          key: '运输方式',
          width: '120'
        },
        {
          title: '状态是否正常',
          key: '状态是否正常',
          width: '120'
        },
        {
          title: '样本质量评注',
          key: '样本质量评注',
          width: '120'
        },
        {
          title: '送检人',
          key: '送检人',
          width: '120'
        },
        {
          title: '送检日期',
          key: '送检日期',
          width: '120'
        },
        {
          title: '收样人',
          key: '收样人',
          width: '120'
        },
        {
          title: '收样日期',
          key: '收样日期',
          width: '120'
        },
        {
          title: '对照样本收样日期',
          key: '对照样本收样日期',
          width: '120'
        },
        {
          title: '检测日期',
          key: '检测日期',
          width: '120'
        },
        {
          title: '报告发出时间',
          key: '报告发出时间',
          width: '120'
        },
        {
          title: '报告收件人',
          key: '报告收件人',
          width: '120'
        },
        {
          title: '联系电话',
          key: '联系电话',
          width: '120'
        },
        {
          title: '联系地址',
          key: '联系地址',
          width: '120'
        },
        {
          title: '重送样本前对照样本编号',
          key: '重送样本前对照样本编号',
          width: '120'
        },
        {
          title: '备注',
          key: '备注',
          width: '120'
        },
        {
          title: '申请单、病理报告扫描件命名',
          key: '申请单、病理报告扫描件命名',
          width: '120'
        },
        {
          title: '申请单填写是否合格',
          key: '申请单填写是否合格',
          width: '120'
        },
        {
          title: '送样是否合格',
          key: '送样是否合格',
          width: '120'
        },
        {
          title: '不出报告原因',
          key: '不出报告原因',
          width: '120'
        },
        {
          title: '录入',
          key: '录入',
          width: '120'
        },
        {
          title: '审核',
          key: '审核',
          width: '120'
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
        this.my_data = this.data.filter(item => item.迈景编号.toLowerCase().indexOf(query.toLowerCase()) > -1)
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
