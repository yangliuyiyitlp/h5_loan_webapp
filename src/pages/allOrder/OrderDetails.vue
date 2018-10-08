<template>
<div class="order-wrap" > 
   <!-- 申请中头部 start -->
   <div class='order-top orderDetailsTop' v-if='orderStatus ==1 || orderStatus ==4'>
    <div class='order-tit clearfix'>
   <ul>
     <li><i class="icon-back" @click="goBack"></i></li>
     <li class="com-cen">{{backTitle}}</li>
   </ul>
   </div>
  <div class='orderType'>  
    <!-- 申請中订单显示产品系列  其他订单显示产品名称 -->
   <div>
     <span>
       <span v-if='orderStatus == 1 && orderDetailsList.cptName '>【{{orderDetailsList.cptName}}】</span > 
       <span v-if='orderDetailsList.cpName && (orderStatus == 2||orderStatus == 4||orderStatus == 5||orderStatus == 6||orderStatus == 7||orderStatus == 8||orderStatus == 9||orderStatus == 10) '>【{{orderDetailsList.cpName}}】</span > 
       </span> 申请日期：{{orderDetailsList.createTime}}
   </div>
   <ul class='orderMon'>
     <li>
       <span class='js-blue'>{{orderDetailsList.expectMomey}}</span>
       <span>借款金额（元）</span>
     </li>
     <li>
       <span>{{orderDetailsList.expectDuetime}}</span>
       <span>借款期限（期）</span>
     </li>
   </ul>
  </div>
  </div>
  <!-- 申请中  end -->
  <!-- 其他头部      订单状态：1申请中,2审批中,3还款中,4已结清,5拒绝,6线上筹资中,7满标,10退件  start -->
  <div class='order-top' v-else>
    <div class='order-tit clearfix'>
   <ul>
     <li><i class="icon-back" @click="goBack"></i></li>
     <li class="com-cen">{{backTitle}}</li>
   </ul>
   </div>
  <div class='orderInfo'>
   <div><span v-if='orderDetailsList.cpName'>【{{orderDetailsList.cpName}}】</span >申请日期：{{orderDetailsList.createTime}}</div>
   <ul class='orderMon'>
     <li>
       <span class='js-blue'>{{orderDetailsList.expectMomey}}</span>
       <span>借款金额（元）</span>
     </li>
     <li>
       <span>{{orderDetailsList.expectDuetime}}</span>
       <span>借款期限（期）</span>  
     </li>
   </ul>
     <!-- 还款中订单展示 -->
   <ul class='orderPro'>
  <li><span></span><span>产品系列：</span><span>{{orderDetailsList.cptName}}</span></li>
  <li><span></span><span>还款方式：</span><span><i v-if="orderDetailsList.payment == 1">月付息，到期还本</i>
            <i v-if="orderDetailsList.payment == 2">到期一次性还本付息</i>
            <i v-if="orderDetailsList.payment == 3">等额本息</i>
            <i v-if="orderDetailsList.payment == 4">分期等额</i>
            <i v-if="orderDetailsList.payment == 5">等额本金</i></span></li>
  <li><span></span><span>产品利率：</span><span><i v-if='orderDetailsList.cpName'>{{orderDetailsList.rate}}%/月</i></span></li>
  <li><div class='fl'><span></span><span>授信范围：</span></div><div class='frWid'><i v-if='orderDetailsList.cpName'>{{orderDetailsList.actualLowerLimit}}<i v-if="orderDetailsList.actualUpperLimit">-</i>{{orderDetailsList.actualUpperLimit}}元</i></div></li>
   </ul>
  </div>
  </div>
   <!-- 其他 end -->
   

  <!-- 详情列start -->
<div class='order-list' >
   <ul>
  <li @click="getDescribe('/ExamListInfo')" v-show='orderStatus==2 || orderStatus==6 || orderStatus==7 || orderStatus==8 || orderStatus==9 || orderStatus==5'>审核记录表 <i class="com-icon-link fr"></i></li>
  <li @click="getDescribe('/RepaymentplayInfo')" v-show='orderStatus == 3'>还款计划 <i class="com-icon-link fr"></i></li>
  <li @click="getDescribe('/RepaymentListInfo')" v-show='orderStatus == 3'>还款记录 <i class="com-icon-link fr"></i></li>
  <li @click="getDescribe('/baseInformain')" v-show='orderStatus'>基本信息 <i class="com-icon-link fr"></i></li>
  <li @click="getDescribe('/relationInformain')" v-show='orderStatus'>联系人信息<i class="com-icon-link fr"></i></li>
  <li @click="getDescribe('/accountInformain')" v-show='orderStatus'>账户信息 <i class="com-icon-link fr"></i></li>
   </ul>
</div>
 <!-- 详情列end -->
</div>

</template>

