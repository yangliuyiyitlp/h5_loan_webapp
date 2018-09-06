<template>
    <div class="cust-wrap">  
      <div class="com-top">
        <div class="com-tit">
          <ComcomTitle :title = 'title'></ComcomTitle>
          <div class="com-tab clearfix">    
            <div class="fl w50per">
              <span :class="{active: !isPerTeam}" @click = "tabClick">个人客户</span>
            </div>        
            <div class="fl w50per">
              <span :class="{active: isPerTeam}"  @click = "tabClick">团队客户</span>
            </div>
          </div>
        </div>
        <img class="com-bg-img" src="../../assets/images/bg_customer_management@3x.png" alt="">
      </div>
      <div class="cust-con">
        <ul class="clearfix">
          <!-- 1未实名,2已实名,3已成交 -->          
          <li class="fl"> 
            <router-link :to="{path:'/allCustomerList',query: {type: 'allCust',oneSelf: isPerTeam}}">
              <div class="icon-content">
                <img src="../../assets/images/icon_all_customers@3x.png" alt="">
              </div>
              <div class="cust-con-bot">
                <div class="cust-des">全部客户</div>
                <div class="cust-total">(1221)</div>
              </div>
            </router-link>
          </li>
          <li class="fl">
            <router-link :to="{path:'/allCustomerList',query: {custStatus: '1',oneSelf: isPerTeam}}">
              <div class="icon-content">
                <img src="../../assets/images/icon_unnamed_customer@3x.png" alt="">
              </div>
              <div class="cust-con-bot">
                <div class="cust-des">未实名客户</div>
                <div class="cust-total">(1221)</div>
              </div>
            </router-link>              
          </li>
          <li class="fl">
            <router-link :to="{path:'/allCustomerList',query: {custStatus: '2',oneSelf: isPerTeam}}">
              <div class="icon-content">
                <img src="../../assets/images/icon_real_name_client@3x.png" alt="">
              </div>
              <div class="cust-con-bot">
                <div class="cust-des">已实名客户</div>
                <div class="cust-total">(1221)</div>
              </div>
            </router-link>
          </li>
          <li class="fl">
            <router-link :to="{path:'/allCustomerList',query: {custStatus: '3',oneSelf: isPerTeam}}">
              <div class="icon-content">
                <img src="../../assets/images/icon_customer_transaction@3x.png" alt="">
              </div>
              <div class="cust-con-bot">
                <div class="cust-des">已成交客户</div>
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
  name: 'allCustomer',  
  data () {
    return {
      title: '客户管理',
      isPer: true,
      isTeam: false,
      isPerTeam: false
    }
  }, 
  methods: {
    showTag() {

    },
    tabClick(type) {
      // this.isPer = type == "isPer"? true : false
      // this.isTeam = type == "isTeam"? true : false
      this.isPerTeam = !this.isPerTeam
      
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
    padding: 12px 12px 0;
    font-size: 17px;
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
        &:nth-child(4){
          border-bottom-right-radius: 15px;
        }
        &:nth-child(3), &:nth-child(4) {
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
        // &:nth-child(2) {
        //   img {
        //     width: 78px;
        //     height: 85px;
        //   }
        // }
        // &:nth-child(3) {
        //   img {
        //     width: 78px;
        //     height: 82px;
        //   }
        // }
        //  &:nth-child(4) {
        //   img {
        //     width: 78px;
        //     height: 73px;
        //   }
        // }
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
