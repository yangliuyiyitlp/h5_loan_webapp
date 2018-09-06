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
        <div class="cust-list-item" v-if=isShow v-for = '(val,index) in tableList' :key='index'>
          
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
                 <span >{{val.nodeName}} </span>
                 <span>放款天数</span>
                  </li>
                   <li v-if='tablePermisson.minitor'>
                 <span >{{val.nodeName}} </span>
                 <span>距还款日</span>
                  </li>
                </ul>
            </div>
            
          <div class="item-bottom clearfix">
             <span class="com-tag" v-if='val.compName'>{{val.compName}}</span>
              <span class="com-tag" v-if='val.deptName'>{{val.deptName}}</span>
              <span class="com-tag" v-if='val.empName'>{{val.empName}}</span>
               <span  v-if = 'val.cpName'  class="com-tag js-blue js-border">{{val.cpName}}</span>
                <span class="com-btn js-blue fr" @click='goFoword(val)'>跟进</span>
            </div>
          </div>
        </div>
        
        <!-- 全部逾期订单  M1 -->
        <div class="cust-list-item"  v-if=!isShow v-for = '(val,index) in tableList' :key='index'>
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
                 <span>{{val.overdueDay}}</span>
                  </li>
                 <li>
                 <span>催收机构</span>
                <span id='rejectShow' @click.stop="rejectLoan(index,val)">查看</span>
                 <div :ref='"tip"+ index' v-show='loanIndex==index' class='com_bomb'>{{objRefresed}} <i @click.stop='loanClose(index)'></i></div>
                  </li>

              </ul>
              
            </div> 
            
          <div class="item-bottom clearfix">
              <span class="com-tag" v-if='val.compName'>{{val.compName}}</span>
              <span class="com-tag" v-if='val.deptName'>{{val.deptName}}</span>
              <span class="com-tag" v-if='val.empName'>{{val.empName}}</span>
               <span  v-if = 'val.cpName'  class="com-tag js-blue js-border">{{val.cpName}}</span>
                <span class="com-btn js-blue fr" @click='goFoword(val)'>跟进</span>
          </div>
        </div>
        
          </div>
          </Scroll>
      </div>
    </div>

</template>
<script>
import Scroll from "@/components/Scroll";
import api from "@/api/index";
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
      isShow: false
    };
  },
  created() {
    if (
      this.$route.path == "/MinitorList" ||
      this.$route.path == "/CollectionList"
    ) {
      this.isShow = true;
    } else if (
      this.$route.path == "/OverdueList" ||
      this.$route.path == "/M1List"
    ) {
      this.isShow = false;
    }
  },
  mounted() {
    console.log(this.$store.state.selectOrder, 66666);
  },
  filters: {
    substrFormatTime(val) {
      if (!val) return "";
      return val.split(" ")[0];
    }
  },
  methods: {
    goFoword(val) {
      this.$router.push({
        path: "/AddfollowUp",
        query: {crmCustInfoId:val.crmCustInfoId}
      });
    },
    checkPhone() {
      return comonFunc.checkPhone;
    },
    loanClose(index) {
      this.loanIndex = -1;
    },
    rejectLoan(index, val) {
      this.loanIndex = index;
      this.objRefresed = "";
      	let pararms = {
					orderNumber: val.orderPrdNumber
  			}
  			api.getCollectors(pararms).then(res => {  // 不展示提醒框
							this.objRefresed = ''
						this.objRefresed = res.data.data || "暂无数据"
  			})
    },
    goOrderDetails(val) {
      this.$router.push({
        path: "/OrderDetails",
        query: {
          crmApplayId: val.crmApplyId
          // menuId: this.$route.query.menuId
        }
      });
    },
      toTop(){
       this.$refs.scroll.$refs.scroll.scrollTo(0, 10, 500);
    },
    onPullingDown() {
      setTimeout(() => {
        this.pageNo = 1;
        this.$emit("onPullingDown", this.pageNo);
        this.$refs.scroll.$refs.scroll.scrollTo(0, 10, 500);
      }, 1000);
    },
    onPullingUp() {
      setTimeout(() => {
        this.pageNo = this.pageNo + 1;
        this.$emit("onPullingUp", this.pageNo);
      }, 1000);
    }
  },
  components: { Scroll }
};
</script>
<style  lang="less" scoped>
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
    padding: 0 10px;
    height: 46px;
    line-height: 46px;
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
    padding: 10px 10px;
    font-size: 0;
  //   display: flex;
  //  flex-wrap:wrap;
  //  justify-content:space-between;
    // span{
      // flex:1
    // }
    .com-tag {
      margin-right: 5px;
      margin-top: 4px;
  
    }
    .com-btn {
        //  margin-top: 4px;
      margin-right: 0;
      font-size: 13px;
      color: #0e7fff;
    }
  }
  @media screen and (max-width:375px) {
    .item-bottom {
       padding:5px;
      .com-tag {
        margin-right: 4px;
        margin-top: 4px;
        font-size:6px;
      }
      .com-btn {
        padding:  7px 4px;
        border-radius: 13px;
      }
    }
  }
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


