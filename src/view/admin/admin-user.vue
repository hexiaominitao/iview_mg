<template>
<div>
  <Button @click="add_val = true">添加用户</Button>
  <Table border :columns='user_col' :data="all_user"></Table>
  <Drawer v-model="add_val" title="添加用户" width="520">
    <Form>
      <FormItem label="电子邮件">
        <Input type='email' v-model="mail" placeholder="电子邮件">
          <span slot="append">@maijinggene.com</span>
        </Input>
      </FormItem>
      <FormItem label="用户名称">
        <Input v-model="name" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem label="密码">
        <Input v-model="passwd" type="password" password placeholder="请输入密码"/>
      </FormItem>
    </Form>
    <div class="demo-drawer-footer">
        <Button type="primary" @click="submit">提交</Button>
      </div>
  </Drawer>
</div>
</template>
<script>
import { getUserData, addUser } from '@/api/admin'
export default {
  name: 'admin-user',
  data () {
    return {
      add_val: false,
      name: '',
      passwd: '',
      mail: '',
      all_user: [],
      user_col: [
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '邮件地址',
          key: 'mail'
        }
      ]
    }
  },
  methods: {
    submit () {
      addUser(this.name, this.mail + '@maijinggene.com', this.passwd).then(res => {
        this.$Message.info(res.data.msg)
      })
      this.add_val = false
      this.getUser()
    },
    getUser () {
      getUserData().then(res => {
        this.all_user = res.data.users
        console.log(this.all_user)
      })
    }

  },
  mounted () {
    this.getUser()
  }
}
</script>
