<template>
    <div class="cust-wrap">  
      <div class="com-top">
        <div class="com-tit">
          <ComcomTitle :title = 'title'></ComcomTitle>
          <div class="com-tab clearfix">    
            <div class="fl w50per">
             
              <span :class="{active:orderOneSelf}" @click = "tabClick(orderOneSelf)">个人</span>
            </div>        
            <div class="fl w50per">
              <span :class="{active:!orderOneSelf}"  @click = "tabClick(!orderOneSelf)">团队</span>
            </div>
          </div>
        </div>
        <img class="com-bg-img" src="../../assets/images/bg_customer_management@3x.png" alt="">
      </div>
      <div class="cust-con">
        <ul class="clearfix">
          <li class="fl"> 
            <!-- <router-link  to='/AllOrderList'> -->
            <router-link  :to="{ path:'/AllOrderList', query: { oneSelf: orderOneSelf,menuId:menuId['全部订单'].id||''} }">
              <div class="icon-content">
                <img src="../../assets/images/OrderImages/icon_all_orders@2x.png" alt="">
              </div>
              <div class="cust-con-bot">
                <div class="cust-des">全部订单</div>
                <div class="cust-total">({{orderNum.allTotal}})</div>
              </div>
             </router-link>
          </li>
          <li class="fl">
             <router-link  :to="{ path:'/ApplyList', query: { oneSelf: orderOneSelf,menuId:menuId['申请中订单'].id||''} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/iconr_application_orders@2x.png" alt="">
            </div>
             <div class="cust-con-bot">
              <div class="cust-des">申请中订单</div>
              <div class="cust-total">({{orderNum.applayCount}})</div>
            </div>
               </router-link>
          </li>
          <li class="fl">
              <router-link  :to="{ path:'/ExamList', query: { oneSelf: orderOneSelf,menuId:menuId['审批中订单'].id||''} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/icon_approved_orders@2x.png" alt="">
            </div>
             <div class="cust-con-bot">
              <div class="cust-des">审批中订单</div>
              <div class="cust-total">({{orderNum.caseCount}})</div>
            </div>
                </router-link>
          </li>
          <li class="fl">
               <router-link  :to="{ path:'/RepaymentList', query: { oneSelf: orderOneSelf,menuId:menuId['还款中订单'].id||''} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/icon_repayment_orders@2x.png" alt="">
            </div>
            <div class="cust-con-bot">
              <div class="cust-des">还款中订单</div>
              <div class="cust-total">({{orderNum.repayCount}})</div>
            </div>
                </router-link>
          </li>
          <li class="fl">
               <router-link  :to="{ path:'/PayOffList', query: { oneSelf: orderOneSelf,menuId:menuId['已结清订单'].id||''} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/icon_closed_orders@2x.png" alt="">
            </div>
            <div class="cust-con-bot">
              <div class="cust-des">已结清订单</div>
              <div class="cust-total">({{orderNum.clearCount}})</div>
            </div>
             </router-link>
          </li>
          <li class="fl">
               <router-link  :to="{ path:'/RejectList', query: { oneSelf: orderOneSelf,menuId:menuId['拒绝订单'].id||''} }">
            <div class="icon-content">
              <img src="../../assets/images/OrderImages/icon_reject_orders@2x.png" alt="">
            </div>
            <div class="cust-con-bot">
              <div class="cust-des">拒绝订单</div>
              <div class="cust-total">({{orderNum.refuseCount}})</div>
            </div>
             </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import ComcomTitle from "@/components/CommonTitle";
import api from "@/api/index";
export default {
  name: "allOrder",
  data() {
    return {
      title: "订单管理",
      orderOneSelf: true,
      orderNum: {},
       listMenu: [],
      menuId: { '全部订单': '', '申请中订单': '', '审批中订单':  '', '还款中订单': '' , '已结清订单': '' , '拒绝订单': '' }
    };
  },
  mounted() {},
  created() {
    this.getLoginData();
    // this.orderOneSelf = this.$store.state.selectOrder
    // this.isTeam = !this.orderOneSelf
    // this.$store.dispatch('SET_ORDER_ONESELF',  this.orderOneSelf)
    // console.log(0,window.localStorage.getItem('orderOneSelf'))
    //    console.log(11,window.localStorage.getItem('orderOneSelf'))
  },
  methods: {
      getLoginData() {
      // 菜单menuid
      api.queryMenulist().then(res => {
        if (res.data.menuList && res.data.menuList.length != 0) {
          this.listMenu = res.data.menuList;
          for (let k in this.menuId) {
            this.menuId[k] = this.findMenuId(this.listMenu, k);
            // console.log( this.menuId)
          }
        } else {
          this.$notify({
            title: "提示",
            message: res.data.msg,
            duration: 1500
          });
        }
      });
    },
    findMenuId(menu, name) {
      let listFirst = menu.find(element => element.name == "业务管理");
      let listSed = listFirst.list.find(element => element.name == "订单管理");
     return   listSed.list.find(element => element.name == name) || ''
     
    },
    showTag() {},
    queryOrderCount() {
      //获取订单数
            this.showToast('加载中...','loading');
      api.queryOrderCount({
          oneSelf: this.orderOneSelf
        })
        .then(res => {
          setTimeout(() => {
               this.toast.hide();
          },300)
          if (res.data.success) {
            this.orderNum = res.data.data;
          } else {
            this.orderNum={}
            this.showToast('订单数获取失败','warn');
          }
        })
        .catch(err => {
          this.showToast('订单数获取异常','warn');
        });
    },
    tabClick(type) {
      if (!type) {
        this.orderOneSelf = !this.orderOneSelf;
        this.queryOrderCount()
      }
      // this.orderOneSelf = (type == "orderOneSelf")? true : false
      // this.isTeam = !this.orderOneSelf
      // this.$store.dispatch('SET_ORDER_ONESELF',  this.orderOneSelf)
      //  window.localStorage.setItem('orderOneSelf',this.orderOneSelf)
    }
  },
  mounted() {
    this.queryOrderCount()
  },
  watch: {},
  components: {
    ComcomTitle
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.cust-wrap {
  .cust-con {
    padding: 12px 12px 18px;
    font-size: 17px;
    margin-bottom: 49px;
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
        &:nth-child(1) {
          border-top-left-radius: 15px;
        }
        &:nth-child(6) {
          border-bottom-right-radius: 15px;
        }
        &:nth-child(5),
        &:nth-child(6) {
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
            color: #c4c4c4;
            padding-top: 9px;
            padding-bottom: 18px;
          }
        }
      }
    }
  }
}
</style>
