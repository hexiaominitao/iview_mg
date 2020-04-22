<template>
  <div>
    <Button @click="val_edit = true">编辑</Button>
    <Drawer title="样本信息录入" v-model="val_edit" width="1020" :mask-closable="false">
      <Form ref="sampleInfoForm" :model="sampleInfoForm" :label-width="100">
      <Card>
        <p slot="title">受检者信息</p>
          <Row>
            <Col span='8'>
            <FormItem label="姓名" prop="patient_info.name" :rules="ruleValidate.patient_info.name">
              <Input v-model="sampleInfoForm.patient_info.name" placeholder="姓名" style="width: 200px" clearable></Input>
            </FormItem>
            </Col>
            <Col span='8'>
            <FormItem label="性别" prop="patient_info.gender" :rules="ruleValidate.patient_info.gender">
              <RadioGroup v-model="sampleInfoForm.patient_info.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
                <Radio label="不详">不详</Radio>
              </RadioGroup>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="联系方式" prop="patient_info.contact">
              <Input v-model="sampleInfoForm.patient_info.contact" placeholder="联系方式" style="width: 200px"
                maxlength="11" clearable></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span='12'>
            <FormItem label="身份证号" prop="patient_info.ID_number">
              <Input v-model="sampleInfoForm.patient_info.ID_number" placeholder="身份证号" style="width: 250px"
                @on-blur="calAge" maxlength="18" show-word-limit></Input>
            </FormItem>
            </Col>
            <Col span='12'>
            <FormItem label="年龄" prop="patient_info.age">
              <div v-if="sampleInfoForm.patient_info.ID_number">{{ sampleInfoForm.patient_info.age }}</div>
              <div v-else>
                <FormItem>
                  <Input v-model="sampleInfoForm.age" placeholder="年龄" style="width: 200px" @on-blur="setAge"></Input>
                  <RadioGroup v-model="sampleInfoForm.age_v">
                    <Radio label="岁">岁</Radio>
                    <Radio label="个月">个月</Radio>
                  </RadioGroup>
                </FormItem>
              </div>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span='4'>
            <FormItem label="民族">
              <Select v-model="sampleInfoForm.patient_info.nation" filterable style="width: 100px">
                <Option v-for="item in nation_data" :value="item.name" :key="item.index">{{ item.name }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span='7'>
            <FormItem label="籍贯">
              <Input v-model="sampleInfoForm.patient_info.origo" placeholder="籍贯" style="width: 200px"></Input>
            </FormItem>
            </Col>
            <Col span='12'>
            <FormItem label="地址" prop="patient_info.address">
              <Input v-model="sampleInfoForm.patient_info.address" placeholder="地址"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
            <FormItem label="报告寄送(纸)">
              <Select v-model="sampleInfoForm.send_methods.the_way" style="width: 60px">
                <Option value="无需">无需</Option>
                <Option value="销售">销售</Option>
                <Option value="客户">客户</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="18" v-if="sampleInfoForm.send_methods.the_way === '客户'">
            <Row>
              <Col span="8">
              <FormItem label="收件人">
                <Input v-model="sampleInfoForm.send_methods.to" placeholder="收件人" style="width: 100px" />
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="联系电话">
                <Input v-model="sampleInfoForm.send_methods.to" placeholder="联系电话" style="width: 100px" />
              </FormItem>
              </Col>
            </Row>
            <FormItem label="地址">
              <Input v-model="sampleInfoForm.send_methods.to" placeholder="地址" style="width: 240px" />
            </FormItem>
            </Col>
          </Row>
      </Card>
      <Card>
        <p slot="title">受检者就诊信息</p>
        <Row>
          <Col span='12'>
          </Col>
        </Row>
          <Row>
            <Col span='7'>
            <FormItem label="送检机构" prop="hosptial">
              <Select v-model="sampleInfoForm.hosptial" placeholder="送检医院/单位全称" filterable clearable
                style="width: 200px">
                <Option v-for="item in hospitals" :value="item.name" :key="item.id">{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span='6'>
            <FormItem label="科室" prop="room">
              <Input v-model="sampleInfoForm.room" placeholder="科室"></Input>
            </FormItem>
            </Col>
            <Col span='6'>
            <FormItem label="送检医生" prop="doctor">
              <Input v-model="sampleInfoForm.doctor" placeholder="医生姓名"></Input>
            </FormItem>
            </Col>
            <Col span='5'>
            <FormItem label="门诊/住院号" prop="outpatient_id">
              <Input v-model="sampleInfoForm.outpatient_id" placeholder="输入门诊号/住院号"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span='8'>
            <FormItem label="肿瘤类型" prop="cancer_d">
              <Select v-model="sampleInfoForm.cancer_d" filterable allow-create clearable @on-create="cancerAdd"
                    style="width: 160px">
                    <Option v-for="item in cancers" :value="item.name" :key="item.name">{{ item.name }}
                    </Option>
                  </Select>
            </FormItem>
            </Col>
            <Col span='8'>
            <FormItem label="原发部位" prop="original">
              <Input v-model="sampleInfoForm.original" placeholder="原发部位" style="width: 200px" />
            </FormItem>
            </Col>
            <Col span='8'>
            <FormItem label="转移部位" prop="metastasis">
              <Input v-model="sampleInfoForm.metastasis" placeholder="转移部位" style="width: 200px" />
            </FormItem>
            </Col>
          </Row>
          <FormItem label="病理诊断">
            <Row>
              <Col span="8">
              <FormItem prop="pathological">
                <Input v-model="sampleInfoForm.pathological" placeholder="病理诊断" />
              </FormItem>
              </Col>
              <Col span="2" style="text-align: center">日期</Col>
              <Col span="6">
              <FormItem prop="pathological_date">
                <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.pathological_date">
                </DatePicker>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="病理号" prop="pnumber">
                <Input v-model="sampleInfoForm.pnumber" placeholder="病理号" style="width: 160px" />
              </FormItem>
              </Col>
            </Row>
          </FormItem>
      </Card>
      <Card>
        <p slot="title">受检者目前治疗方案</p>
          <FormItem label="治疗信息">
            <Row>
              <Col span="6">
              <FormItem label="靶向治疗">
                <Select v-model="sampleInfoForm.targeted_info.is_treat" style="width: 60px">
                  <Option value="false">无</Option>
                  <Option value="未知">未知</Option>
                  <Option value="有">有</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="2" v-if="val_target1">
              <Button type="success" size="small" @click="targetedInfoAdd">添加</Button>
              </Col>
              <Col span="16" v-if="val_target1">
              <FormItem v-for="(item, index) in sampleInfoForm.targeted_info.items" :key="index">
                <Row>
                  <Col span="18">
                    <FormItem label="药物名称" prop='item.name'>
                  <Input v-model="item.name" placeholder="治疗效果" style="width: 200px" />
                </FormItem>
                <FormItem label="起止时间" prop='item.end_time' >
                  <DatePicker type="daterange" split-panels placeholder="选择时间段" v-model="item.treat_date">
                  </DatePicker>
                </FormItem>
                <FormItem label="治疗效果" prop='item.effect'>
                  <Input v-model="item.effect" placeholder="治疗效果" style="width: 200px" />
                </FormItem>
                  </Col>
                  <Col span="6">
                    <Button size="small" type="error" @click="targetedInfoRemove(index)">删除</Button>
                  </Col>
                </Row>
                <br/>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
              <FormItem label="化疗治疗">
                <Select v-model="sampleInfoForm.chem_info.is_treat" style="width: 60px">
                  <Option value="false">无</Option>
                  <Option value="未知">未知</Option>
                  <Option value="有">有</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="2" v-if="val_chem1">
              <Button type="success" size="small"  @click="chemInfoAdd">添加</Button>
              </Col>
              <Col span="16" v-if="val_chem1">
              <FormItem v-for="(item, index) in sampleInfoForm.chem_info.items" :key="index">
                <Row>
                  <Col span="18">
                    <FormItem label="药物名称" prop='item.name'>
                  <Input v-model="item.name" placeholder="治疗效果" style="width: 200px" />
                </FormItem>
                <FormItem label="起止时间" prop='item.end_time' >
                  <DatePicker type="daterange" split-panels placeholder="选择时间段" v-model="item.treat_date">
                  </DatePicker>
                </FormItem>
                <FormItem label="治疗效果" prop='item.effect'>
                  <Input v-model="item.effect" placeholder="治疗效果" style="width: 200px" />
                </FormItem>
                  </Col>
                  <Col span="6">
                    <Button size="small" type="error" @click="chemInfoRemove(index)">删除</Button>
                  </Col>
                </Row>
                <br/>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
              <FormItem label="放疗治疗">
                <Select v-model="sampleInfoForm.radio_info.is_treat" style="width: 60px">
                  <Option value="false">无</Option>
                  <Option value="未知">未知</Option>
                  <Option value="有">有</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="2" v-if="val_radio1">
              <Button type="success" size="small"  @click="radioInfoAdd">添加</Button>
              </Col>
              <Col span="16" v-if="val_radio1">
              <FormItem v-for="(item, index) in sampleInfoForm.radio_info.items" :key="index">
                <Row>
                  <Col span="18">
                    <FormItem label="药物名称" prop='item.name'>
                  <Input v-model="item.name" placeholder="治疗效果" style="width: 200px" />
                </FormItem>
                <FormItem label="起止时间" prop='item.end_time' >
                  <DatePicker type="daterange" split-panels placeholder="选择时间段" v-model="item.treat_date">
                  </DatePicker>
                </FormItem>
                <FormItem label="治疗效果" prop='item.effect'>
                  <Input v-model="item.effect" placeholder="治疗效果" style="width: 200px" />
                </FormItem>
                  </Col>
                  <Col span="6">
                    <Button size="small" type="error" @click="radioInfoRemove(index)">删除</Button>
                  </Col>
                </Row>
                <br/>
              </FormItem>
              </Col>
            </Row>
          </FormItem>
      </Card>
      <Card>
        <p slot="title">受检者家族史及吸烟史</p>
          <Row>
            <Col span="6">
            <FormItem label="家族史">
              <Select v-model="sampleInfoForm.family_info.is_treat" style="width: 60px">
                <Option value="false">无</Option>
                <Option value="有">有</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="2" style="text-align: center" v-if="val_famil">
            <Button type="success" size="small"  @click="familyAdd">添加</Button>
            </Col>
            <Col span="16" v-if="val_famil">
            <FormItem v-for="(item, index) in sampleInfoForm.family_info.items" :key="index">
              <Row>
                <Col span='12'>
                <FormItem label="血亲" prop='item.relationship' :label-width="40">
                  <Input v-model="item.relationship" placeholder="血亲" style="width: 80px" />
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem label="年龄" prop='item.age' :label-width="40">
                  <Input v-model="item.age" placeholder="年龄" style="width: 80px" />
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="20">
                <FormItem label="疾病" prop='item.diseases' :label-width="40">
                  <Input v-model="item.diseases" placeholder="疾病" style="width: 240px" />
                </FormItem>
                </Col>
                <Col span="4">
                <Button type="error" size="small"  @click="familyRemove(index)">删除</Button>
                </Col>
              </Row>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="吸烟史">
              <Row>
                <Col span="6">
                <Select v-model="sampleInfoForm.smoke_info.is_smoke" style="width: 60px">
                  <Option value="无">无</Option>
                  <Option value="未知">未知</Option>
                  <Option value="有">有</Option>
                </Select>
                </Col>
                <Col span="18" v-if="sampleInfoForm.smoke_info.is_smoke === '有'">
                <Input v-model="sampleInfoForm.smoke_info.smoke" placeholder="吸烟时间" style="width: 80px" /> 年
                </Col>
              </Row>
            </FormItem>
          </Row>
      </Card>
      <Card>
        <p slot="title">样本类型和数量</p>
        <Row>
          <Col span="2">
          <Button type="success" size="small"  @click="sampleAdd">添加样本</Button>
          </Col>
          <Col span="20">
            <FormItem v-for="(item, index) in sampleInfoForm.samplinfos.items" :key="index">
              <Row>
                <Col span="8">
                <FormItem label="样本类型" prop="item.sample_type">
                  <Select v-model="item.sample_type" style="width: 120px" clearable>
                    <Option v-for="(item_type, index_type) in sampleType" :key="index_type" :value="item_type.name">{{ item_type.name }}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="样本数量">
                  <Input v-model="item.counts" style="width: 100px"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="采样方式">
                  <Select v-model="item.mth" filterable allow-create clearable @on-create="methodAdd"
                    style="width: 120px">
                    <Option v-for="item_m in mth_type" :value="item_m.name" :key="item_m.name">{{ item_m.name }}
                    </Option>
                  </Select>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10">
                <FormItem label="采样部位" prop='item.mth_position'>
                  <Input v-model="item.mth_position" placeholder="采样部位" style="width: 180px" />
                </FormItem>
                </Col>
                <Col span="10">
                <FormItem label="采样时间" prop='item.Tytime'>
                  <DatePicker type="date" placeholder="选择时间" v-model="item.Tytime">
                  </DatePicker>
                </FormItem>
                </Col>
                <Col span="4">
                <Button size="small" type="error" @click="sampleRemove(index)">删除</Button>
                </Col>
              </Row>
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card>
        <p sloat="title">申请检测项目</p>
            <FormItem label="检测项目">
                <Select v-model="sampleInfoForm.seq_type" multiple filterable>
                  <Option v-for="item in seq_items" :value="item.name" :key="item.name">{{ item.name }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="备注" prop="note">
          <Input v-model="sampleInfoForm.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
            placeholder="输入些什么"></Input>
        </FormItem>
      </Card>
      <Button @click="submit">提交</Button>
      <Button @click="val_edit = false">关闭</Button>
      </Form>
    </Drawer>
  </div>
</template>
<script>
import {
  getrSampleRecordConfig
} from '@/api/sample_record'
export default {
  name: 'sample_info_rec',
  data () {
    return {
      val_edit: false,
      test_date: '',
      sample_types: [],
      sample_type: [],
      cancers: [],
      seq_items: [],
      loading_type: false,
      mth_type: [{
        name: '手术'
      },
      {
        name: '穿刺'
      },
      {
        name: '抽血'
      }
      ],
      hospitals: [],
      sampleInfoForm: {
        age: '',
        age_v: '岁',
        patient_info: {
          name: '',
          age: '',
          gender: '',
          nation: '',
          origo: '',
          contact: '',
          ID_number: '',
          address: ''
        },
        mg_id: '',
        pi_name: '',
        sales: '',
        req_mg: '',
        outpatient_id: '',
        doctor: '',
        hosptial: '',
        room: '',
        pnumber: '',
        cancer_d: '',
        original: '',
        metastasis: '',
        pathological: '',
        pathological_date: '',
        seq_type: [],
        samplinfos: {
          items: [{
            sample_type: '',
            mth: '',
            mth_position: '',
            Tytime: '',
            counts: ''
          }]
        },
        note: '',
        seq_items: [],
        send_methods: {
          the_way: '',
          to: '',
          phone_n: '',
          addr: ''
        },
        family_info: {
          is_treat: '',
          items: [{
            relationship: '',
            age: '',
            diseases: ''
          }]
        },
        targeted_info: {
          is_treat: '',
          items: [{
            name: '',
            treat_date: '',
            effect: ''
          }]
        },
        chem_info: {
          is_treat: '',
          items: [{
            name: '',
            treat_date: '',
            effect: ''
          }]
        },
        radio_info: {
          is_treat: '',
          items: [{
            name: '',
            treat_date: '',
            effect: ''
          }]
        },
        send_method: {
          the_way: '',
          to: '',
          phone_n: '',
          addr: ''
        },
        smoke_info: {
          is_smoke: '',
          smoke: ''
        }
      },
      ruleValidate: {
        patient_info: {
          name: [{
            'required': true,
            message: '请填写姓名',
            trigger: 'blur'
          }],
          gender: [{
            required: true,
            message: '请选择一个性别',
            trigger: 'change'
          }]
        }
      },
      nation_data: [{
        id: 1,
        name: '汉族'
      },
      {
        id: 57,
        name: '未知'
      },
      {
        id: 2,
        name: '蒙古族'
      },
      {
        id: 3,
        name: '回族'
      },
      {
        id: 4,
        name: '藏族'
      },
      {
        id: 5,
        name: '维吾尔族'
      },
      {
        id: 6,
        name: '苗族'
      },
      {
        id: 7,
        name: '彝族'
      },
      {
        id: 8,
        name: '壮族'
      },
      {
        id: 9,
        name: '布依族'
      },
      {
        id: 10,
        name: '朝鲜族'
      },
      {
        id: 11,
        name: '满族'
      },
      {
        id: 12,
        name: '侗族'
      },
      {
        id: 13,
        name: '瑶族'
      },
      {
        id: 14,
        name: '白族'
      },
      {
        id: 15,
        name: '土家族'
      },
      {
        id: 16,
        name: '哈尼族'
      },
      {
        id: 17,
        name: '哈萨克族'
      },
      {
        id: 18,
        name: '傣族'
      },
      {
        id: 19,
        name: '黎族'
      },
      {
        id: 20,
        name: '傈僳族'
      },
      {
        id: 21,
        name: '佤族'
      },
      {
        id: 22,
        name: '畲族'
      },
      {
        id: 23,
        name: '高山族'
      },
      {
        id: 24,
        name: '拉祜族'
      },
      {
        id: 25,
        name: '水族'
      },
      {
        id: 26,
        name: '东乡族'
      },
      {
        id: 27,
        name: '纳西族'
      },
      {
        id: 28,
        name: '景颇族'
      },
      {
        id: 29,
        name: '柯尔克孜族'
      },
      {
        id: 30,
        name: '土族'
      },
      {
        id: 31,
        name: '达翰尔族'
      },
      {
        id: 32,
        name: '么佬族'
      },
      {
        id: 33,
        name: '羌族'
      },
      {
        id: 34,
        name: '布朗族'
      },
      {
        id: 35,
        name: '撒拉族'
      },
      {
        id: 36,
        name: '毛南族'
      },
      {
        id: 37,
        name: '仡佬族'
      },
      {
        id: 38,
        name: '锡伯族'
      },
      {
        id: 39,
        name: '阿昌族'
      },
      {
        id: 40,
        name: '普米族'
      },
      {
        id: 41,
        name: '塔吉克族'
      },
      {
        id: 42,
        name: '怒族'
      },
      {
        id: 43,
        name: '乌孜别克族'
      },
      {
        id: 44,
        name: '俄罗斯族'
      },
      {
        id: 45,
        name: '鄂温克族'
      },
      {
        id: 46,
        name: '德昂族'
      },
      {
        id: 47,
        name: '保安族'
      },
      {
        id: 48,
        name: '裕固族'
      },
      {
        id: 49,
        name: '京族'
      },
      {
        id: 50,
        name: '塔塔尔族'
      },
      {
        id: 51,
        name: '独龙族'
      },
      {
        id: 52,
        name: '鄂伦春族'
      },
      {
        id: 53,
        name: '赫哲族'
      },
      {
        id: 54,
        name: '门巴族'
      },
      {
        id: 55,
        name: '珞巴族'
      },
      {
        id: 56,
        name: '基诺族'
      }
      ]
    }
  },
  computed: {
    sampleType () {
      const list = this.sample_types.map(item => {
        return { name: item.name }
      })
      return list
    },
    val_target1 () {
      if (this.sampleInfoForm.targeted_info.is_treat === '有') {
        return true
      } else {
        return false
      }
    },
    val_chem1 () {
      if (this.sampleInfoForm.chem_info.is_treat === '有') {
        return true
      } else {
        return false
      }
    },
    val_radio1 () {
      if (this.sampleInfoForm.radio_info.is_treat === '有') {
        return true
      } else {
        return false
      }
    },
    val_famil () {
      if (this.sampleInfoForm.family_info.is_treat === '有') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    setAge () {
      this.sampleInfoForm.patient_info.age = this.sampleInfoForm.age + this.sampleInfoForm.age_v
    },
    calAge () {
      const id_card = this.sampleInfoForm.patient_info.ID_number
      const age = this.getAge(id_card)
      // if (age < 1) {c_age = 12}
      this.sampleInfoForm.patient_info.age = age
    },
    getAge (identityCard) {
      var len = (identityCard + '').length
      if (len === 0) {
        return 0
      } else {
        if ((len !== 15) && (len !== 18)) {
          return 0
        }
      }
      var strBirthday = ''
      if (len === 18) {
        strBirthday = identityCard.substr(6, 4) + '/' + identityCard.substr(10, 2) + '/' + identityCard.substr(12, 2)
      }
      if (len === 15) {
        strBirthday = '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(
          10, 2)
      }
      // 时间字符串里，必须是“/”
      var birthDate = new Date(strBirthday)
      var nowDateTime = new Date()
      var age = nowDateTime.getFullYear() - birthDate.getFullYear()
      // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() &&
            nowDateTime.getDate() < birthDate.getDate())) {
        age--
      }
      if (age < 1) {
        var diff = Math.abs(nowDateTime.getTime() - birthDate.getTime())
        age = parseInt(diff / (1000 * 60 * 60 * 24 * 30)) + '个月'
      } else {
        age = age + '岁'
      }
      return age
    },
    targetedInfoAdd () {
      this.index++
      this.sampleInfoForm.targeted_info.items.push({
        name: '',
        treat_date: '',
        effect: ''
      })
    },
    targetedInfoRemove (index) {
      this.sampleInfoForm.targeted_info.items.splice(index, index)
    },
    chemInfoAdd () {
      this.index++
      this.sampleInfoForm.chem_info.items.push({
        name: '',
        treat_date: '',
        effect: ''
      })
    },
    chemInfoRemove (index) {
      this.sampleInfoForm.chem_info.items.splice(index, index)
    },
    radioInfoAdd () {
      this.index++
      this.sampleInfoForm.radio_info.items.push({
        name: '',
        treat_date: '',
        effect: ''
      })
    },
    radioInfoRemove (index) {
      this.sampleInfoForm.radio_info.items.splice(index, index)
    },
    familyAdd () {
      this.index++
      this.sampleInfoForm.family_info.items.push({
        relationship: '',
        age: '',
        diseases: ''
      })
    },
    familyRemove (index) {
      this.sampleInfoForm.family_info.items.splice(index, index)
    },
    sampleAdd () {
      this.index++
      this.sampleInfoForm.samplinfos.items.push({
        sample_type: '',
        mth: '',
        mth_position: '',
        Tytime: '',
        counts: ''
      })
    },
    sampleRemove (index) {
      this.sampleInfoForm.samplinfos.items.splice(index, index)
    },
    methodAdd (val) {
      this.mth_type.push({
        name: val
      })
    },
    cancerAdd (val) {
      this.cancers.push({
        name: val
      })
    },
    getSHT () {
      getrSampleRecordConfig().then(res => {
        this.hospitals = res.data.hospital
        this.sample_types = res.data.type
        this.cancers = res.data.cancers
        this.seq_items = res.data.seq_items
      })
    },
    getSampleType (query) {
      if (query !== '') {
        this.loading_type = true
        setTimeout(() => {
          this.loading_type = false
          const list = this.sample_types.map(item => {
            return {
              value: name
            }
          })
          this.sample_type = list.filter(item => item.value.indexOf(query) > -1)
        }, 200)
      } else {
        this.sample_type = []
      }
    },
    submit () {
      console.log(this.sampleInfoForm.samplinfos)
    }
  },
  mounted () {
    this.getSHT()
  }
}

</script>
