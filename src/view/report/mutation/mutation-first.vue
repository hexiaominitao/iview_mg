<template>
  <div>
    <Input type="text" v-model="data_test"></Input>
  </div>
</template>
<script>
export default {
  name: 'input_test',
  data () {
    return {
      data_test: ''
    }
  },
  mounted () {
    console.log('挂载')
  }
}
</script>
