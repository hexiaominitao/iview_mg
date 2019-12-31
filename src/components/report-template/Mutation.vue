<template>
  <div>
    <m-gpage :page="page" :total="total">
      <div class="content">
        <mutation-table></mutation-table>
        <br>
        <mutation-table></mutation-table>
        <br>
        <mutation-non></mutation-non>
      </div>
    </m-gpage>
    <m-gpage page='4' total="17">
      <div class="content">
        <gene-card></gene-card>
      </div>
    </m-gpage>
    <m-gpage page='5' total="17">
      <div class="content">
      </div>
    </m-gpage>
  </div>
</template>
<script>
import MGpage from './MG-com/MGpage.vue'
import MutationTable from './MG-com/Mutation-table.vue'
import MutationNon from './MG-com/Mutation-non.vue'
import GeneCard from './MG-com/Gene-card.vue'
import TestPage from './MG-com/TestPage.vue'
export default {
  name: 'Mutation',
  components: {
    MGpage,
    MutationTable,
    MutationNon,
    GeneCard,
    TestPage
  },
  data () {
    return {
      total: 17,
      page: 3
    }
  }
}

</script>
<style scoped>
  .content {
    margin: auto 6%;
    margin-bottom: 2cm;
  }

</style>style
