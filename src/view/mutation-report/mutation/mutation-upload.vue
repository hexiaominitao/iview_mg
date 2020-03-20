<template>
  <div>
    <Row gutter="16" class="heard">
      <Col span="5"><Input search enter-button placeholder="输入样本编号" /></Col>
      <Col span="3">
      <Select v-model="model1">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
    </Row>
    <Table :columns="columns13" :data="data5" border></Table>
  </div>
</template>
<script>
export default {
  name: 'mutation-upload',
  data () {
    return {
      columns13: [{
        title: 'Date',
        key: 'date',
        resizable: true,
        width: 180
      },
      {
        title: 'Name',
        key: 'name',
        resizable: true,
        width: 180
      },
      {
        title: 'Age',
        key: 'age',
        resizable: true,
        width: 180
      },
      {
        title: 'Address',
        key: 'address'
      }
      ],
      data5: [{
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
      },
      {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      },
      {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      },
      {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }
      ]
    }
  }
}

</script>
<style>
  .heard {
    margin-bottom: 2%;
  }

</style>
