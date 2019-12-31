<template>
<div>
 <p>Hello</p>
</div>
</template>
<script>
import { getUserData } from '@/api/admin'
export default {
  name: 'admin-user',
  data () {
    return {
      all_user: []
    }
  },
  mounted () {
    getUserData().then(res => {
      this.all_user = res.data.user
      console.log(this.all_user)
    })
  }
}
</script>
