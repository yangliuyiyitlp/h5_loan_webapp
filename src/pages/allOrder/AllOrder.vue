<template>
    <div class="cust-wrap">  
      <div class="com-top">
        <div class="com-tit">
          <ComcomTitle :title = 'title'></ComcomTitle>
          <div class="com-tab clearfix">    
            <div class="fl w50per">
             
              <span :class="{active:orderOneSelf}" @click = "tabClick">个人</span>
            </div>        
            <div class="fl w50per">
              <span :class="{active:!orderOneSelf}"  @click = "tabClick">团队</span>
            </div>
          </div>
        </div>
        <img class="com-bg-img" src="../../assets/images/bg_customer_management@3x.png" alt="">
      </div>
      <div class="cust-con">
        <ul class="clearfix">
          <li class="fl"> 
            <!-- <router-link  to='/AllOrderList'> -->
            <router-link  :to="{ path:'/AllOrderList', query: { oneSelf: orderOneSelf} }">
              <div class="icon-content">
                <img src="../../assets/images/OrderImages/icon_all_orders@2x.png" alt="">
              </div>
              <div class="cust-con-bot">
                <div class="cust-des">全部订单</div>
                <div class="cust-total">(1221)</div>
              </div>
             </router-link>
          </li>
          <li class="fl">
             <router-link  :to="{ path:'/ApplyList', query: { oneSelf: orderOneSelf} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/iconr_application_orders@2x.png" alt="">
            </div>
             <div class="cust-con-bot">
              <div class="cust-des">申请中订单</div>
              <div class="cust-total">(1221)</div>
            </div>
               </router-link>
          </li>
          <li class="fl">
              <router-link  :to="{ path:'/ExamList', query: { oneSelf: orderOneSelf} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/icon_approved_orders@2x.png" alt="">
            </div>
             <div class="cust-con-bot">
              <div class="cust-des">审批中订单</div>
              <div class="cust-total">(1221)</div>
            </div>
                </router-link>
          </li>
          <li class="fl">
               <router-link  :to="{ path:'/RepaymentList', query: { oneSelf: orderOneSelf} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/icon_repayment_orders@2x.png" alt="">
            </div>
            <div class="cust-con-bot">
              <div class="cust-des">还款中订单</div>
              <div class="cust-total">(1221)</div>
            </div>
                </router-link>
          </li>
          <li class="fl">
               <router-link  :to="{ path:'/PayOffList', query: { oneSelf: orderOneSelf} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/icon_closed_orders@2x.png" alt="">
            </div>
            <div class="cust-con-bot">
              <div class="cust-des">已结清订单</div>
              <div class="cust-total">(1221)</div>
            </div>
             </router-link>
          </li>
          <li class="fl">
               <router-link  :to="{ path:'/RejectList', query: { oneSelf: orderOneSelf} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/icon_reject_orders@2x.png" alt="">
            </div>
            <div class="cust-con-bot">
              <div class="cust-des">拒绝订单</div>
              <div class="cust-total">(1221)</div>
            </div>
             </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import ComcomTitle from "@/components/CommonTitle"
export default {
  name: 'allOrder',  
  data () {
    return {
      title: '订单管理',
      orderOneSelf: true
    }
  }, 
  mounted(){	
   
  },
  created(){
    // this.orderOneSelf = this.$store.state.selectOrder
    // this.isTeam = !this.orderOneSelf
    // this.$store.dispatch('SET_ORDER_ONESELF',  this.orderOneSelf)
    // console.log(0,window.localStorage.getItem('orderOneSelf'))
    //    console.log(11,window.localStorage.getItem('orderOneSelf'))
  },
  methods: {
    showTag() {

    },
    tabClick(type) {
      this.orderOneSelf =!this.orderOneSelf
      // this.orderOneSelf = (type == "orderOneSelf")? true : false
      // this.isTeam = !this.orderOneSelf
        // this.$store.dispatch('SET_ORDER_ONESELF',  this.orderOneSelf)
        //  window.localStorage.setItem('orderOneSelf',this.orderOneSelf)
    }
  },
  mounted() {

  },
  watch: {
  },
  components: {
    ComcomTitle
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.cust-wrap {
  .cust-con {
    padding: 12px 12px 18px;
    font-size: 17px;
     margin-bottom:49px;
    ul {
      width: 100%;
      li {
        width: 49%;
        margin-right: 2%;
        margin-bottom: 2%;
        // height: 100px;
        background-color: #fff;
        &:nth-child(2n) {
           margin-right: 0;
        }
        &:nth-child(1){
          border-top-left-radius: 15px;
        }
        &:nth-child(6){
          border-bottom-right-radius: 15px;
        }
        &:nth-child(5), &:nth-child(6) {
           margin-bottom: 0;
        }
        .icon-content {
          text-align: center;
          padding-top: 38px;
          img {
            width: 78px;
            height: 73px;
          }
        }
        .cust-con-bot {
          color: #595959;
          font-size: 17px;
          margin-top: 9px;
          text-align: center;
          .cust-total {
            font-size:12px;
            color: #C4C4C4;
            padding-top: 9px;
            padding-bottom: 18px;
          }
        }
      }
    }
  }
}
</style>
