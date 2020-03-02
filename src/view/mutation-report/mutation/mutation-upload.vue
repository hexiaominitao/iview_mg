<template>
  <div>
    <Row gutter="16">
      <Col span="5"><Input search enter-button placeholder="输入样本编号" /></Col>
      <Col span="3">
      <Select v-model="model1">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
    </Row>
    <p>hello</p>
  </div>
</template>
<script>
export default {
  name: 'mutation-upload'
}

</script>
<style>

</style>
