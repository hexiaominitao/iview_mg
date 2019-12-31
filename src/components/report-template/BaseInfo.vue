<template>
  <div><m-gpage :page='page.p1' :total='total'>
    <div class="info-content">
      <div class='info-title'>基本信息</div>
      <div class='info-text'>
        <div class='row'>
          <div class="item">姓名</div>
          <div class='cell'>张三</div>
          <div class="item">性别</div>
          <div class='cell'>女</div>
          <div class="item">年龄</div>
          <div class='cell'>56岁</div>
        </div>
        <div class='row'>
          <div class="item">患者ID</div>
          <div class='cell'>442825196301022521</div>
          <div class="item">家族史</div>
          <div class='cell'>无</div>
          <div class="item">用药史</div>
          <div class='cell'>化疗</div>
        </div>
        <div class='row'>
          <div class="item">住院号</div>
          <div class='cell'>&nbsp;</div>
          <div class="item">临床诊断</div>
          <div class='cell'>乳腺癌转移</div>
          <div class="item">病理诊断</div>
          <div class='cell'>淋巴结内查见转移癌</div>
        </div>
        <div class='row'>
          <div class="item">肿瘤样本ID</div>
          <div class='cell'>MG1976840195T</div>
          <div class="item">取材部位</div>
          <div class='cell'>左锁骨上淋巴结</div>
          <div class="item">采样日期</div>
          <div class='cell'>&nbsp;</div>
        </div>
        <div class='row'>
          <div class="item">样本类型</div>
          <div class='cell'>FFPE样本</div>
          <div class="item">采样方式</div>
          <div class='cell'>手术</div>
          <div class="item">收样日期</div>
          <div class='cell'>2019-09-30</div>
        </div>
        <div class='row'>
          <div class="item">对照样本ID</div>
          <div class='cell'>MG1976840195N</div>
          <div class="item">取材部位</div>
          <div class='cell'>外周血</div>
          <div class="item">采样日期</div>
          <div class='cell'>&nbsp;</div>
        </div>
        <div class='row'>
          <div class="item">样本类型</div>
          <div class='cell'>全血</div>
          <div class="item">采样方式</div>
          <div class='cell'>抽血</div>
          <div class="item">收样时间</div>
          <div class='cell'>2019-09-30</div>
        </div>
        <div class='row'>
          <div class="item">送检医生</div>
          <div class='cell'>谢国丰</div>
          <div class="item">送检科室</div>
          <div class='cell'>放疗一科</div>
          <div class="item">送检单位</div>
          <div class='cell'>广州医科大学附属肿瘤医院</div>
        </div>
      </div>
      <p class='statement'>*本报告中的病理诊断和临床诊断信息由受检者送检时提供，
          非测结果。本报告不对这些信息的准确性负责。</p>
    <div class='info-title'>检测内容</div>
    <p class="seq-content">迈景基因泛肿瘤基因检测涵盖575个癌症机制
       和靶向治疗密切相关的基因，利用探针杂交捕获和高通量测序法，
       检测575个基因的全部编码外显子区，
       全面精准地检测肿瘤临床相关性的基因突变、扩增及重排（融合）等变异。
       详细技术说明参见《附录2:检测方法与局限性》。</p>
    </div>
  </m-gpage>
  <m-gpage :page='page.p2' :total='total'>
    <div class="info-content">
    <div class='info-title'>结果小结</div>
    <div class="info-text-re">
      <div class='row-re  '>
        <div class="item-re">检测内容</div>
        <div class='cell-re'><b>检测结果</b>
      </div>
      <div class='row-re'>
        <div class="item-re">体细胞变异</div>
        <div class='cell-re'>共检出10个体细胞变异，其中具有明确或潜在临床意义的变异有3个。</div>
      </div>
      <div class='row-re'>
        <div class="item-re">体细胞变异</div>
        <div class='cell-re'>
          <div>
            <div class="cell-gene">TP53基因</div>
            <div class="cell-mut">(p.Gly108fs) c.323_329delGTTTCCG</div>
          </div>
          <div>
            <div class="cell-gene">ARID1A基因</div>
            <div class="cell-mut">(p.Lys1862Arg) c.5585A>G</div>
          </div>
          <div>
            <div class="cell-gene">FGFR1基因</div>
            <div class="cell-mut">Amplification</div>
          </div>
        </div>
      </div>
      <div class='row-re'>
        <div class="item-re">肿瘤突变负荷（TMB）</div>
        <div class='cell-re'>4.3个突变/Mb</div></div>
      <div class='row-re'>
        <div class="item-re">微卫星不稳定性（MSI）</div>
        <div class='cell-re'>微卫星稳定型（MSS）</div></div>
      <div class='row-re'>
        <div class="item-re">PD-L1表达率</div>
        <div class='cell-re'>0%（引自免疫组化检测结果）</div></div>
      <div class='row-re'>
        <div class="item-re">胚系致病变异</div>
        <div class='cell-re'>未检测到</div></div>
      <div class='row-re'>
        <div class="item-re">样本总体质量评估</div>
        <div class='cell-re'>合格</div></div>
    </div>
    </div>
      <div class="sign"><div class='seqer'>检测者:</div><div class="checker">审核者:</div></div>
    </div>
  </m-gpage></div>
