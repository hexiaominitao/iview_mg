<template>
<div>
  <Button @click="add_val = true">添加用户</Button>
  <Table border :columns='user_col' :data="all_user">
    <!-- <template slot-scope="{ row, index }" slot="role">
        <div v-if="row.edit_able">
          <Select v-model="sampleInfoForm.seq_type" multiple filterable>
              <Option v-for="item in seq_items" :value="item.name" :key="item.name">{{ item.name }}
              </Option>
            </Select>
        </div>
        <div v-else>{{ row.mg_id }}</div>
      </template> -->
      <template slot-scope="{ row, index }" slot="action">
        <Button type="info" size="small" @click="editRole(index)">编辑</Button>
      </template>
  </Table>
  <Drawer v-model="add_val" title="添加用户" width="520" :mask-closable="false">
    <Form>
      <FormItem label="电子邮件">
        <Input type='email' v-model="mail" placeholder="电子邮件">
          <span slot="append">@maijinggene.com</span>
        </Input>
      </FormItem>
      <FormItem label="角色" >
                  <Select v-model="role" clearable>
                    <Option v-for="(item_type, index_type) in roles" :key="index_type" :value="item_type.name">
                      {{ item_type.name }}</Option>
                  </Select>
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
import { getUserData, addUser, getRole } from '@/api/admin'
export default {
  name: 'admin-user',
  data () {
    return {
      add_val: false,
      edit_user: false,
      role: '',
      name: '',
      passwd: '',
      roles: [],
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
        },
        {
          title: '权限',
          key: 'roles'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  methods: {
    submit () {
      addUser(this.name, this.mail + '@maijinggene.com', this.passwd, this.role).then(res => {
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
    },
    getRoles () {
      getRole().then(res => {
        this.roles = res.data.roles
      })
    },
    editRole (index) {
      this.edit_user = true
    }

  },
  mounted () {
    this.getUser()
    this.getRoles()
  }
}
</script>
