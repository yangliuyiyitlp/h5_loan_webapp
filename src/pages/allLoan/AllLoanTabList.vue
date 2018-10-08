<template>
    <div>
         <!-- <div class="cust-list com-scroll"> -->
         <div :class="$route.path == '/M1List'?'cust-list com-scroll  order-scroll':'cust-list com-scroll'">
            <Scroll
          ref="scroll"		
          :data="tableList"				  
          :options="options"
          @onPullingDown="onPullingDown"
          @onPullingUp="onPullingUp"
          >
           <div class="wrap_con" slot="scollCon">
           <!-- 放款监测   预催收 -->
        <div class="cust-list-item" v-if="$route.path == '/CollectionList' || $route.path == '/MinitorList'? 1:0" v-for = '(val,index) in tableList' :key='index'>
          
          <i  v-if='val.monitoringStatus == 0' class='monitoringStatus'></i> 
         
          <div class="list-item-top item-pad">
            <div class="item-title"><span class="item-name">{{val.custName}}</span>
                <a v-if='checkPhone(val.custMobile)'  class="js-blue">{{val.custMobile}}</a>
                  <a v-else :href='"tel:" + val.custMobile' class="js-blue">{{val.custMobile}}</a>
            </div>
          </div>
            <div  >
          <div class="item-step clearfix" @click='goOrderDetails(val)'>
             <i class="com-icon fr" ></i>
              <ul class='orderList' >
                 <li >
                 <span >{{val.loanTime}} </span>
                 <span>放款日期</span>
                  </li>
                   <li >
                 <span >{{val.currentRepaymentTime}}</span>
                 <span>本期还款日</span>
                  </li>
                   <li v-if='tablePermisson.collection'>
                 <span >{{val.loanDay}}天</span>
                 <span>放款天数</span>
                  </li>
                   <li v-if='tablePermisson.minitor'>
                 <span >{{val.repaymentDay}}天</span>
                 <span>距还款日</span>
                  </li>
                </ul>
            </div>
            
          <div class="item-bottom clearfix" :ref="'elememt'+index" >
             <span class="com-tag" v-if='val.compName'>{{val.compName}}</span>
              <span class="com-tag" v-if='val.deptName'>{{val.deptName}}</span>
              <span class="com-tag" v-if='val.empName'>{{val.empName}}</span>
               <span  v-if = 'val.cpName'  class="com-tag js-blue js-border">{{val.cpName}}</span>
                <span class="com-btn js-blue fr" @click='goFoword(val)'>跟进</span>
                 <i class='itemDown' @click.stop='toggleClass(index)'></i>
            </div>
          </div>
        </div>
        
        <!-- 全部逾期订单   -->
        <div class="cust-list-item m1"    v-if="$route.path == '/OverdueList'? 1:0" v-for = '(val,index) in tableList' :key='index'>
          <i class="com-icon fr"  @click='goOrderDetails(val)'></i>
          <div class="list-item-top item-pad"  @click='goOrderDetails(val)'>
            <div class="item-title"><span class="item-name">{{val.custName}}</span>
                <a v-if='checkPhone(val.custMobile)'  class="js-blue">{{val.custMobile}}</a>
                  <a v-else :href='"tel:" + val.custMobile' class="js-blue">{{val.custMobile}}</a>
            </div>
          </div>
          <div class="allLoan-step clearfix" >
            
              <ul class='allLoanList' >
                 <li>
                 <span >本期还款日 </span>
                 <span>{{val.currentRepaymentTime | substrFormatTime}}</span>
                  </li>
                <li>
                 <span >逾期状态 </span>
                 <span>{{val.overdueStatus}}</span>
                  </li>
                   <li>
                 <span >逾期天数 </span>
                 <span>{{val.overdueDay}}天</span>
                  </li>
                 <li>
                 <span>催收机构</span>
                <span id='rejectShow' @click.stop="rejectLoan(index,val)">查看</span>
                 <div :ref='"tip"+ index' v-show='loanIndex==index' class='com_bomb'>{{objRefresed}} <i @click.stop='loanClose(index)'></i></div>
                  </li>

              </ul>
              
            </div> 
            
          <div class="item-bottom clearfix" :ref="'elememt'+index" >
              <span class="com-tag" v-if='val.compName'>{{val.compName}}</span>
              <span class="com-tag" v-if='val.deptName'>{{val.deptName}}</span>
              <span class="com-tag" v-if='val.empName'>{{val.empName}}</span>
               <span  v-if = 'val.cpName'  class="com-tag js-blue js-border">{{val.cpName}}</span>
                <span class="com-btn js-blue fr" @click='goFoword(val)'>跟进</span>
                 <i class='itemDown'  @click.stop='toggleClass(index)'></i>
          </div>
           
        </div>
        

         <!-- m1   -->
        <div class="cust-list-item m1"  v-if="$route.path == '/M1List'? 1:0" v-for = '(val,index) in tableList' :key='index'>
          <i class="com-icon fr"  @click='goOrderDetails(val)'></i>
          <div class="list-item-top item-pad"  @click='goOrderDetails(val)'>
            <div class="item-title"><span class="item-name">{{val.custName}}</span>
                <a v-if='checkPhone(val.custMobile)'  class="js-blue">{{val.custMobile}}</a>
                  <a v-else :href='"tel:" + val.custMobile' class="js-blue">{{val.custMobile}}</a>
            </div>
          </div>
          <div class="allLoan-step clearfix" >
            
              <ul class='allLoanList' >
               <li >
                  <span>放款日期</span>
                 <span >{{val.loanTime |substrFormatTime}} </span>
                  </li>
                   <li >
                       <span>本期还款日</span>
                 <span >{{val.currentRepaymentTime|substrFormatTime}}</span>
                  </li>
                   <li>
                 <span >逾期天数 </span>
                 <span>{{val.overdueDay}}天</span>
                  </li>
                 <li>
                 <span>催收机构</span>
                <span id='rejectShow' @click.stop="rejectLoan(index,val)">查看</span>
                 <div :ref='"tip"+ index' v-show='loanIndex==index' class='com_bomb'>{{objRefresed}} <i @click.stop='loanClose(index)'></i></div>
                  </li>

              </ul>
              
            </div> 
            
          <div class="item-bottom clearfix" :ref="'elememt'+index">
             
              <span class="com-tag" v-if='val.compName'>{{val.compName}}</span>
              <span class="com-tag" v-if='val.deptName'>{{val.deptName}}</span>
              <span class="com-tag" v-if='val.empName'>{{val.empName}}</span>
              <span  v-if = 'val.cpName'  class="com-tag js-blue js-border">{{val.cpName}}</span>
              <span class="com-btn js-blue fr" @click='goFoword(val)'>跟进</span>
              <i class='itemDown' @click.stop='toggleClass(index)'></i>
          </div>
        </div>
          </div>
          </Scroll>
      </div>
    
  <NoData v-if = "tableList.length == 0"></NoData>
    </div>

