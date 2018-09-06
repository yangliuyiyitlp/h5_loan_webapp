<template>
   <div class="scroll-wrap">
   	 <cube-scroll
	    ref="scroll"		
	    :data="data"				  
	    :options="options"
	    @pulling-down="onPullingDown"
	    @pulling-up="onPullingUp"
	    >
		    <slot name="scollCon">
			    <template slot-scope="props">
				</template>  
		    </slot>
		</cube-scroll>
   </div>
</template>

<script>
export default {
  name: 'hello',
  props:{
  	data: {
  		type:Array,
  		default:[]
  	},
  	options: {
  		type: Object,
  		default: {
				pullDownRefresh: {
					threshold: 50,
					stop: 40,
					txt: '刷新成功'
				},
				pullUpLoad: {
					threshold: 0,          
					txt: {
						more: '上拉加载更多',
						noMore: '~我是有底线的~'
					}
				}
			}       
	  },  	
  },
  data () {
    return {      
    }
  }, 
  methods: {
    onPullingDown() {
	      // Mock async load.
	      // setTimeout(() => {
        		
	      // }, 1000)
	    this.$emit("onPullingDown")
	},
	"onPullingUp"() {
      // Mock async load.
      	this.$emit("onPullingUp")
      // setTimeout(() => {
      // }, 1000)
    },
  },
  mounted() {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
	.scroll-wrap {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		/*height:100%;*/
		bottom: 0;
		font-size: 14px
	}

</style>
