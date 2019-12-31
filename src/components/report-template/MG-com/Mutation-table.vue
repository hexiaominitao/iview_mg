<template>
  <div>
    <div class="title">具有明确临床意义的变异及解读(Ⅰ类)：</div>
    <div class="table">
      <div class="thead">
        <div class='gene'>基因变异</div>
        <div class='pecent'>丰度</div>
        <div class="mutation">变异解读</div>
        <div class="drug">靶向药物 (敏感性，证据等级)</div>
      </div>
      <div v-if="a">
        <div class='tbody tbody-one'>
          <div class='gene'>基因变异</div>
          <div class='pecent'>丰度</div>
          <div class="mutation">变异解读</div>
          <div class="drug">靶向药物 (敏感性，证据等级)</div>
        </div>
        <div class='tbody'>
          <div class='gene'>基因变异</div>
          <div class='pecent'>丰度</div>
          <div class="mutation">变异解读</div>
          <div class="drug">靶向药物 (敏感性，证据等级)</div>
        </div>
      </div>
      <div v-else
          class="tbody-none">该样本未检出具有明确临床意义的变异（I类变异）。</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MutationTable',
  data () {
    return {
      a: 1
    }
  }
}

</script>
<style scoped>
.title {
  background: rgb(217, 217, 217);
  font: 700 10.5pt "微软雅黑";
  line-height: 220%;
}

.table {
  margin: 0% auto;
  clear: both;
  border-top: solid 1.5px rgb(55, 96, 146);
  border-bottom: solid 1.5px rgb(55, 96, 146);
}

.thead {
  margin: 1% auto -1%;
  padding-bottom: 1%;
  font: 700 10pt "微软雅黑";
  text-align: center;
  border-bottom: solid 0.5px rgb(55,96,146);
}

.tbody-none {
  margin: 1% auto;
  font: 400 10pt "微软雅黑";
  text-align: center;
  padding-top: 1%;
  border-top: solid 0.5px rgb(55, 96, 146);
}

.tbody {
  font: 400 10pt "微软雅黑";
  margin: 1% auto;
  padding-top: 1%;
  border-top: dashed 1px rgb(55, 96, 146);
}

.tbody-one{
  border-top: solid 0.5px rgb(55, 96, 146);
}

.gene {
  float: left;
  width: 20%;
}

.pecent {
  float: left;
  width: 10%;
}

.mutation {
  float: left;
  width: 30%;
}
</style>
