<template>
    <div class="ques-wrap">
       
    </div>
</template>

<script>
import api from '@/api/index.js'
 cnt = 1
export default {
  name: 'hello',
 
  data () {
    return {
		}
  }, 
	mounted() {
	},
  methods: {
  	
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.ques-wrap {
	position: fixed;
  	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	background-color: #f0eff5;
	z-index: 20180504;
	.search-wrap {
		padding: 5px 7px;
	}
}
</style>
