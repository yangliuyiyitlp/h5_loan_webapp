<template>
<div class='top'>

  <div class="back-wrap">
   <ul class="clearfix backTop">
     <li>
      <i class="icon-back" @click="goBack"></i>
     </li>
     <li class="com-cen">{{backTitle}}</li>
   </ul>
   <div class='repayInfo'>
      <div>
          <i></i>
           <div class='repayMon'>
               <span class='js-blue'>{{orderRepayTop.totalAmount}}</span><span>当期应还总金额（元）</span>
           </div>
      </div>
      <div class='repayList'>
          <ul>
              <li><span>客户电话</span><span class='js-blue'>11111111111</span></li>
              <li><span>当前应还本金</span><span>{{orderRepayTop.totalPrincipal}}</span></li>
              <li><span>当前应还利息</span><span>{{orderRepayTop.totalInterest}}</span></li>
              <li><span>当前应还罚息</span><span>{{orderRepayTop.totalAccrual}}</span></li>
              <li><span>提前结清金额</span><span>{{orderRepayTop.amount}}</span></li>
              <li><span>当前应还分期服务费</span><span>{{orderRepayTop.totalManagerFee}}</span></li>
              </ul>
      </div>
   </div>
  </div>
    
</div>
</template>

<script>
export default {
  name: "orderRepayTop",
  props: {
    backTitle: {
      type: String,
      default: ""
    },
    orderRepayTop:{
       type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped  lang="less">
.top{
  height: 295px; 
}
.back-wrap {
  font-size: 18px;
  height: 128px;
  padding: 0 12px;
  box-sizing: border-box;
  background: url("../../../assets/images/bg_repayment_record@3x.png") no-repeat;
  background-size: cover;
  .backTop {
    height: 64px;
    line-height: 64px;
    li {
      float: left;
      width: 33.33%;
      color: #fff;
      .icon-back {
        display: inline-block;
        width: 10px;
        height: 17px;
        background: url("../../../assets/images/icon_back@3x.png") no-repeat;
        background-size: 10px 17px;
      }
    }
  }
  .repayInfo {
    width: 100%;
    height:229px;
    // display: block;
    background: url("../../../assets/images/bg_repaycard@3x.png") no-repeat;
       background-size: 100% 229px;
    div:nth-child(1) {
      width: 100%;
      padding: 15px 11px;
      i {
        width: 38px;
        height: 38px;
        display: inline-block;
        vertical-align: top;
        background: url("../../../assets/images/icon_repayment_record@3x.png")
          no-repeat;
        background-size: cover;
      }

      .repayMon {
        display: inline-block;
        span {
          display: block;
        }
        .js-blue {
          font-size: 22px;
          margin-bottom:4px;
        }
        span:nth-child(2) {
          font-size: 11px;
          color: rgba(168, 168, 168, 1);
        }
      }
    }
    .repayList{
        font-size:11px;
        padding:0 11px;
        ul{
            li{
                width:100%;
               color:rgba(168,168,168,1);
                margin-top:14px;
                span{
                    display: inline-block;
                    width:50%;
                }
                span:nth-child(2){
                    text-align: right;
                }
            }
            li:last-child{
                margin-bottom:14px;
            }
        }
    }
  }
}
</style>