</template>
<script>
import Scroll from "@/components/Scroll";
import NoData from "@/components/NoData";
import api from "@/api/index";
import { mapActions } from "vuex";
import comonFunc from "@/utils/commonFunc";
export default {
  name: "allLoanTabList",
  props: {
    tableList: {
      type: Array,
      default: []
    },
    tablePermisson: {
      type: Object,
      default: function() {
        return {
          collection: false, //放款监测
          minitor: false //预催收
        };
      }
    }
  },
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      loanIndex: -1,
      objRefresed: "",
      options: {
        pullDownRefresh: {
          threshold: 50,
          stop: 40,
          txt: "刷新成功"
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: "上拉加载更多",
            noMore: "~我是有底线的~"
          }
        }
      },
      domEles: {} //存储元素对象
    };
  },
  created() {},

  updated() {
    console.log(0);
    let _this = this;
    _this.$nextTick(() => {
      // DOM更新之后获取子元素
      for (let i = 0; i < _this.tableList.length; i++) {
        if (_this.$refs["elememt" + i][0]) {
          let ele = _this.$refs["elememt" + i][0];
          if (ele.offsetHeight > 42) {
            if (
              _this.$route.path == "/CollectionList" ||
              _this.$route.path == "/MinitorList"
            ) {
              ele.children[ele.children.length - 1].classList.add("item-fir");
              ele.children[ele.children.length - 1].classList.remove(
                "item-sec"
              );
            } else {
              ele.children[ele.children.length - 1].classList.add("item-sec");
              ele.children[ele.children.length - 1].classList.remove(
                "item-fir"
              );
            }
            ele.classList.add("toggleClass");
          }
        }
      }
    });
  },
  filters: {
    substrFormatTime(val) {
      if (!val) return "";
      return val.split(" ")[0];
    }
  },
  methods: {
    toggleClass(index) {
      this.$refs["elememt" + index][0].classList.toggle("toggleClass");
    },
    goFoword(val) {
      if (this.tablePermisson.collection) {
        this.$router.push({
          path: "/addFollowUpListen",
          query: {
            crmCustInfoId: val.crmCustInfoId,
            crmApplyId: val.crmApplyId
          }
        });
      } else {
        this.$router.push({
          path: "/AddfollowUp",
          query: {
            crmCustInfoId: val.crmCustInfoId,
            crmApplyId: val.crmApplyId
          }
        });
      }
    },
    checkPhone() {
      return comonFunc.checkPhone;
    },
    loanClose(index) {
      this.loanIndex = -1;
    },
    rejectLoan(index, val) {
      this.loanIndex = index;
      // this.objRefresed = "";
      let pararms = {
        orderNumber: val.orderPrdNumber
      };
      api
        .getCollectors(pararms)
        .then(res => {
          // 不展示提醒框
          // this.objRefresed = "";
          this.objRefresed = res.data.data || "暂无数据";
        })
        .catch(err => {
          this.objRefresed = "暂无数据";
        });
    },
    goOrderDetails(val) {
      val.loanType = "loanType"; //区分是从贷后模块进到基本信息
      this.setItemObj(val);
      this.$router.push({
        path: "/OrderDetails",
        query: {
          crmApplayId: val.crmApplyId
          // menuId: this.$route.query.menuId
        }
      });
    },
    toTop() {
      this.$refs.scroll.$refs.scroll.scrollTo(0, 10);
    },
    onPullingDown() {
      setTimeout(() => {
        this.pageNo = 1;
        this.$emit("onPullingDown", this.pageNo);
        this.$refs.scroll.$refs.scroll.scrollTo(0, 10);
      }, 1000);
    },
    onPullingUp() {
      setTimeout(() => {
        this.pageNo = this.pageNo + 1;
        this.$emit("onPullingUp", this.pageNo);
      }, 1000);
    },
    ...mapActions({
      setItemObj: "SET_ITEM_OBJ"
    })
  },
  components: { Scroll, NoData }
};
</script>
<style  lang="less" scoped>
.toggleClass {
  height: 33px;
  overflow: hidden;
}
.m1 .item-pad {
  margin-right: 10px;
}
.cust-list-item {
  margin: 9px 12px 0;
  font-size: 13px;
  color: #a8a8a8;
  background-color: #fff;
  position: relative;
  .monitoringStatus {
    width: 94px;
    height: 64px;
    display: inline-block;
    position: absolute;
    top: 12px;
    right: 15px;
    background: url("../../assets/images/icon_monitoring_anomaly@3x.png")
      no-repeat;
    background-size: cover;
  }

  .item-pad {
    font-size: 17px;
    padding: 12px 10px;

    // height: 46px;
    // line-height: 46px;
    border-bottom: 1px solid #e5e5e5;
    .item-name {
      color: #333333;
      margin-right: 5px;
    }
  }
  .item-step {
    border-bottom: 1px solid #e5e5e5;
    padding: 22px 10px;
    position: relative;
    .orderList {
      display: flex;
      flex-direction: row;
    }
    .orderList li {
      flex-grow: 1;
      span:nth-child(1) {
        height: 13px;
        display: block;
        color: #404040;
        font-size: 13px;
      }
      span:nth-child(2) {
        display: block;
        color: #a8a8a8;
        font-size: 12px;
        margin-top: 10px;
      }
      #rejectShow {
        color: #0e7fff;
        width: 30px;
      }
    }
    .com-icon-link {
      width: 8px;
      height: 14px;
      background: url("../../assets/images/icon_link@2x.png") no-repeat;
      background-size: 100%;
      position: absolute;
      right: 10px;
      margin-top: -20px;
    }
  }
  .com-icon {
    width: 8px;
    height: 14px;
    background: url("../../assets/images/icon_link@2x.png") no-repeat;
    background-size: 100%;
    position: absolute;
    right: 10px;
    margin-top: 16px;
  }
  .item-bottom {
    padding: 4px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .itemDown {
      height: 8px;
      right: 10px;
      position: absolute;
      background: url("../../assets/images/custImages/icon_spread_default.png")
        no-repeat;
      background-size: 13px 8px;
    }
    .item-fir {
      width: 13px;
      display: inline-block;
      top: 138px;
    }
    .item-sec {
      width: 13px;
      display: inline-block;
      top: 205px;
    }
    .com-tag {
      margin: 6px 4px 6px 0;
    }
    .com-btn {
      margin-top: 3px;
      margin-right: 0;
      font-size: 13px;
      color: #0e7fff;
      padding: 7px;
      border-radius: 13px;
    }
  }
  // @media screen and (max-width: 375px) {
  //   .item-bottom {
  //     .com-tag {
  //       font-size: 6px;
  //     }
  //   }
  // }
  .com_bomb {
    width: 190px;
    height: 70px;
    line-height: 50px;
    right: 30px;
    top: 110px;
    text-align: center;
    position: absolute;
    background: url("../../assets/images/bomb_box@3x.png") no-repeat;
    background-size: cover;
    z-index: 999;
    box-sizing: border-box;
    padding: 10px 20px 10px 10px;
    i {
      width: 15px;
      height: 15px;
      left: 15px;
      top: 15px;
      position: absolute;
      background: url("../../assets/images/bomb_close@3x.png") no-repeat;
      background-size: cover;
    }
  }
}
.allLoan-step {
  border-bottom: 1px solid #e5e5e5;
  padding: 22px 10px;
  position: relative;
  box-sizing: border-box;

  li {
    width: 100%;
    margin-bottom: 16.5px;
    #rejectShow {
      float: right;
    }
    span {
      display: inline-block;
      width: 49%;
    }
    span:nth-child(1) {
      color: rgba(168, 168, 168, 1);
      font-size: 12px;
    }
    span:nth-child(2) {
      text-align: right;
      color: rgba(64, 64, 64, 1);
      font-size: 13px;
    }
    #rejectShow {
      color: #0e7fff;
      width: 30px;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
}
.cust-list {
  .cust-list-item:last-child {
    margin-bottom: 9px;
  }
}
</style>

// <style lang="less">
// .bom-scroll {
//   .cube-scroll-content {
//     display: inline-block;
//     .cube-scroll-list-wrapper {
//       width: 100%;
//     }
//     .list-wrapper {
//       width: 100%;
//       // position: relative;
//       overflow: hidden;
//       white-space: nowrap;
//     }
//     li {
//       display: inline-block;
//     }
//   }
//   .com-btn {
//     position: absolute;
//     right: 6px;
//   }
// }
//
</style>
