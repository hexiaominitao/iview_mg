<template>
<div>
<cover></cover>
<contents></contents>
<base-info></base-info>
<mutation></mutation>
</div>
</template>
<script>
import { Cover, Contents, BaseInfo, Mutation, TestPage } from '_c/report-template'
export default {
  components: {
    Cover,
    Contents,
    BaseInfo,
    Mutation,
    TestPage
  }
}
</script>
