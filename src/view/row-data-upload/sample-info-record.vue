<template>
  <div>
    <Button @click="valeu_upload = true" type="primary">文件上传</Button>
    <Button @click="getDataSample" type="success">刷新</Button>
    <Drawer title="文件上传" v-model="valeu_upload" width="720" :mask-closable="false">
      <Upload multiple type="drag" :action="action_sample" @on-success="uploadSuccess">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传</p>
        </div>
      </Upload>
      <Button style="margin-right: 8px" @click="valeu_upload = false">关闭</Button>
    </Drawer>
    <Table border :columns="columns_sample" :data="data_sample">
      <template slot-scope="{ row }" slot="mg_id">
        <div v-if="row.edit_able">
          <Input v-model="row.mg_id" placeholder="输入迈景编号" style="width:100px"></Input>
        </div>
        <div v-else>{{ row.mg_id }}</div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit_pat_info(index)">患者信息</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit_add_info(index)">样本信息</Button>
        <Button @click="row.edit_able = true" type="primary" size="small" style="margin-right: 5px">行内编辑</Button>
        <Button @click="row.edit_able = false" type="error" size="small" style="margin-right: 5px">取消</Button>
        <!-- <Button type="error" size="small" @click="remove(index)">Delete</Button> -->
      </template>
    </Table>
    <!-- 患者信息 -->
    <Drawer title="患者信息" v-model="value_pat" width="720" :mask-closable="false" :styles="styles">
      <Card>
        <Row>
          <Col span="12">迈景编号：{{ sampleInfoForm.mg_id }}</Col>
          <Col span="12">申请单号：{{ sampleInfoForm.req_mg }}</Col>
        </Row>
      </Card>
      <br />
      <Form ref="sampleInfoForm" :model="sampleInfoForm" :rules="ruleValidate" :label-width="100">
      <FormItem label="姓名" prop="patient_info.name">
          <Input v-model="sampleInfoForm.patient_info.name" placeholder="姓名" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="身份证号" prop="patient_info.ID_number">
          <Input v-model="sampleInfoForm.patient_info.ID_number" placeholder="身份证号" style="width: 200px"
          @on-blur="calAge"
          ></Input>
        </FormItem>
        <FormItem label="年龄" prop="patient_info.age">
          <div v-if="sampleInfoForm.patient_info.ID_number">{{ sampleInfoForm.patient_info.age }}</div>
          <div v-else>
            <FormItem>
              <Input v-model="sampleInfoForm.age" placeholder="年龄" style="width: 200px"
          @on-blur="setAge"
          ></Input>
              <RadioGroup v-model="sampleInfoForm.age_v">
                <Radio label="岁">岁</Radio>
                <Radio label="个月">个月</Radio>
            </RadioGroup>
            </FormItem>
          </div>
        </FormItem>
        <FormItem label="性别" prop="patient_info.gender">
            <RadioGroup v-model="sampleInfoForm.patient_info.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
                <Radio label="不详">不详</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="民族">
          <Select v-model="sampleInfoForm.patient_info.nation" filterable style="width: 80px">
                <Option v-for="item in nation_data" :value="item.name" :key="item.index">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="籍贯">
          <Input v-model="sampleInfoForm.patient_info.origo" placeholder="籍贯" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="联系方式" prop="patient_info.contact">
          <Input v-model="sampleInfoForm.patient_info.contact" placeholder="联系方式" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="地址" prop="patient_info.address">
          <Input v-model="sampleInfoForm.patient_info.address" placeholder="地址"></Input>
        </FormItem>
      </Form>
      <Button type="primary" @click="calAge()">Submit</Button>
        <Button @click="handleReset('sampleInfoForm')" style="margin-left: 8px">Reset</Button>
        <Button style="margin-right: 8px" @click="value_pat = false">Cancel</Button>
    </Drawer>
    <!-- 样本信息 -->
    <Drawer title="样本信息" v-model="value_form" width="720" :mask-closable="false" :styles="styles">
      <Card>
        <Row>
          <Col span="12">迈景编号：{{ sampleInfoForm.mg_id }}</Col>
          <Col span="12">申请单号：{{ sampleInfoForm.req_mg }}</Col>
        </Row>
      </Card>
      <br />
      <Form ref="sampleInfoForm" :model="sampleInfoForm" :rules="ruleValidate" :label-width="100">
        <FormItem label="门诊号/住院号" prop="outpatient_id">
          <Input v-model="sampleInfoForm.outpatient_id" placeholder="输入门诊号/住院号" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="医生" prop="doctor">
          <Input v-model="sampleInfoForm.doctor" placeholder="医生" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="医院" prop="hosptial">
          <Select v-model="sampleInfoForm.hosptial" placeholder="选择医院" filterable clearable>
            <Option v-for="item in hospital" value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="科室" prop="room">
          <Input v-model="sampleInfoForm.room" placeholder="科室" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="病理号" prop="pnumber">
          <Input v-model="sampleInfoForm.pnumber" placeholder="病理号" style="width: 200px" />
        </FormItem>
        <FormItem label="癌症类型" prop="cancer_d">
          <Input v-model="sampleInfoForm.cancer_d" placeholder="癌症类型" style="width: 200px" />
        </FormItem>
        <Row>
          <Col span="12">
          <FormItem label="原发部位" prop="original">
            <Input v-model="sampleInfoForm.original" placeholder="原发部位" style="width: 200px" />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="转移部位" prop="metastasis">
            <Input v-model="sampleInfoForm.metastasis" placeholder="转移部位" style="width: 200px" />
          </FormItem>
          </Col>
        </Row>
        <FormItem label="病理诊断">
          <Row>
            <Col span="11">
            <FormItem prop="pathological">
              <Input v-model="sampleInfoForm.pathological" placeholder="病理诊断" style="width: 200px" />
            </FormItem>
            </Col>
            <Col span="2" style="text-align: center">日期</Col>
            <Col span="11">
            <FormItem prop="pathological_date">
              <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.pathological_date"></DatePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="治疗信息">
          <Row>
            <Col span="8">
            <FormItem label="靶向治疗">
              <Select v-model="sampleInfoForm.targeted_info.is_treat" style="width: 60px">
                <Option value="false">无</Option>
                <Option value="未知">未知</Option>
                <Option value="有">有</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="16">
            <FormItem v-if="val_target">
              <FormItem label="药物名称" prop='targeted_info.name'>
                <Input v-model="sampleInfoForm.targeted_info.name" placeholder="治疗效果" style="width: 200px" />
              </FormItem>
              <FormItem label="开始时间" prop='targeted_info.star_time'>
                <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.targeted_info.star_time">
                </DatePicker>
              </FormItem>
              <FormItem label="结束时间" prop='targeted_info.end_time'>
                <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.targeted_info.end_time">
                </DatePicker>
              </FormItem>
              <FormItem label="治疗效果" prop='targeted_info.effect'>
                <Input v-model="sampleInfoForm.targeted_info.effect" placeholder="治疗效果" style="width: 200px" />
              </FormItem>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <FormItem label="化疗治疗">
              <Select v-model="sampleInfoForm.chem_info.is_treat" style="width: 60px">
                <Option value="false">无</Option>
                <Option value="未知">未知</Option>
                <Option value="有">有</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="16">
            <FormItem v-if="val_chem">
              <FormItem label="药物名称" prop='chem_info.name'>
                <Input v-model="sampleInfoForm.chem_info.name" placeholder="治疗效果" style="width: 200px" />
              </FormItem>
              <FormItem label="开始时间" prop='chem_info.star_time'>
                <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.chem_info.star_time">
                </DatePicker>
              </FormItem>
              <FormItem label="结束时间" prop='chem_info.end_time'>
                <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.chem_info.end_time">
                </DatePicker>
              </FormItem>
              <FormItem label="治疗效果" prop='chem_info.effect'>
                <Input v-model="sampleInfoForm.chem_info.effect" placeholder="治疗效果" style="width: 200px" />
              </FormItem>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <FormItem label="放疗治疗">
              <Select v-model="sampleInfoForm.radio_info.is_treat" style="width: 60px">
                <Option value="false">无</Option>
                <Option value="未知">未知</Option>
                <Option value="有">有</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="16">
            <FormItem v-if="val_radio">
              <FormItem label="药物名称" prop='radio_info.name'>
                <Input v-model="sampleInfoForm.radio_info.name" placeholder="治疗效果" style="width: 200px" />
              </FormItem>
              <FormItem label="开始时间" prop='radio_info.star_time'>
                <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.radio_info.star_time">
                </DatePicker>
              </FormItem>
              <FormItem label="结束时间" prop='radio_info.end_time'>
                <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.radio_info.end_time">
                </DatePicker>
              </FormItem>
              <FormItem label="治疗效果" prop='radio_info.effect'>
                <Input v-model="sampleInfoForm.radio_info.effect" placeholder="治疗效果" style="width: 200px" />
              </FormItem>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
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
          <Button @click="familyAdd">添加</Button>
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
                  <Button @click="familyRemove(index)">删除</Button>
                </Col>
              </Row>
          </FormItem>
          </Col>
        </Row>
        <FormItem label="项目类型" prop="seq_type">
          <CheckboxGroup v-model="sampleInfoForm.seq_type">
            <Checkbox label="临床"></Checkbox>
            <Checkbox label="科研"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="样本类型" prop="sample_type">
          <Select v-model="sampleInfoForm.sample_type" style="width: 100px" >
            <Option v-for="item in sample_type" :key="item.id" value="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <Row><Col></Col></Row>
        <FormItem label="采样方式" prop="mth">
          <Select v-model="sampleInfoForm.mth">
            <Option value="穿刺">穿刺</Option>
            <Option value="手术">手术</Option>
            <Option value="其他">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="采样部位" prop="mth_position">
          <Input v-model="sampleInfoForm.mth_position" placeholder="采样部位" style="width: 200px" />
        </FormItem>
        <FormItem label="采样时间" prop="Tytime">
          <DatePicker type="date" placeholder="eg:2020-02-31" v-model="sampleInfoForm.Tytime"></DatePicker>
        </FormItem>
        <FormItem label="数量" prop="sample_count">
          <Input v-model="sampleInfoForm.sample_count" placeholder="数量" style="width: 200px" />
        </FormItem>
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
        <FormItem label="备注" prop="note">
          <Input v-model="sampleInfoForm.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
            placeholder="输入些什么"></Input>
        </FormItem>
      </Form>
      <div>
        <Button type="primary" @click="handleSubmit('sampleInfoForm')">Submit</Button>
        <Button @click="handleReset('sampleInfoForm')" style="margin-left: 8px">Reset</Button>
        <Button style="margin-right: 8px" @click="value_form = false">Cancel</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import {
  getrSampleRecord, getrSampleRecordConfig
} from '@/api/sample_record'
import config from '@/config'
const UploadUrl = process.env.NODE_ENV === 'development' ? config.UploadUrl.dev : config.UploadUrl.pro
export default {
  data () {
    return {
      action_sample: UploadUrl + 'sample_record/',
      columns_sample: [{
        title: '迈景编号',
        slot: 'mg_id'
      },
      {
        title: '申请单号',
        key: 'req_mg'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 300,
        align: 'center'
      }
      ],
      data_sample: [],
      hospital: [],
      sample_type: [],
      // 编辑抽屉
      value_form: false,
      value_pat: false,
      // 上传抽屉
      valeu_upload: false,
      // 民族
      nation_data: [
        { id: 1, name: '汉族' },
        { id: 57, name: '未知' },
        { id: 2, name: '蒙古族' },
        { id: 3, name: '回族' },
        { id: 4, name: '藏族' },
        { id: 5, name: '维吾尔族' },
        { id: 6, name: '苗族' },
        { id: 7, name: '彝族' },
        { id: 8, name: '壮族' },
        { id: 9, name: '布依族' },
        { id: 10, name: '朝鲜族' },
        { id: 11, name: '满族' },
        { id: 12, name: '侗族' },
        { id: 13, name: '瑶族' },
        { id: 14, name: '白族' },
        { id: 15, name: '土家族' },
        { id: 16, name: '哈尼族' },
        { id: 17, name: '哈萨克族' },
        { id: 18, name: '傣族' },
        { id: 19, name: '黎族' },
        { id: 20, name: '傈僳族' },
        { id: 21, name: '佤族' },
        { id: 22, name: '畲族' },
        { id: 23, name: '高山族' },
        { id: 24, name: '拉祜族' },
        { id: 25, name: '水族' },
        { id: 26, name: '东乡族' },
        { id: 27, name: '纳西族' },
        { id: 28, name: '景颇族' },
        { id: 29, name: '柯尔克孜族' },
        { id: 30, name: '土族' },
        { id: 31, name: '达翰尔族' },
        { id: 32, name: '么佬族' },
        { id: 33, name: '羌族' },
        { id: 34, name: '布朗族' },
        { id: 35, name: '撒拉族' },
        { id: 36, name: '毛南族' },
        { id: 37, name: '仡佬族' },
        { id: 38, name: '锡伯族' },
        { id: 39, name: '阿昌族' },
        { id: 40, name: '普米族' },
        { id: 41, name: '塔吉克族' },
        { id: 42, name: '怒族' },
        { id: 43, name: '乌孜别克族' },
        { id: 44, name: '俄罗斯族' },
        { id: 45, name: '鄂温克族' },
        { id: 46, name: '德昂族' },
        { id: 47, name: '保安族' },
        { id: 48, name: '裕固族' },
        { id: 49, name: '京族' },
        { id: 50, name: '塔塔尔族' },
        { id: 51, name: '独龙族' },
        { id: 52, name: '鄂伦春族' },
        { id: 53, name: '赫哲族' },
        { id: 54, name: '门巴族' },
        { id: 55, name: '珞巴族' },
        { id: 56, name: '基诺族' }
      ],
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      sampleInfoForm: {
        // test
        // name: '',
        // mail: '',
        // city: '',
        // gender: '',
        // interest: [],
        // date: '',
        // time: '',
        // desc: '',
        // test
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
        sample_type: '',
        mth: '',
        mth_position: '',
        Tytime: '',
        sample_count: '',
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
          items: [
            {
              relationship: '',
              age: '',
              diseases: ''
            }
          ]
        },
        targeted_info: {
          is_treat: '',
          name: '',
          star_time: '',
          end_time: '',
          effect: ''
        },
        chem_info: {
          is_treat: '',
          name: '',
          star_time: '',
          end_time: '',
          effect: ''
        },
        radio_info: {
          is_treat: '',
          name: '',
          star_time: '',
          end_time: '',
          effect: ''
        },
        send_method: {
          the_way: '',
          to: '',
          phone_n: '',
          addr: ''
        }
      },
      ruleValidate: {
        name: [{
          'required': true,
          message: 'The name cannot be empty',
          trigger: 'blur'
        }],
        mail: [{
          required: true,
          message: 'Mailbox cannot be empty',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: 'Incorrect email format',
          trigger: 'blur'
        }
        ],
        city: [{
          required: true,
          message: 'Please select the city',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: 'Please select gender',
          trigger: 'change'
        }],
        interest: [{
          required: true,
          type: 'array',
          min: 1,
          message: 'Choose at least one hobby',
          trigger: 'change'
        },
        {
          type: 'array',
          max: 2,
          message: 'Choose two hobbies at best',
          trigger: 'change'
        }
        ],
        date: [{
          required: true,
          type: 'date',
          message: 'Please select the date',
          trigger: 'change'
        }],
        time: [{
          required: true,
          type: 'string',
          message: 'Please select time',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: 'Please enter a personal introduction',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 20,
          message: 'Introduce no less than 20 words',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  computed: {
    val_target () {
      if (this.sampleInfoForm.targeted_info.is_treat === '有') {
        return true
      } else {
        return false
      }
    },
    val_chem () {
      if (this.sampleInfoForm.chem_info.is_treat === '有') {
        return true
      } else {
        return false
      }
    },
    val_radio () {
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
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    // 获取数据
    getDataSample () {
      getrSampleRecord(1, 10).then(res => {
        this.data_sample = res.data.sample
        console.log(res.data.data_sample)
      })
    },
    // 打开编辑框
    edit_add_info (index) {
      this.value_form = true
      const current_row = this.data_sample[index]
      this.sampleInfoForm.mg_id = current_row.mg_id
      this.sampleInfoForm.req_mg = current_row.req_mg
    },
    edit_pat_info (index) {
      this.value_pat = true
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
    uploadSuccess (response, file, fileList) {
      this.$Message.info(response.data.msg)
    },
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
        strBirthday = '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(10, 2)
      }
      // 时间字符串里，必须是“/”
      var birthDate = new Date(strBirthday)
      var nowDateTime = new Date()
      var age = nowDateTime.getFullYear() - birthDate.getFullYear()
      // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
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
    getSHT () {
      getrSampleRecordConfig().then(res => {
        this.hospital = res.data.hospital
        this.sample_type = res.data.type
      })
    }
  },
  mounted () {
    this.getDataSample()
    this.getSHT()
  }
}

</script>
