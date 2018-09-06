<template>
  <div class="informain-wrap">
    <div class="informain-top">
      <CommonBack :backTitle = 'backTitle'></CommonBack>
    </div>
    <div class="informain-con">
      
    </div>
  </div>
</template>

<script>
import CommonBack from "@/components/CommonBack"

export default {
  name: 'BaseInformain',
  data () {
    return {
      backTitle: '基本信息'
    }
  },
  methods: {
    
  },
  components: {
    CommonBack
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="less">

</style>
