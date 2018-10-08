<template>
<div>
    <div class="footer-wrap clearfix">  
      <router-link to='/index/customerManage'>
        <i class="icon"></i>
        <span>客户</span>
      </router-link>
      <router-link to='/index/orderManage'>
        <i class="icon icon-order"></i>
        <span>订单</span>
      </router-link>
      <router-link to='/index/loan'>
        <i class="icon icon-loan"></i>
        <span>贷后</span>
      </router-link>
    </div>   
</div>
    
</template>

<script>

export default {
  name: 'NavFooter',  
  data () {
    return {
    }
  }, 
  methods: {
    showTag() {

    }
  },
  mounted() {

  },
  watch: {
  },
  components: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.footer-wrap {
    position: fixed;
    bottom: 0;
    z-index: 899;
    height: 49px;
    line-height: 19px;
    width: 100%;
    text-align: center;
    background-color: #fff;
    & > a {
        float: left;
        width: 33.33%;
        font-size: 11px;   
        margin-top: 6px;
        color: #253C8C;                
        span {
            display: block;
            // padding-top: 26px;
        }
    }
   
    .icon {
        display: block;
        height: 22px;
        background: url("../../assets/images/tabbar_customer_default@3x.png") no-repeat top center;
        background-size: 19px 22px;
    }
    .icon-order {
        background: url("../../assets/images/tabbar_order_default@3x.png") no-repeat top center;
        background-size: 19px 22px;
    }
    .icon-loan {
        background: url("../../assets/images/tabbar_post_loan_default@3x.png") no-repeat top center;
        background-size: 19px 22px;
    }
     & > a:nth-child(1).router-link-active {
		background: url("../../assets/images/tabbar_customer_pressed@3x.png") no-repeat top center;
		background-size: 19px 22px;
	}
	& > a:nth-child(2).router-link-active {
		background: url("../../assets/images/tabbar_order_pressed@3x.png") no-repeat top center;
		background-size: 19px 22px;
	}
	& > a:nth-child(3).router-link-active {
		background: url("../../assets/images/tabbar_post_loan_pressed@3x.png") no-repeat top center;
		background-size: 19px 22px;
	}
}

</style>
