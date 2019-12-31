<template>
  <div>
    <Card class="page">
      <div id='content'>
        <div id='content-header'>
          <div id='content-header-left'>Content</div>
          <div id='content-header-right'>目录</div>
        </div>
        <div id='content-list'>
          <div class='content-row-one'>
            <div class='content-t-one'>检测总览</div>
            <div class="content-c-one">基本信息 | 检测项目 | 结果小结</div>
          </div>
          <hr>
          <div class='content-row'>
            <div class="content-t">检测结果</div>
            <div class="content-c">
              <div>1. 体细胞变异及其解读</div>
              <div>2. 当前癌种NCCN指南涵盖基因结果汇总</div>
              <div>3. 免疫治疗相关检测结果汇总</div>
              <div>4. 化疗药物代谢相关SNP结果汇总</div>
              <div>5. 基因拷贝数变异分布图</div>
            </div>
          </div>
          <hr>
          <div class='content-row-one'>
            <div class='content-t-one'>结果解读</div>
            <div class='content-c-one'>综合解读 | 特殊说明 | 进一步检测建议</div>
          </div>
          <hr>
          <div class='content-row'>
            <div class="content-t">附录</div>
            <div class='content-c'>
              <div>附录A: 样本主要质控结果</div>
              <div>附录B: 检测方法和局限性</div>
              <div>附录C: 基因列表</div>
              <div>附录D: 参考文献</div>
            </div>
          </div>
        </div>
        <hr>
        <div id='content-footer'>
          <div id='content-footer-left'><img :src="weChat" key="we-chat" id='content-footer-img'></div>
          <div id='content-footer-right'>
            <div id='content-footer-text'>
              <div id='company'>广州迈景基因医学检验实验室</div>
              <div>地址: 广州国际生物岛螺旋四路9号4栋五层A501单元</div>
              <div>电话: 020-89637656 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮编:510300</div>
              <div>邮箱: Market@maijinggene.com</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import weChat from '@/assets/images/wechat.jpg'
export default {
  name: 'Contents',
  data () {
    return {
      weChat
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

  #content {
    margin: 10% 10%;
  }

  #content-header {
    height: 80px;
    margin: 0 0 15%;
  }

  #content-header-left {
    float: left;
    margin: auto;
    font: 700 24pt/80px "微软雅黑";
    color: aliceblue;
    text-align: center;
    background: rgb(55, 96, 146);
    width: 50%;
    height: 80px;
  }

  #content-header-right {
    float: left;
    margin: auto;
    font: 700 24pt/80px "微软雅黑";
    color: black;
    text-align: center;
    background: rgb(217, 217, 217);
    width: 50%;
    height: 80px;
  }

  #content-footer {
    margin-top: 15%;
  }

  #content-footer-text {
    margin: 7% 14%
  }

  #content-footer-img {
    margin: 11% 9%
  }

  #content-footer-left {
    float: left;
    margin: auto;
    text-align: center;
    background: rgb(217, 217, 217);
    ;
    width: 35%;
    height: 140px;
  }

  #content-footer-right {
    float: left;
    margin: auto;
    font: 400 9pt/20px "微软雅黑";
    color: rgb(255, 255, 255);
    text-align: left;
    background: rgb(55, 96, 146);
    width: 65%;
    height: 140px;
  }

  #company {
    font: 400 10.5pt/24px "微软雅黑";
  }

  /* #content-list{
float: left;
} */

  .content-row-one {
    margin: 3% auto;
  }

  .content-t-one {
    float: left;
    width: 16%;
    text-align: center;
    margin: auto;
    font: 700 12pt/30px '微软雅黑';
  }

  .content-c-one {
    margin: auto 0 auto 55%;
    font: 400 10.5pt/30px '微软雅黑';
  }

  .content-row {
    margin: 3% auto;
  }

  .content-t {
    float: left;
    width: 16%;
    text-align: center;
    margin: auto;
    font: 700 12pt/130px '微软雅黑';
  }

  .content-c {
    margin: auto 0 auto 55%;
    font: 400 10.5pt/30px '微软雅黑';
  }

</style>
