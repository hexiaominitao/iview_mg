<template>
    <Form ref="formCustom" :model="formCustom" :label-width="80">
      <FormItem label="name" :prop="'name.sex'">
            <Input type="text" v-model="formCustom.name.sex"></Input>
        </FormItem>
        <div v-for="(item, index) in formCustom.family.items" :key="index">
          <FormItem label="name" :prop="'family.items.' + index + '.name'">
            <Input type="text" v-model="item.name"></Input>
          </FormItem>
          <FormItem label="age" :prop="'family.items.' + index + '.age'">
            <Input type="text" v-model="item.age"></Input>
          </FormItem>
        </div>
        <FormItem label="Age" prop="age">
            <Input type="text" v-model="formCustom.age" number></Input>
        </FormItem>
        <FormItem>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
  data () {
    return {
      formCustom: {
        name: {
          sex: ''
        },
        age: '',
        family: {
          items: [
            {
              name: '',
              age: ''
            }
          ]
        }
      }
    }
  },
  methods: {
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
