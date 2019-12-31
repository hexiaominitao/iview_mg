<template>
  <div ref="page">
    <Card class="page">
      <div class='page-header'>
        <img :src="mgLogo" key="mg-logo" class='logo'>
        <div class='rep-code'>报告编号:MG1976840195</div>
        <div class='rep-date'>报告日期:2019-10-09</div>
        <div class="rep-page">{{ page }}/{{ total }}</div>
      </div>
      <slot></slot>
      <div class='page-footer'>
        <p class="page-footer-text">本报告及其结果仅供医生参考，不作为临床诊断依据。</p>
      </div>
    </Card>
  </div>
</template>
<script>
import mgLogo from '@/assets/images/mg_v.png'
export default {
  name: 'MGpage',
  props: ['page', 'total'],
  data () {
    return {
      mgLogo
    }
  },
  mounted () {
    console.log('高度=' + window.getComputedStyle(this.$refs.page).height)
  }
}

</script>
<style scoped>
  .page {
    width: 21cm;
    height: 29.7cm;
    margin: auto;
    border: 1px #d3d3d3 solid;
    display: flex;
    flex-direction: column;
    page-break-after: always;
  }

  .page-header {
    margin: 1% 6%;
    height: 1.2cm;
    border-bottom-style: solid;
    border-bottom-width: 1.5px;
  }

  .logo {
    float: left;
    width: 80px;
    height: 40px;
    margin-right: 12%;
  }

  .rep-code {
    float: left;
    margin-top: 3%;
    margin-right: 12%;
  }

  .rep-date {
    margin-top: 3%;
    margin-right: 12%;
    float: left;
  }

  .rep-page {
    margin-top: 3%;
    float: left;
  }

  .page-footer {
    border-top: solid 1.5px;
    position: absolute;
    left: 6%;
    right: 6%;
    bottom: 0.5cm;
    height: 0.5cm;
  }

  .page-footer-text {
    margin-left: 1%;
    font: 400 8pt '微软雅黑';
  }

  @page :left{
    @top-left{
      content: 'hello';
    }
  }
</style>