</template>
<script>
import MGpage from './MG-com/MGpage.vue'
export default {
  name: 'BaseInfo',
  data () {
    return {
      total: 17,
      page: { 'p1': 1, 'p2': 2 }
    }
  },
  components: {
    MGpage
  }
}
</script>
<style scoped>
.page {
  width: 21cm;
  height: 29cm;
  margin: 1cm auto;
  border: 1px #d3d3d3 solid;
  display: flex;
  flex-direction: column;
}

.page-header{
margin: 1% 6%;
height: 50px;
border-bottom-style:solid;
border-bottom-width: 1.5px;
}

.logo{
float: left;
width: 80px;
height:40px;
margin-right: 12%;
}

.rep-code{
float: left;
margin-top: 3%;
margin-right: 12%;
}

.rep-date{
margin-top: 3%;
margin-right: 12%;
float: left;
}

.rep-page{
margin-top: 3%;
float: left;
}

.info-content{
margin: 2% 6%;
}

.info-title{
font: 700 11pt/40px '微软雅黑';
color: aliceblue;
text-align: center;
border-radius:10px;
background: rgb(55,96,146);
width: 12%;
height: 40px;
margin-left: 1%;
}

.info-text{
margin:2% auto;
border-top-style: solid;
border-top-width: 1.5px;
border-top-color: rgb(55,96,146);
}

.info-text-re{
margin:2% auto;
border-top-style: solid;
border-top-width: 1.5px;
border-top-color: rgb(55,96,146);
}

.row{
margin-top: 3%;
}

.item{
float: left;
width: 10.8%;
font: 700 10pt '微软雅黑';
margin: 1% auto;
}

.cell{
float: left;
width: 22.5%;
font: 400 10pt '微软雅黑';
margin: 1% auto;
}

.row-re{
margin: auto;
}

.item-re{
float: left;
width: 30%;
font: 700 10pt '微软雅黑';
margin: 1% auto;
}

.cell-re{
width: 70%;
float: left;
font: 400 10pt '微软雅黑';
margin: 1% auto;
}

.cell-gene{
width: 20%;
float: left;
font: 400 10pt '微软雅黑';
margin-bottom: 1%;
}

.cell-mut{
width: 80%;
float: left;
font: 400 10pt '微软雅黑';
margin-bottom: 1%;
}

.seq-content{
margin-top: 2%;
text-indent:30px;
font: 400 10pt '微软雅黑';
}

.statement{
clear: both;
margin-bottom: 10%;
font: 400 9pt '微软雅黑';
border-top-style: solid;
border-top-width: 1.5px;
border-top-color: rgb(55,96,146);
}

.page-footer{
border-top: solid 1.5px;
position: absolute;
left: 6%;
right: 6%;
bottom: 2%;
}

.page-footer-text{
margin-left: 1%;
font: 400 8pt '微软雅黑';
}

.sign{
clear: both;
border-top-style: solid;
border-top-width: 1.5px;
border-top-color: rgb(55,96,146);
}

.seqer{
float: left;
margin-top: 5%;
margin-left: 10%;
width: 40%;
font: 700 10pt '微软雅黑';
}

.checker{
float: left;
margin-top: 5%;
width: 40%;
font: 700 10pt '微软雅黑';
}

.bot-bor{
clear: both;
border-bottom-style: solid;
border-bottom-width: 1.5px;
border-bottom-color: rgb(55,96,146);
}

.top-bot{
border-top-style: solid;
border-top-width: 1px;
border-top-color: rgb(55,96,146);
}
</style>
