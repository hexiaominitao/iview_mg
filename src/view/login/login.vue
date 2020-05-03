<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-company"><b class="com">迈景</b>报告自动化系统</div>
    <div class="login-slogan">让繁琐的工作简单化</div>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        console.log(res)
        this.$router.push({
          name: this.$config.homeName
        })
      })
    }
  }
}
</script>

<style>

</style>
