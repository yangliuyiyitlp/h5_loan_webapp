<template>
  <div class="account-wrap">
      <div class="com-back-bg">
        <CommonBack :backTitle = "backTitle"></CommonBack>
      </div>      
      <div class="account-top com-bgcolor-fff">
        <div class="com-pad-lr12">
            <div class="com-pad-item">
              <i class="com-left-border"></i>账户信息     
            </div>
        </div>
        <div class="border-bot-1px"></div>
        <div class="work-account com-pad-lr12">
          <div class="work-tit">
            <span><i class='com-doted'></i>江西银行账号信息</span>
          </div>
          <ul class="ul-wrap">
            <li>
              <span>电子账户</span>
              <p>{{accoutInfo.bankAccount}}</p>
            </li>
            <li>
              <span>账户余额</span>
              <p v-if = 'accountFlag'>--</p>
              <p  v-if = '!accountFlag'>
                <span v-if = '!orShowAccount'>****元</span>
                <span v-else>{{accountMoney}}元</span>
                <i class="icon-accout" :class="[!orShowAccount?'':'icon-accout-active']" @click = 'tabAccount'></i>
              </p>
              
            </li>
          </ul>
          <div class="work-tit">
            <span><i class='com-doted'></i>绑定银行卡</span>
          </div>
          <ul class="ul-wrap">
            <li>
              <span>开户银行</span>
              <p>{{accoutInfo.bankName}}</p>
            </li>
            <li>
              <span>银行卡号</span>
              <p>{{accoutInfo.cradNumber}}</p>
            </li>
            <li>
              <span>银行预留手机号</span>
              <p>{{accoutInfo.bindCardMobile}}</p>
            </li>
          </ul>
        </div>
      </div>             
  </div>
</template> 

<script>
import CommonBack from "@/components/CommonBack";
import { mapActions } from "vuex";
import api from "@/api/index";
export default {
  name: "Baseaccount",
  //   showCustFollow
  data() {
    return {
      backTitle: "账户信息",
      accountFlag: false,
      orShowAccount: false,
      accoutInfo: {},
      custItem: {},
      accountMoney: ''
    };
  },
  created() {
    // this.getItemObj();
    // this.custItem = this.$store.state.custItem;
    this.custItem = this.$route.query
    console.log(this.custItem.hasOwnProperty("types") && this.custItem.types == "orderType");
  },
  mounted() {
    this.queryAccountInfo()
  },
  methods: {
    tabAccount() {
        this.orShowAccount = !this.orShowAccount
        if (this.orShowAccount) {
          this.queryAccountBalanceFn()
        }
    },   
    queryAccountInfo(){
      let pararms = {}
      if (this.custItem.hasOwnProperty("types") && this.custItem.types == "orderType") {
        //订单的账户信息
        pararms.crmApplayId = this.custItem.crmApplayId;
      }
      if (this.custItem.hasOwnProperty("types") && this.custItem.types == "custType") {
        //客户的账户信息
        pararms.crmCustInfo = this.custItem.crmCustInfoId;
        console.log(8888);
      }
       if (this.custItem.hasOwnProperty("types") && this.custItem.types == "loanType") {
        //贷后的账户信息
        pararms.crmApplayId = this.custItem.crmApplayId;
      }
      this.accoutInfo = {}
  		api.queryAccountInfo(pararms).then((res) =>{
				if (res.data.code ==1) {
          if (res.data.data != null) {
            this.accoutInfo = res.data.data
          }
				} else {
          this.accountFlag = true
          console.log(this.accountFlag)
        }
			})
    },
    queryAccountBalanceFn(){//账户余额
      let pararms = {}
       if (this.custItem.hasOwnProperty("types") && this.custItem.types == "orderType") {
        //订单的账户信息
        pararms.crmApplayId = this.custItem.crmApplayId;
      }
      if (this.custItem.hasOwnProperty("types") && this.custItem.types == "custType") {
        //客户的账户信息
        pararms.crmCustInfo = this.custItem.crmCustInfoId;
        console.log(8888);
      }
       if (this.custItem.hasOwnProperty("types") && this.custItem.types == "loanType") {
        //贷后的账户信息
        pararms.crmApplayId = this.custItem.crmApplyId;
      }
			api.queryAccountBalance(pararms).then(res => {
				if(res.data.success){
          this.accountMoney = res.data.data
          console.log(this.accountMoney )
				}
			})
		},
    // ...mapActions({
    //   getItemObj: "GET_ITEM_OBJ"
    // })
  },
  components: {
    CommonBack
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.account-wrap {
  font-size: 16px;
  color: #4d4d4d;
  .account-top {
    margin: 59px 0 9px;
    .com-pad-lr12 {
      .com-left-border {
        margin-right: 0.09rem;
        margin-left: -12px;
      }
    }
  }

  .border-bot-1px {
    border-bottom: 0.01rem solid #e5e5e5;
    margin-left: 12px;
  }
 
  .com-pad-item {
    padding: 14px 0;
    line-height: 15px;
  }
  .ul-wrap {
    li {
      display: flex;
      font-size: 13px;
      color: #a8a8a8;
      padding: 0 0 0 12px;
      z-index: 1212;      
      span {
        width: 34%;
      }
      p {
        flex: 1;
        color: #595959;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .work-account {
    padding-bottom: 1px;
    .com-doted {
      margin-top: -4px;
    }
    .work-tit {
      margin: 16px 0 17px;
      font-size: 13px;
      color: #595959;
    }
    .ul-wrap {
      li {
        line-height: 20px;
        height: 20px;
        margin-bottom: 17px;
        background-color: #fff;
      }
    }
    .icon-accout {
        display: inline-block;
        width: 26px;
        height: 18px;
        background: url("../assets/images/custImages/icon_eye_hide.png") no-repeat;
        background-size: 26px 18px;
        vertical-align: middle;
        margin-top: -6px;
        margin-left: 6px;
    }
    .icon-accout-active {
        background: url("../assets/images/custImages/icon_eye_show.png") no-repeat;
        background-size: 26px 18px;
    }
  }
  .com-back-bg {
    position: fixed;
    width: 100%;
    top: 0;
  }
}
</style>