<script>
import api from "@/api/index";
export default {
  name: "OrderDetails",
  data() {
    return {
      backTitle: "订单详情",
      orderStatus: null,
      crmApplayId: "",
      orderDetailsList: {
        cpName: "",
        createTime: "",
        expectMomey: "",
        expectDuetime: "",
        cptName: "",
        payment: "",
        rate: "",
        actualLowerLimit: "",
        cptName: "",
        status: ""
      }
    };
  },
  mounted() {
    // this.orderStatus = this.$route.query.orderStatus;
    this.queryBaseOrderInfo();
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    getDescribe(path) {
      this.$router.push({
        path: path,
        query: {
          crmApplayId: this.$route.query.crmApplayId
        }
      });
    },
    queryBaseOrderInfo() {
      // 訂單詳情基本信息
      const pararms = {
        crmApplayId: this.$route.query.crmApplayId
      };
        this.showToast("加载中",'loading');
      api.queryBaseOrderInfo(pararms).then(res => {
        if (res.data.code == 1 && res.data.data != null) {
          this.orderDetailsList = Object.assign(
            this.orderDetailsList,
            res.data.data
          );
          this.orderStatus = res.data.data.status;
          // this.orderDetailsList = this.orderDetailsList
        } else {
          this.orderDetailsList = {};
        }
          this.toast.hide();
      }).catch(err=>{
        this.showToast("请求失败",'warn');
          this.toast.hide();
      });
       
    }
  },
  watch: {},
  components: {}
};
</script>

<style  lang="less" scoped>
i {
  font-style: normal;
}
.order-wrap {
  .order-top {
    width: 100%;
    height: 267px;
    background: url("../../assets/images/OrderImages/bg_orders_in_repayment@3x.png")
      no-repeat;
    background-size: cover;
    padding: 0 14px 6.2px;
    box-sizing: border-box;
    .orderInfo {
      width: 100%;
      height: 206.5px;
      background: url("../../assets/images/OrderImages/bg_order@3x.png")
        no-repeat;
      background-size: 100% 206.5px;
      font-size: 12px;
      padding: 16px 10px;
      box-sizing: border-box;
      color: rgba(143, 143, 143, 1);
      div:nth-child(1) {
        height: 12px;
      }
      .orderMon {
        margin: 31px 0;
        height: 44px;
        // text-align: center;
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
        li {
          // width: 50%;
          // float: left;
          span:nth-child(1) {
            font-size: 22px;
            margin-bottom: 10px;
          }
        }
        span {
          display: block;
        }
      }
      .orderPro {
        height: 60px;
        .frWid {
          margin-left: 75px;
        }
        li {
          width: 50%;
          float: left;
          span:nth-child(1) {
            width: 4px;
            height: 4px;
            display: inline-block;
            margin-right: 5px;
            vertical-align: middle;
            background: url("../../assets/images/OrderImages/icon_round@3x.png")
              no-repeat;
            background-size: cover;
          }
          span:nth-child(2) {
            height: 20px;
          }
        }
        li:nth-child(1),
        li:nth-child(2) {
          margin: 12px 0;
        }
      }
    }
  }
  .orderDetailsTop {
    width: 100%;
    height: 206.5px;
    background: url("../../assets/images/OrderImages/bg_orders_in_application@3x.png")
      no-repeat;
    background-size: cover;
  }
  .orderType {
    width: 100%;
    height: 133.5px;
    background: url("../../assets/images/OrderImages/bg_white@3x.png") no-repeat;
    background-size: 100% 133.5px;
    font-size: 12px;
    padding: 16px 10px;
    box-sizing: border-box;
    color: rgba(143, 143, 143, 1);
    .orderMon {
      margin: 36px 0;
      // text-align: center;
      display: -webkit-flex;
      display: flex;
      justify-content: space-around;
      li {
        // width: 50%;
        // float: left;
        span:nth-child(1) {
          font-size: 22px;
          margin-bottom: 10px;
          height: 20px;
        }
      }
      span {
        display: block;
      }
    }
  }
  .order-tit {
    padding: 18px 0;
    ul {
      width: 100%;
      li:nth-child(1) {
        float: left;
        font-size: 17px;
        color: #fff;
        .icon-back {
          width: 10px;
          height: 17px;
          display: inline-block;
          background: url("../../assets/images/icon_back@3x.png") no-repeat;
          background-size: cover;
        }
      }
      li:nth-child(2) {
        width: 100%;
        font-size: 17px;
        color: #fff;
        // margin-left: 10px;
        text-align: center;
      }
    }
  }
  .order-list {
    padding: 0 12px;
    background-color: #fff;
    a {
      color: rgba(77, 77, 77, 1);
    }
    li {
      width: 100%;
      font-size: 16px;
      height: 67px;
      line-height: 67px;
      border-bottom: 1px solid #e5e5e5;
    }
    li:last-child {
      border-bottom: none;
    }
  }
}
.title-cen {
  text-align: center;
  font-size: 18px;
  color: #fff;
}
</style>
