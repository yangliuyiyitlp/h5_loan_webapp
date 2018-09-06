<template>
<div class="cust-wrap">
    <orderRepayTop :backTitle='backTitle' :orderRepayTop='orderRepayTop'></orderRepayTop>
    <div class='repayRecord'>
        <ul>
            <li v-for='(val,i) in PaymentHistory' :key='i'>
                 <div class='recordLeft'><span>{{val.paymentChannel}}</span><span>{{val.paymentTime}}2</span></div>
                <div class='recordRg'>{{val.shouldMoney}}元</div>
            </li>
        </ul>
    </div>
</div>
    
</template>
<script>
import orderRepayTop from "@/pages/allOrder/orderInfoList/orderRepaymentTop";
import api from "@/api/index";
export default {
  name: "repaymentListInfo",
  data() {
    return {
      backTitle: "还款记录",
       orderRepayTop: {},
       PaymentHistory:[]
    };
  },
  mounted(){
    this.queryQueryOrderAmountt()
    this.queryPaymentHistory()
  },
 methods:{
    queryQueryOrderAmountt() {
      //还款记录头部
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
      queryPaymentHistory() {//还款记录列表
      api
        .queryPaymentHistory({
          crmApplayId: this.$route.query.crmApplayId
        })
        .then(res => {
          this.PaymentHistory = [];
          if (res.data.success) {
            this.PaymentHistory = res.data.data;
          }   else if(res.data.msg=='暂无信息！'){
            this.PaymentHistory = []
          }
        
        });
    },
 },
  components: {
    orderRepayTop
  }
};
</script>
<style scoped  lang="less">
.repayRecord {
  ul {
    li {
      width: 100%;
      height: 71px;
      background-color: #fff;
      margin-top: 9px;
      padding: 0 12px;
      box-sizing: border-box;
      .recordLeft,
      .recordRg {
        float: left;
        width: 50%;
      }
      .recordLeft {
        span {
          display: block;
        }
        span:nth-child(1) {
          font-size: 14px;
          color: rgba(115, 115, 115, 1);
          margin: 16.5px 0 14px;
        }
        span:nth-child(2) {
          font-size: 11px;
          color: rgba(168, 168, 168, 1);
         
        }
      }
      .recordRg {
        text-align: right;
        line-height: 71px;
        font-size: 17px;
        color: rgba(64, 64, 64, 1);
          // margin-top: 22.5px;
      }
    }
  }
}
</style>
