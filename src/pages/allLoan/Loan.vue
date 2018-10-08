<template>
  <div class="cust-wrap">
    <div class="com-top">
      <div class="com-tit">
        <ComcomTitle :title='title'></ComcomTitle>
        <div class="com-tab clearfix">
          <div class="fl w50per">
            <span :class="{active:isPer}" @click="tabClick(isPer)">个人</span>
          </div>
          <div class="fl w50per">
            <span :class="{active:!isPer}" @click="tabClick(!isPer)">团队</span>
          </div>
        </div>
      </div>
      <img class="com-bg-img" src="../../assets/images/bg_customer_management@3x.png" alt="">
    </div>
    <div class="cust-con">
      <ul class="clearfix">
        <li class="fl">
          <!-- <router-link to='/allCustomerList'>AddFollowUp -->
          <router-link   :to="{ path:'/OverdueList', query: { oneSelf: isPer,menuId:menuId['全部逾期订单'].id||''} }">
            <div class="icon-content">
              <img src="../../assets/images/icon_all_overdue_orders@2x.png" alt="">
            </div>
            <div class="cust-con-bot">
              <div class="cust-des">全部逾期订单</div>
              <div class="cust-total">({{objAccount.allOverdue}})</div>
            </div>
          </router-link>
        </li>
       
        <li class="fl">
            <router-link   :to="{ path:'/CollectionList', query: { oneSelf: isPer,menuId:menuId['预催收订单'].id||''} }">
          <div class="icon-content">
            <img src="../../assets/images/icon_advance_collection_order@2x.png" alt="">
          </div>
          <div class="cust-con-bot">
            <div class="cust-des">预催收订单</div>
            <div class="cust-total">({{objAccount.collectionCount}})</div>
          </div>
           </router-link>
        </li>
          
            
        <li class="fl">
           <router-link   :to="{ path:'/MinitorList', query: { oneSelf: isPer,menuId:menuId['放款监测订单'].id||''} }">
          <div class="icon-content">
            <img src="../../assets/images/icon_loan_monitoring_order@2x.png" alt="">
          </div>
          <div class="cust-con-bot">
            <div class="cust-des">放款监测订单</div>
            <div class="cust-total">({{objAccount.monitorCount}})</div>
          </div>
           </router-link>
        </li>
        
         
        <li class="fl">
           <router-link   :to="{ path:'/M1List', query: { oneSelf: isPer,menuId:menuId['M1订单'].id||''} }">
          <div class="icon-content">
            <img src="../../assets/images/icon_m1_order@2x.png" alt="">
          </div>
          <div class="cust-con-bot">
            <div class="cust-des">M1订单</div>
            <div class="cust-total">({{objAccount.m1Count}})</div>
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
  name: "loan",
  data() {
    return {
      title: "贷后管理",
      isPer: true,
      // isTeam: false
      objAccount: {
        monitorCount: 0,
        allOverdue: 0,
        m1Count: 0,
        collectionCount: 0
      },
      listMenu: [],
      menuId: { '全部逾期订单': '', '放款监测订单': '', '预催收订单':  '', 'M1订单': '' }
    };
  },
  created() {
    this.getLoginData();
  },
  methods: {
    getLoginData() {
      // 菜单menuid
      api.queryMenulist().then(res => {
        if (res.data.menuList && res.data.menuList.length != 0) {
          this.listMenu = res.data.menuList;
          for (let k in this.menuId) {
            this.menuId[k] = this.findMenuId(this.listMenu, k);
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
      let listSed = listFirst.list.find(element => element.name == "贷后管理");
     return   listSed.list.find(element => element.name == name) || ''
     
    },
    showTag() {},
    tabClick(type) {
      // this.isPer = type == "isPer" ? true : false
      // this.isTeam = type == "isTeam"? true : false
      if (!type) {
        this.isPer = !this.isPer;
        this.queryOverdueOrderCount();
      }
    },
    queryOverdueOrderCount() {
      this.showToast("加载中...", "loading");
      let params = {
        oneSelf: this.isPer
      };
      api
        .queryOverdueOrderCount(params)
        .then(res => {
          setTimeout(() => {
            this.toast.hide();
          }, 300);
          if (res.data.success) {
            this.objAccount = res.data.data;
          } else {
            this.objAccount = {};
            this.showToast("贷后数获取失败", "warn");
          }
        })
        .catch(err => {
          this.showToast("贷后数获取异常", "warn");
        });
    }
  },
  mounted() {
    this.queryOverdueOrderCount();
  },
  watch: {},
  components: {
    ComcomTitle
  }
};
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
