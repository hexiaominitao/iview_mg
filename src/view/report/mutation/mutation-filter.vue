<template>
  <div>
    <Form>
      <FormItem label="销售代表">
        <Row>
          <Col span="4">
          <Select v-model="model11" filterable style="width: 100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="4">
            <Input style="width: 120px" maxlength="4">
            <span slot="prepend">{{ sales_code }}</span>
            </Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="是否未检测到突变">
        <RadioGroup v-model="note" style="width: 100px">
          <Radio :label="1">是</Radio>
          <Radio :label="0">否</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <hot-table :settings="hotSetting" width="1000" height="600"></hot-table>
  </div>
</template>
<script>
import { HotTable } from '@handsontable/vue'
export default {
  data () {
    return {
      hotSetting: {
        data: [
          [10, 11, 12, 13],
          [20, 11, 14, 13],
          [30, 15, 12, 13]
        ],
        colHeaders: ['Tesla', 'BWM', 'Mercedes', 'Toyota'],
        rowHeaders: true,
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
        filters: true,
        readOnly: true,
        contextMenu: { // 自定义右键菜单，可汉化，默认布尔值
          items: {
            'copy': {
              name: '复制'
            }
          }
        },
        licenseKey: 'non-commercial-and-evaluation'
        // licensKey: '4d522-5237a-55f42-6653a-d1494'
      },
      sales_code: 'MG209968',
      cityList: [{
        value: 'New York',
        label: 'New York'
      },
      {
        value: 'London',
        label: 'London'
      },
      {
        value: 'Sydney',
        label: 'Sydney'
      },
      {
        value: 'Ottawa',
        label: 'Ottawa'
      },
      {
        value: 'Paris',
        label: 'Paris'
      },
      {
        value: 'Canberra',
        label: 'Canberra'
      }
      ],
      model11: '',
      model12: []
    }
  },
  components: {
    HotTable
  }
}

</script>
