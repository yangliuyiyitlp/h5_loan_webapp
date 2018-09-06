<template>
  <div class="cust-wrap">
    <div class="com-top">
      <div class="com-tit">
        <ComcomTitle :title='title'></ComcomTitle>
        <div class="com-tab clearfix">
          <div class="fl w50per">
            <span :class="{active:isPer}" @click="tabClick">个人</span>
          </div>
          <div class="fl w50per">
            <span :class="{active:!isPer}" @click="tabClick">团队</span>
          </div>
        </div>
      </div>
      <img class="com-bg-img" src="../../assets/images/bg_customer_management@3x.png" alt="">
    </div>
    <div class="cust-con">
      <ul class="clearfix">
        <li class="fl">
          <!-- <router-link to='/allCustomerList'>AddFollowUp -->
          <router-link   :to="{ path:'/OverdueList', query: { oneSelf: isPer} }">
            <div class="icon-content">
              <img src="../../assets/images/icon_all_overdue_orders@2x.png" alt="">
            </div>
            <div class="cust-con-bot">
              <div class="cust-des">全部逾期订单</div>
              <div class="cust-total">(1221)</div>
            </div>
          </router-link>
        </li>
       
        <li class="fl">
            <router-link   :to="{ path:'/CollectionList', query: { oneSelf: isPer} }">
          <div class="icon-content">
            <img src="../../assets/images/icon_advance_collection_order@2x.png" alt="">
          </div>
          <div class="cust-con-bot">
            <div class="cust-des">预催收订单</div>
            <div class="cust-total">(1221)</div>
          </div>
           </router-link>
        </li>
          
            
        <li class="fl">
           <router-link   :to="{ path:'/MinitorList', query: { oneSelf: isPer} }">
          <div class="icon-content">
            <img src="../../assets/images/icon_loan_monitoring_order@2x.png" alt="">
          </div>
          <div class="cust-con-bot">
            <div class="cust-des">放款监测订单</div>
            <div class="cust-total">(1221)</div>
          </div>
           </router-link>
        </li>
        
         
        <li class="fl">
           <router-link   :to="{ path:'/M1List', query: { oneSelf: isPer} }">
          <div class="icon-content">
            <img src="../../assets/images/icon_m1_order@2x.png" alt="">
          </div>
          <div class="cust-con-bot">
            <div class="cust-des">M1订单</div>
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
    name: 'loan',
    data() {
      return {
        title: '贷后管理',
        isPer: true,
        // isTeam: false
      }
    },
    methods: {
      showTag() {

      },
      tabClick(type) {
        // this.isPer = type == "isPer" ? true : false
        // this.isTeam = type == "isTeam"? true : false
        this.isPer = !this.isPer

      }
    },
    mounted() {

    },
    watch: {},
    components: {
      ComcomTitle
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .cust-wrap {
    .cust-con {
      padding: 12px 12px 0;
      font-size: 17px;
      ul {
        width: 100%;
        li {
          width: 49%;
          margin-right: 2%;
          margin-bottom: 2%; // height: 100px;
          background-color: #fff;
          &:nth-child(2n) {
            margin-right: 0;
          }
          &:nth-child(1) {
            border-top-left-radius: 15px;
          }
          &:nth-child(4) {
            border-bottom-right-radius: 15px;
          }
          &:nth-child(3),
          &:nth-child(4) {
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
              font-size: 12px;
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
