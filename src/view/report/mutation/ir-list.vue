<template>
  <div>
    <Button @click="getIrData">获取数据</Button>
    <!-- <Menu mode="horizontal" them="light" active-name="1">
      <MenuItem name='1'>IR</MenuItem>
      <MenuItem name='2'>CNV</MenuItem>
      <MenuItem name='3'>Fusion</MenuItem>
      <MenuItem name='4'>Mutation</MenuItem>
      <MenuItem name='5'>Report</MenuItem>
    </Menu> -->
    <!-- <Table border height='920' :columns='allIrCol' :data="allIrList"></Table> -->
  </div>
</template>
<script>
export default {
  name: 'ir_list',
  data () {
    return {
      allIrList: [],
      allIrCol: [{ 'title': '# locus', 'key': '# locus', 'width': 120 }, { 'title': 'type', 'key': 'type', 'width': 120 }, { 'title': 'ref', 'key': 'ref', 'width': 120 }, { 'title': 'length', 'key': 'length', 'width': 120 }, { 'title': 'genotype', 'key': 'genotype', 'width': 120 }, { 'title': 'filter', 'key': 'filter', 'width': 120 }, { 'title': 'pvalue', 'key': 'pvalue', 'width': 120 }, { 'title': 'AF', 'key': 'AF', 'width': 120 }, { 'title': 'FAO', 'key': 'FAO', 'width': 120 }, { 'title': 'coverage', 'key': 'coverage', 'width': 120 }, { 'title': 'allele_coverage', 'key': 'allele_coverage', 'width': 120 }, { 'title': 'maf', 'key': 'maf', 'width': 120 }, { 'title': 'iscn', 'key': 'iscn', 'width': 120 }, { 'title': 'confidence', 'key': 'confidence', 'width': 120 }, { 'title': 'precision', 'key': 'precision', 'width': 120 }, { 'title': 'Subtype', 'key': 'Subtype', 'width': 120 }, { 'title': 'Call', 'key': 'Call', 'width': 120 }, { 'title': 'no_call_reason', 'key': 'no_call_reason', 'width': 120 }, { 'title': 'gene', 'key': 'gene', 'width': 120 }, { 'title': 'transcript', 'key': 'transcript', 'width': 120 }, { 'title': 'location', 'key': 'location', 'width': 120 }, { 'title': 'function', 'key': 'function', 'width': 120 }, { 'title': 'codon', 'key': 'codon', 'width': 120 }, { 'title': 'exon', 'key': 'exon', 'width': 120 }, { 'title': 'protein', 'key': 'protein', 'width': 120 }, { 'title': 'coding', 'key': 'coding', 'width': 120 }, { 'title': 'sift', 'key': 'sift', 'width': 120 }, { 'title': 'polyphen', 'key': 'polyphen', 'width': 120 }, { 'title': 'grantham', 'key': 'grantham', 'width': 120 }, { 'title': 'normalizedAlt', 'key': 'normalizedAlt', 'width': 120 }, { 'title': '5000Exomes', 'key': '5000Exomes', 'width': 120 }, { 'title': 'NamedVariants', 'key': 'NamedVariants', 'width': 120 }, { 'title': 'clinvar', 'key': 'clinvar', 'width': 120 }, { 'title': 'dbsnp', 'key': 'dbsnp', 'width': 120 }, { 'title': 'dgv', 'key': 'dgv', 'width': 120 }, { 'title': 'drugbank', 'key': 'drugbank', 'width': 120 }, { 'title': 'exac', 'key': 'exac', 'width': 120 }, { 'title': 'go', 'key': 'go', 'width': 120 }, { 'title': 'pfam', 'key': 'pfam', 'width': 120 }, { 'title': 'phylop', 'key': 'phylop', 'width': 120 }, { 'title': 'Oncomine Variant Annotator v2.3', 'key': 'Oncomine Variant Annotator v2.3', 'width': 120 }, { 'title': 'MyVariantDefaultDb_hg19', 'key': 'MyVariantDefaultDb_hg19', 'width': 120 }]
    }
  },
  methods: {
    getIrData () {
    }
  },
  mounted () {
    this.getIrData()
  }
}
</script>
