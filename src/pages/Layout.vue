<template>
    <div class="ly-wrap"> 
      <router-view></router-view>
      <Footer></Footer>
    </div>
</template>

<script>
import api from '@/api/index.js'
import Footer from '@/pages/footer/footer'

export default {
  name: 'lyout',  
  data () {
    return {
    }
  }, 
  methods: {

  },
  mounted() {

  },
  watch: {
  },
  components: {
    Footer
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>

</style>
