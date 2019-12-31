<template>
    <div>
      <Card class="page">
<div id="color-1"></div><div id="color-2"></div><div id="color-3"></div>
<div id="color-4"></div>
<img id="logo" :src="mgLogo" key="mg-logo" />
<div id='text-cover'><p id="cover-cn">肿瘤575基因检测报告</p><hr id='divider' /><p id='cover-en'>GENETIC TESTING REPORT</p></div></Card>
      <Card class="page"><b id="slogan">为更精准的治疗!</b></Card>
    </div>
</template>
<script>
import mgLogo from '@/assets/images/mg_v.png'
export default {
  name: 'Cover',
  data () {
    return {
      mgLogo
    }
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
}

#slogan {
  margin: 30%;
  position: absolute;
  top: 25%;
  transform: translateY(-30%);
  font-family: '隶书';
  font-size: 26pt;
  width: 40%;
}

#logo {
margin: 40% 46%;
  position: absolute;
  top: 10%;
transform: translateY(-80%);
width: 120px;
height: 60px;
}

#text-cover {
width: 60%;
margin: 30% 30%;
  position: absolute;
  top: 30%;
transform: translateY(-50%);
}
#cover-cn {
margin: auto 8%;
font-size: 26pt;
}
#cover-en{
margin: auto 2%;
color: red;
font-size: 22pt;
}
#divider {
width: 70%;
margin: 1% 8%;
}

#color-1{
width: 120px;
height: 220px;
margin: -2%;
background: rgb(85,142,213);
}
#color-2{
width: 120px;
height: 220px;
margin: -2%;
background: rgb(55,96,146);
}
#color-3{
width: 120px;
height: 220px;
margin: -2%;
background: rgb(166,166,166);
}
#color-4{
width: 120px;
height: 220px;
margin: -2%;
background: rgb(217,217,217);
}
</style>
