<template>
  <div class="add-form">
    <Form :model="formItem" :label-width="100">
      <FormItem label="报告类型">
        <Input v-model="formItem.name" placeholder="报告类型"></Input>
      </FormItem>
      <FormItem label="检测内容">
        <Input v-model="formItem.seq_content" placeholder="检测内容"></Input>
      </FormItem>
      <FormItem label="结果详情">
        <Input v-model="formItem.gene_detial" placeholder="结果详情"></Input>
      </FormItem>
      <FormItem label="检测方法">
        <Input v-model="formItem.method" placeholder="检测方法"></Input>
      </FormItem>
      <FormItem label="局限性">
        <Input v-model="formItem.limit" placeholder="局限性"></Input>
      </FormItem>
    </Form>
    <Button type="primary" @click="saveTemplate">保存</Button>
  </div>
</template>
<script>
import { setTemplate } from '@/api/admin'
export default {
  name: 'admin_template_add',
  data () {
    return {
      newTemplate: {
        name: '',
        seq_content: '',
        gene_detial: '',
        method: '',
        limit: ''
      }
    }
  },
  computed: {
    formItem () {
      return this.newTemplate
    }
  },
  methods: {
    saveTemplate () {
      const templates = this.formItem
      console.log(templates)
      setTemplate(templates).then(res => {
        this.$Message.info('保存成功')
      })
    }
  }
}

</script>
<style scoped>
  .add-form {
    width: 30%;
    margin-top: 20px;
  }
</style>
