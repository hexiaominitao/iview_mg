<template>
  <div>
    <Button @click="valeu_upload = true" type="primary">文件上传</Button>
    <Button @click="getDataSample" type="success">刷新</Button>
    <Drawer title="文件上传"
            v-model="valeu_upload"
            width="720"
            :mask-closable="false">
      <Upload
        multiple
        type="drag"
        paste='true'
        :action="action_sample">
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
        <Drawer
            title="样本信息"
            v-model="value_form"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
        <Card>
          <Row>
            <Col span="12">迈景编号：{{ formValidate.mg_id }}</Col>
            <Col span="12">申请单号：{{ formValidate.req_mg }}</Col>
          </Row>
        </Card>
        <br/>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="门诊号/住院号" prop="outpatient_id">
            <Input v-model="formValidate.outpatient_id" placeholder="输入门诊号/住院号" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="医生" prop="doctor">
            <Input v-model="formValidate.doctor" placeholder="医生" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="医院" prop="hosptial">
            <Select v-model="formValidate.hosptial" placeholder="选择医院">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="科室" prop="room">
            <Input v-model="formValidate.room" placeholder="科室" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="病理号" prop="pnumber">
          <Input v-model="formValidate.pnumber" placeholder="病理号" style="width: 200px" />
        </FormItem>
        <FormItem label="癌症类型" prop="cancer_d">
          <Input v-model="formValidate.cancer_d" placeholder="癌症类型" style="width: 200px" />
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="原发部位" prop="original">
          <Input v-model="formValidate.original" placeholder="原发部位" style="width: 200px" />
        </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="转移部位" prop="metastasis">
          <Input v-model="formValidate.metastasis" placeholder="转移部位" style="width: 200px" />
        </FormItem>
          </Col>
        </Row>
        <FormItem label="病理诊断">
            <Row>
                <Col span="11">
                    <FormItem prop="pathological">
                      <Input v-model="formValidate.pathological" placeholder="病理诊断" style="width: 200px" />
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">日期</Col>
                <Col span="11">
                    <FormItem  prop="pathological_date">
                        <DatePicker type="date" placeholder="eg:2020-02-31" v-model="formValidate.pathological_date"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="治疗信息">
          <FormItem label="靶向治疗">
            <Select v-model="formValidate.targeted_info.is_treat">
                <Option value="false">无</Option>
                <Option value="未知">未知</Option>
                <Option value="有">有</Option>
            </Select>
            <div v-if="formValidate.targeted_info.is_treat">hello</div>
          </FormItem>
          <FormItem label="化疗治疗"></FormItem>
          <FormItem label="放疗治疗"></FormItem>
        </FormItem>
        <FormItem label="项目类型" prop="seq_type">
            <CheckboxGroup v-model="formValidate.seq_type">
                <Checkbox label="临床"></Checkbox>
                <Checkbox label="科研"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="样本类型" prop="sample_type">
            <Select v-model="formValidate.sample_type">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="采样方式" prop="mth">
            <Select v-model="formValidate.mth">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="采样部位" prop="mth_position">
          <Input v-model="formValidate.mth_position" placeholder="采样部位" style="width: 200px" />
        </FormItem>
        <FormItem label="采样时间" prop="Tytime">
          <DatePicker type="date" placeholder="eg:2020-02-31" v-model="formValidate.Tytime"></DatePicker>
        </FormItem>
        <FormItem label="数量" prop="sample_count">
          <Input v-model="formValidate.sample_count" placeholder="数量" style="width: 200px" />
        </FormItem>
        <FormItem label="备注" prop="note">
            <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入些什么"></Input>
        </FormItem>
    </Form>
    <div>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            <Button style="margin-right: 8px" @click="value_form = false">Cancel</Button>
    </div>
        </Drawer>
  </div>
</template>
<script>
import { getrSampleRecord } from '@/api/sample_record'
import config from '@/config'
const UploadUrl = process.env.NODE_ENV === 'development' ? config.UploadUrl.dev : config.UploadUrl.pro
export default {
  data () {
    return {
      action_sample: UploadUrl + 'sample_record/',
      columns_sample: [
        {
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
      // 编辑抽屉
      value_form: false,
      // 上传抽屉
      valeu_upload: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formValidate: {
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
        p_name: '',
        p_age: '',
        p_gender: '',
        p_nation: '',
        p_origo: '',
        p_contact: '',
        p_ID_number: '',
        p_address: '',
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
        send_methods: [],
        family_info: {
          relationship: '',
          age: '',
          diseases: ''
        },
        targeted_info: {
          is_treat: false,
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
        name: [
          { 'required': true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
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
      this.formValidate.mg_id = current_row.mg_id
      this.formValidate.req_mg = current_row.req_mg
    }
  },
  mounted () {
    this.getDataSample()
  }
}
</script>
