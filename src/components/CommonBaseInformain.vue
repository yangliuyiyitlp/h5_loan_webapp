<template>
  <div class="informain-wrap">
      <div class="com-back-bg">
        <CommonBack :backTitle = "backTitle"></CommonBack>
      </div>  
      <div class="informain-top com-bgcolor-fff">
        <div class="com-pad-lr12">
            <div class="com-pad-item">
              <i class="com-left-border"></i>基本信息       
            </div>
        </div>
        <div class="border-bot-1px"></div>
        <ul class="ul-wrap">
          <li v-if = 'custItem.hasOwnProperty("custType") && custItem.custType == "custType"'>
            <span>注册手机号</span>
            <p class="com-color-blue">{{userInfo.custMobile}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("custType") && custItem.custType == "custType"'>
            <span>姓名</span>
            <p>{{userInfo.custName}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("custType") && custItem.custType == "custType"'>
            <span>身份证号码</span>
            <p>{{userBaseInfo.icNumber}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("custType") && custItem.custType == "custType"'>
            <span>申请城市</span>
            <p>{{userInfo.procName}} {{userInfo.cityName}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("custType") && custItem.custType == "custType"'>
            <span>注册时间</span>
            <p>{{userInfo.regTime}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("orderType") && custItem.orderType == "orderType"'>
            <!-- 订单 -->
            <span>姓名</span>
            <p>{{orderBaseInfo.custName}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("orderType") && custItem.orderType == "orderType"'>
            <!-- 订单 -->
            <span>身份证号码</span>
            <p>{{orderBaseInfo.custIc}}</p>
          </li>
           <li v-if = 'custItem.hasOwnProperty("orderType") && custItem.orderType == "orderType"'>
            <!-- 订单 -->
            <span>申请城市：</span>
            <p>{{orderBaseInfo.provId}} {{orderBaseInfo.cityId}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("orderType") && custItem.orderType == "orderType"'>
            <!-- 订单 -->
            <span>申请时间：</span>
            <p>{{orderBaseInfo.createTime}}</p>
          </li>
         
           <!-- <span v-if="orderBaseInfo.custIc !=='-'">身份证号：{{orderBaseInfo.custIc}}</span>
          申请时间：<span>{{orderBaseInfo.createTime}}</span>
          申请城市：<span>{{orderBaseInfo.provId}} {{orderBaseInfo.cityId}}</span> -->
          <li v-if = 'custItem.hasOwnProperty("loanType") && custItem.loanType == "loanType"'>
            <!-- 贷后 -->
            <span>姓名</span>
            <p>{{orderBaseInfo.custName}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("loanType") && custItem.loanType == "loanType"'>
            <!-- 贷后 -->
            <span>身份证号码</span>
            <p>{{orderBaseInfo.custIc}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("loanType") && custItem.loanType == "loanType"'>
            <!-- 贷后 -->
            <span>申请时间：</span>
            <p>{{orderBaseInfo.createTime}}</p>
          </li>
          <li v-if = 'custItem.hasOwnProperty("loanType") && custItem.orderType == "loanType"'>
            <!-- 贷后 -->
            <span>申请城市：</span>
            <p>{{orderBaseInfo.provId}} {{orderBaseInfo.cityId}}</p>
          </li>
          <li>
            <span>性别</span>
            <p>{{userBaseInfo.icSex == 1?'男':userBaseInfo.icSex == 2?'女':''}}</p>
          </li>
          <li>
            <span>民族</span>
            <p>{{userBaseInfo.icNation}}</p>
          </li>
          <li>
            <span>出生日期</span>
            <p>{{userBaseInfo.icBirth}}</p>
          </li>
          <li>
            <span>身份证地址</span>
            <p>
              {{userBaseInfo.nativeProvince }} {{userBaseInfo.nativeCity}} {{userBaseInfo.nativeArea}} {{userBaseInfo.nativeAddress}}
            </p>
          </li>
          <li>
            <span>居住地址</span>
            <p>{{userBaseInfo.houseProvince}} {{userBaseInfo.houseCity }} {{userBaseInfo.houseArea }} {{userBaseInfo.houseAddress }}</p>
          </li>
          <li>
            <span>客户归属人</span>
            <p>{{userBaseInfo.empName}}</p>
          </li>
          <li>
            <span>发证机关</span>
            <p>{{userBaseInfo.icIssUingAuthority}}</p>
          </li>
          <li>
            <span>证件有效期</span>
            <p>{{userBaseInfo.icLimittime}}</p>
          </li>
          
          <li>
            <span>邮箱</span>
            <p>{{userBaseInfo.custEmail}}</p>
          </li>
          <li>
            <span>婚属</span>
            <p>
              <span v-if = 'userBaseInfo.marital == 1'>已婚</span>
              <span v-if = 'userBaseInfo.marital == 2'>未婚</span>
              <span v-if = 'userBaseInfo.marital == 3'>离异</span>
              <span v-if = 'userBaseInfo.marital == 4'>丧偶</span>
              <span v-else></span>
            </p>
          </li>
          <li>
            <span>学历</span>
            <p>
              <span v-if = 'userBaseInfo.hignestDegree == 1'>硕士及以上</span>
					    <span v-if = 'userBaseInfo.hignestDegree == 2'>本科</span>
              <span v-if = 'userBaseInfo.hignestDegree == 3'>大专</span>
              <span v-if = 'userBaseInfo.hignestDegree == 4'>高中</span>
              <span v-if = 'userBaseInfo.hignestDegree == 5'>中专/技校</span>
              <span v-if = 'userBaseInfo.hignestDegree == 6'>初中及以下</span>
            </p>
          </li>
          <li>
            <span>归属团队</span>
            <p>{{userBaseInfo.deptName}}</p>
          </li>
        </ul>        
      </div> 
      <div class="com-bgcolor-fff">
        <div class="com-pad-lr12">
            <div class="com-pad-item com-flex work-des">
              <span class="work-des-tit"><i class="com-left-border"></i>工作信息</span>
              <p class="com-flex1 com-color-blue">
                <span v-if = "jobNature ==1">工薪者</span>
                <span  v-if = "jobNature ==2">企业经营者</span>
                <span v-if = "jobNature == 3">自由职业者</span>
                <span v-if = "jobNature == 4">学生</span>
                <span v-if = "jobNature == 5">退休人员</span>
              </p>
            </div>
        </div>
        <div class="border-bot-1px"></div>
        <!-- 1 工薪者 -->
        <div class="work-informain com-pad-lr12" v-if = "jobNature == 1">            
          <div class="work-tit">
            <span><i class='com-doted'></i>单位信息</span>
          </div>
          <ul class="ul-wrap">
            <li>
              <span>工作单位</span>
              <p>{{userBaseInfo.companyName}}</p>
            </li>
            <li>
              <span>单位地址</span>
              <p>{{userBaseInfo.companyProv}} {{userBaseInfo.companyCity}} {{userBaseInfo.companyArea }} {{userBaseInfo.companyAddress }}</p>
            </li>
          </ul>
          <div class="work-tit">
            <span><i class='com-doted'></i>单位联系方式</span>
          </div>
          <ul class="ul-wrap">
            <li>
              <span>座机</span>
              <p class="com-color-blue">{{userBaseInfo.fixedTelephone}}</p>
            </li>
            <li>
              <span>手机</span>
              <p class="com-color-blue">{{userBaseInfo.companyMobile}}</p>
            </li>
          </ul>
        </div>
        <!-- 2 企业经营者 -->
        <div class="work-informain com-pad-lr12" v-if = "jobNature == 2">            
          <div class="work-tit">
            <span><i class='com-doted'></i>公司信息</span>
          </div>
          <ul class="ul-wrap">
            <li>
              <span>公司名称</span>
              <p>{{userBaseInfo.companyName}}</p>
            </li>
            <li>
              <span>公司地址</span>
              <p>{{userBaseInfo.companyProv}} {{userBaseInfo.companyCity}} {{userBaseInfo.companyArea}} {{userBaseInfo.companyAddress}}</p>
            </li>
          </ul>
          <div class="work-tit">
            <span><i class='com-doted'></i>公司联系方式</span>
          </div>
          <ul class="ul-wrap">
            <li>
              <span>座机</span>
              <p class="com-color-blue">{{userBaseInfo.fixedTelephone}}</p>
            </li>
            <li>
              <span>手机</span>
              <p class="com-color-blue">{{userBaseInfo.companyMobile}}</p>
            </li>
          </ul>
        </div>
        <!-- 3 自由职业者 -->
        <div class="work-informain com-pad-lr12" v-if = "jobNature == 3">            
          <div class="work-tit">
            <span><i class='com-doted'></i>收入来源</span>
          </div>
          <ul class="ul-wrap">
            <li>
              <span>收入来源</span>
              <p>{{userBaseInfo.revenueSources}}</p>
            </li>
            <li>
              <span>月收入</span>
              <p>{{userBaseInfo.averageMonthlyIncome}}元</p>
            </li>
          </ul>          
        </div>
        <!-- 4 学,、5 退休人员 -->
        <div class="work-informain com-pad-lr12" v-if = "jobNature ==4 || jobNature ==5">                            
        </div>
      </div>             
  </div>
</template> 

<script>
import CommonBack from "@/components/CommonBack";
import { mapActions } from "vuex";
import api from "@/api/index";
export default {
  name: "BaseInformain",
  //   showCustFollow
  data() {
    return {
      backTitle: "基本信息",
      custItem: {},
      userBaseInfo: {},
      userInfo: {},
      jobNature: null,
      orderBaseInfo: {}
    };
  },
  created() {
    this.getItemObj();
    this.custItem = this.$store.state.custItem;
    console.log(this.$store.state.custItem,1111111);
  },
  mounted() {
    this.queryEssentialInfoFn();
    if (this.custItem.hasOwnProperty("custType")) {
      //客户详细信息      
      this.getCustDetailBase();
    } else {
      this.queryBaseOrderInfo()
    }
  },
  methods: {
    queryEssentialInfoFn() {
      //基本信息
      let pararms = {};
       if (this.custItem.hasOwnProperty("custType") && this.custItem.custType == "custType") {
        //客户的基本信息
        pararms.crmCustInfo = this.custItem.crmCustInfoId;
      }
      if (this.custItem.hasOwnProperty("orderType") && this.custItem.orderType == "orderType") {
        //订单的基本信息
        // pararms.crmApplayId = this.custItem.applyId; 
        pararms.crmApplayId = this.custItem.applyId;
      }     
     
      if (this.custItem.hasOwnProperty("loanType") && this.custItem.loanType == "loanType") {
        //贷后的基本信息
        pararms.crmApplayId = this.custItem.crmApplyId;
      }
      //  else {
      //   //订单,贷后的基本信息       
      //   pararms.crmApplayId = this.$route.query.crmApplayId;
      // }
      this.userBaseInfo = {}
      this.jobNature = null
      api.queryEssentialInfo(pararms).then(res => {
        if (res.data.code == 1) {
          this.userBaseInfo = res.data.data;
          this.jobNature = res.data.data.jobNature;
        }
        console.log(res.data.data);
        console.log(1233);
      });
    },
    getCustDetailBase() {
      //客户详细信息
      let pararms = {
        crmCustInfoId: this.custItem.crmCustInfoId
      };
      api.getCustDetailBase(pararms).then(res => {
        if (res.data.code == 1) {
          this.userInfo = res.data.data;
          console.log(res.data.data, 99999999999);
        } else {
          this.userInfo = {};
        }
      });
    },
    queryBaseOrderInfo() {
      //订单详细信息（包括贷后）
      let pararms = {
        crmApplayId: this.$route.query.crmApplayId
      };
      this.orderBaseInfo = {};
      api.queryBaseOrderInfo(pararms).then(res => {
        if (res.data.success) {
          if (res.data.data != null) {
            this.orderBaseInfo = res.data.data;
          }
          console.log(this.orderBaseInfo,"this.orderBaseInfo")
        }
      });
    },
    ...mapActions({
      getItemObj: "GET_ITEM_OBJ"
    })
  },
  components: {
    CommonBack
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.informain-wrap {
  font-size: 16px;
  color: #4d4d4d;
  .informain-top {
    margin: 59px 0 9px;
    .com-pad-lr12 {
      .com-left-border {
        margin-right: 0.09rem;
        margin-left: -12px;
      }
    }
  }
  .com-icon-link {
    margin-top: 0;
    margin-left: 10px;
  }
  .default {
    color: #c4c4c4;
  }
  .border-bot-1px {
    border-bottom: 0.01rem solid #e5e5e5;
    margin-left: 12px;
  }
  .com-require {
    // width: 72px;
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
      &:nth-child(2n + 1) {
        // height: 36px;
        line-height: 36px;
        background-color: #fff;
      }
      &:nth-child(2n) {
        // height: 34px;
        line-height: 34px;
        background: rgba(248, 248, 248, 1);
      }
      span {
        width: 22%;
      }
      p {
        flex: 1;
        color: #595959;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        word-wrap:break-word;
        &.com-color-blue {
          color: #0e7fff;
        }
      }
    }
  }
  .work-des {
    .work-des-tit {
      width: 22%;
      i {
        margin-right: 0.09rem;
        margin-left: -0.12rem;
      }
    }
  }
  .work-informain {
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
        // line-height: 13px;
        // height: 13px;
        margin-bottom: 16px;
        background-color: #fff;
      }
    }
  }
  .com-back-bg {
    position: fixed;
    width: 100%;
    top: 0;
  }
}
</style>
