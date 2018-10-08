<template>
    <div class="ques-wrap">
        <Scroll
		    ref="scroll"		
		    :data="items"				  
		    :options="options"
		    @onPullingDown="onPullingDown"
		    @onPullingUp="onPullingUp"
		    >
		    <div class="wrap_con" slot="scollCon">				    	
			        <ul id='activityTab' >						
						<li v-for="(item, index) in items" :key="index" class="imgs-item">
			                <img :src="item.url">
			            </li>
					</ul>
			    </div>
		</Scroll>
    </div>
</template>

<script>
import api from '@/api/index.js'
import Scroll from '@/components/Scroll'
const imgs = [
  {
    url: 'http://om0jxp12h.bkt.clouddn.com/toutiao_12.JPG'
  },
  {
    url: 'http://om0jxp12h.bkt.clouddn.com/toutiao_21.JPG'
  },
  {
    url: 'http://om0jxp12h.bkt.clouddn.com/toutiao_31.JPG'
  }
]
let cnt = 1
export default {
  name: 'hello',
  components: {
	Scroll
  },
  data () {
    return {
      idArr: [2],
      ques_key: '',
      itemIndex: 1,
      items: [{
    url: 'http://om0jxp12h.bkt.clouddn.com/toutiao_12.JPG'
  },
  {
    url: 'http://om0jxp12h.bkt.clouddn.com/toutiao_21.JPG'
  },
  {
    url: 'http://om0jxp12h.bkt.clouddn.com/toutiao_31.JPG'
  }],
      options: {
        pullDownRefresh: {
          threshold: 90,
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
	  },
	  pageSize:10,
	  pageNo:1
    }
  }, 
  methods: {
  	searchList(){
  		this.pageNo = 1;
	    this.items = []
  		this.queryQuestionList()

  	},
  	queryQuestionList(){
  		var params={
  			pageNo:this.pageNo,
  			pageSize:this.pageSize,
  			data:this.ques_key,
//			status:1
  		}
  	// 	api.queryQuestionList(params).then(res=>{
 		// 	console.log(res.data.data,123121231321)
 		// 	if(res.data.code == 1 && res.data.data.length !=0){
 		// 		this.items = this.items.concat(res.data.data)
 		// 		console.log(this.items,'this.items')
 				
 		// 	} else {
 		// 		this.$refs.scroll.$refs.scroll.forceUpdate()
 		// 	}
 		// })
  	},
  	targetTab(eve) {
//		console.log(eve.target.parentNode.siblings())
  	console.log(112)
  		
  				
  	},
    onPullingDown() {
	      // Mock async load.
	      console.log(this.$refs.scroll)
	      setTimeout(() => {
	      	this.pageNo = 1;
	      	this.items = []
	      	 this.items.unshift(imgs[cnt++ % 3])
        		this.$refs.scroll.$refs.scroll.scrollTo(0, 26, 300)
	      }, 1000)
	},
	onPullingUp() {
      // Mock async load.
      setTimeout(() => {
      	this.pageNo = this.pageNo + 1
      	this.items = this.items.concat(imgs)
      }, 1000)
    },
  },
  mounted() {
	this.queryQuestionList()
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
