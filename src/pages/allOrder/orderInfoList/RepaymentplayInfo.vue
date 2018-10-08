<template>
<div>
    <orderRepayTop :backTitle='backTitle' :orderRepayTop ='orderRepayTop'></orderRepayTop>
    <div class='repayPlay'>
     <ul >
      <li v-for='(val,i) in repayPlay' :key='i'>  <!--0  待还，1 结清，2 逾期-->
         <div><i class='repayLf'></i><span>第{{val.periods}}期</span><div class='repayRg'><i :class="{1:'iconClear',2:'iconOverdue',0:'iconReturn'}[val.status]"></i></div></div>
         <div><span>还款本金</span><span>{{val.shouldCapiital}}</span></div>
         <div><span>还款利息</span><span>{{val.shouldAccral}}</span></div>
         <div><span>分期服务费</span><span>{{val.manageMoney}}</span></div>
         <div><span>逾期费用</span><span>{{val.overdueMoney}}</span></div>
         <div><span>应还日期</span><span>{{val.repaymentTime}}</span></div>
         <div><span>应还总额</span><span>{{val.shouldMoney}}</span></div>
      </li>
         
     </ul>
    </div>
     <div class='noData' v-if = "repayPlay.length == 0">
         <NoData ></NoData>
    </div>
</div>
    
</template>
<script>
import orderRepayTop from "@/pages/allOrder/orderInfoList/orderRepaymentTop";
import NoData from "@/components/NoData";
import api from "@/api/index";
export default {
  name: "repaymentplayInfo",
  data() {
    return {
      backTitle: "还款计划",
      orderRepayTop: {},
      repayPlay: [],
    };
  },
  mounted() {
    this.queryQueryOrderAmountt();
    this.queryRepaymentPlan();
  },
  methods: {
    queryQueryOrderAmountt() {
      //还款计划头部
      api
        .queryQueryOrderAmountt({
          crmApplayId: this.$route.query.crmApplayId
        })
        .then(res => {
          if (res.data.success) {
            this.orderRepayTop = res.data.data;
          } else {
            this.orderRepayTop = {};
          }
        });
    },
    queryRepaymentPlan() {
       this.showToast("加载中",'loading');
      //还款计划列表
      api
        .queryRepaymentPlan({
          crmApplayId: this.$route.query.crmApplayId
        })
        .then(res => {
          this.repayPlay = [];
          if (res.data.success) {
            this.repayPlay = res.data.data;
            this.repayPlay.forEach(function(val, idx) {
              if (val.repaymentTime) {
                val.repaymentTime = val.repaymentTime.substring(0, 10);
              }
            });
          } else if (res.data.msg == "暂无信息！") {
            this.repayPlay = [];
          }
            this.toast.hide();
        }).catch(err=>{
          this.showToast("请求失败",'warn');
          this.toast.hide();
      });
    }
  },
  components: {
    orderRepayTop,
    NoData
  }
};
</script>
<style scoped  lang="less">
.noData {
 top:128px;
 position: relative;
}
.repayPlay {
  ul {
    li {
      width: 100%;
      height: 171px;
      padding: 0 0 16px;
      margin-top: 9px;
      background-color: #fff;
      box-sizing: border-box;
      div:nth-child(1) {
        // width: 100%;
        height: 43.5px;
        line-height: 43.5px;
        padding: 0 11px;
        font-size: 15px;
        color: rgba(102, 102, 102, 1);
        border-bottom: 1px solid #e5e5e5;
        box-sizing: border-box;
        .repayLf {
          width: 17px;
          height: 17px;
          margin-right: 5px;
          vertical-align: middle;
          display: inline-block;
          background: url("../../../assets/images/OrderImages/icon_nper@3x.png")
            no-repeat;
          background-size: cover;
        }
        .repayRg {
          width: 40%;
          text-align: right;
          float: right;
          padding: 0;
          margin: 0 -11px 0 0;
        }
      }
      div:nth-child(n + 2) {
        font-size: 13px;
        width: 50%;
        padding: 0 11px;
        box-sizing: border-box;
        float: left;
        margin-top: 22.5px;
        span {
          display: inline-block;
          width:50%;
          text-align: left;
        }
        span:nth-child(1) {
          color: rgba(153, 153, 153, 1);
          // margin-right: 22px;
        }
        span:nth-child(2) {
          color: rgba(64, 64, 64, 1);
        }
      }
    }

    .iconClear,
    .iconOverdue,
    .iconReturn {
      width: 47px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
    }
    .iconClear {
      background: url("../../../assets/images/OrderImages/icon_clear@3x.png")
        no-repeat;
      background-size: contain;
    }
    .iconOverdue {
      background: url("../../../assets/images/OrderImages/icon_overdue@3x.png")
        no-repeat;
      background-size: contain;
    }
    .iconReturn {
      background: url("../../../assets/images/OrderImages/icon_to_be_returned@3x.png")
        no-repeat;
      background-size: contain;
    }

    li:last-child {
      margin-bottom: 9px;
    }
  }
}
</style>
