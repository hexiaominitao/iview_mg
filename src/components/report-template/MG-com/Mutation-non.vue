<template>
  <div>
    <div class="title">临床意义尚不明确的变异列表(Ⅲ类变异)：</div>
    <div class="table">
      <div class="thead">
        <div class='gene'>基因</div>
        <div class='mutation'>变异类型</div>
        <div class='exon'>外显子</div>
        <div class="dna">cDNA改变</div>
        <div class="acid">氨基酸改变</div>
        <div class='pecent'>丰度</div>
      </div>
      <div v-if="a">
        <div class='tbody tbody-one'>
          <div class='gene'>基因</div>
          <div class='mutation'>变异类型</div>
          <div class='exon'>外显子</div>
          <div class="dna">cDNA改变</div>
          <div class="acid">氨基酸改变</div>
          <div class='pecent'>丰度</div>
        </div>
        <div class='tbody'>
          <div class='gene'>基因</div>
          <div class='mutation'>变异类型</div>
          <div class='exon'>外显子</div>
          <div class="dna">cDNA改变</div>
          <div class="acid">氨基酸改变</div>
          <div class='pecent'>丰度</div>
        </div>
      </div>
      <div v-else
          class="tbody-none">该样本未检出临床意义尚不明确的变异（III类变异）。</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MutationNon',
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
  margin: 1% auto;
  font: 700 10pt "微软雅黑";
  text-align: center;
  /* border-bottom: solid 1px rgb(55,96,146); */
}

.tbody-none {
  margin: 1% auto;
  font: 400 10pt "微软雅黑";
  text-align: center;
  border-top: solid 0.5px rgb(55, 96, 146);
}

.tbody {
  font: 400 10pt "微软雅黑";
  margin: 1% auto;
  padding-top: 1%;
  border-top: dashed 1px rgb(55, 96, 146);
  text-align: center;
}

.tbody-one{
  border-top: solid 0.5px rgb(55, 96, 146);
}

.gene,
.exon {
  float: left;
  width: 10%;
}

.mutation {
  float: left;
  width: 20%;
}

.dna,
.acid {
  float: left;
  width: 25%;
}
</style>
