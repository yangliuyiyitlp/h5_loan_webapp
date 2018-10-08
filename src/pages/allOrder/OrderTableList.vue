<template>
    <div>
         <div :class="$route.path == '/AllOrderList'?'cust-list com-scroll':'cust-list com-scroll order-scroll'">
         <!-- <div class="cust-list com-scroll "> -->
            <Scroll
          ref="scroll"		
          :data="tableList"				  
          :options="options"
          @onPullingDown="onPullingDown"
          @onPullingUp="onPullingUp"
          >
           <div class="wrap_con" slot="scollCon">	
             
        <div class="cust-list-item"  v-for = '(val,index) in tableList' :key='index'>
          
          <i  v-if='val.hangStatus ==1 || val.hangStatus == 2' class='isHang'></i> 
          <i :class="{1:'application',2:'progress',6:'progress',7:'progress',8:'progress',9:'progress',4:'cleared',5:'rejected',10:'rejected',3:'repayment'}[val.orderStatus]"></i>
      
          <div class="list-item-top item-pad">
            <div class="item-title"><span class="item-name">{{val.custName}}</span>
            <!-- <a href="tel:110" class="js-blue">{{val.custMobile}}</a> -->
                <a v-if='checkPhone(val.custMobile)'  class="js-blue">{{val.custMobile}}</a>
                  <a v-else :href='"tel:" + val.custMobile' class="js-blue">{{val.custMobile}}</a>
            </div>
          </div>
          <!-- <div class="item-step clearfix" @click='goOrderDetails(val)'> -->
          <div class="item-step clearfix"  @click="val.orderStatus != 4?goOrderDetails(val):goNull">
            
              <ul class='orderList' >
                 <li v-if='val.orderStatus == 1'>
                 <span >{{val.nodeName}} </span>
                 <span>申请环节</span>
                  </li>
                 <li v-if='val.orderStatus == 2||val.orderStatus == 6||val.orderStatus == 7||val.orderStatus == 8||val.orderStatus == 9'>
                 <span >{{val.nodeName}}</span>
                 <span>环节</span>
                  </li>
                  <li  v-if = 'tablePermisson.applyTime'>
                 <span>{{val.applyTime}}</span>
                 <span>申请时间</span>
                  </li>
                   <!--总控订单 START-->
                  <li  v-if = 'tablePermisson.applicationTime'>
                 <span>{{val.applyTime}}</span>
                 <span>申请时间</span>
                  </li>
                   <!--总控订单 END-->
                   <li v-if='val.hangStatus ==1 || val.hangStatus == 2'>
                 <span>{{val.hangTime}}</span>
                 <span>挂起时间</span>
                  </li>
                  <li v-if='val.orderStatus ==3'>
                 <span>{{val.loanTime}}</span>
                 <span>放款时间</span>
                  </li>
                  <li v-if='val.orderStatus ==4'>
                 <span>{{val.finishTime}}</span>
                 <span>结清时间</span>
                  </li>
                  <li v-if='val.orderStatus ==5|| val.orderStatus ==10'>
                 <span>{{val.refuseTime}}</span>
                 <span>拒单时间</span>
                  </li>
                   <!-- <li v-if='val.orderStatus ==5|| val.orderStatus ==10'>
                 <span id='rejectShow' @click.stop='rejectShow'>查看</span>
                 <span>拒绝原因</span>
                  </li> -->
              <!-- <li v-if='val.orderStatus ==5|| val.orderStatus ==10'>
               
                 <span id='rejectShow'
                    @click.stop="rejectShow(index)">查看</span>
                 <cube-tip :ref='"tip"+ index' direction="right"  offsetTop='12px' >Tip</cube-tip>
                 <span>拒绝原因</span>
                  </li> -->
                 <li v-if='val.orderStatus ==5|| val.orderStatus ==10'>
                 <span id='rejectShow' @click.stop="rejectShow(index,val.applyId)">查看</span>
                 <span>拒绝原因</span>
                 <div :ref='"tip"+ index' v-show='activeIndex==index' class='com_bomb'>{{objRefresed}}<i @click.stop='bombClose(index)'></i></div>
                 
                  </li>

              </ul>
              <!-- 订单状态：1申请中,2审批中,3还款中,4已结清,5拒绝,6线上筹资中,7满标,10退件 -->
              <i class="com-icon-link fr" v-if='val.orderStatus != 4'></i>
            </div> 

             <div class="item-bottom clearfix">
               <span  class="com-tag" v-if='val.compName'>{{val.compName}}</span>
              <span class="com-tag" v-if='val.deptName'>{{val.deptName}}</span>
              <span class="com-tag" v-if='val.empName'>{{val.empName}}</span>
              <span  v-if = 'tablePermisson.applyTime && val.proName'  class="com-tag js-blue bor-blu">{{val.proName}}</span>
              <span v-if = 'tablePermisson.applicationTime && val.cpName' class="com-tag js-blue bor-blu">{{val.cpName}}</span>
             </div>
            
          <!-- <div class="item-bottom clearfix bom-scroll">
            <cube-scroll
    ref="scrolBom"
    direction="horizontal">
            <ul class="list-wrapper">
              <li class="com-tag" v-if='val.compName'>{{val.compName}}</li>
              <li class="com-tag" v-if='val.deptName'>{{val.deptName}}</li>
              <li class="com-tag" v-if='val.empName'>{{val.empName}}</li>
              <li  v-if = 'tablePermisson.applyTime && val.proName'  class="com-tag js-blue bor-blu">{{val.proName}}</li>
              <li v-if = 'tablePermisson.applicationTime && val.cpName' class="com-tag js-blue bor-blu">{{val.cpName}}</li>
           </ul>
             </cube-scroll>
          </div> -->
        </div>
          </div>
          </Scroll>
      </div>
       <NoData v-if = "tableList.length == 0"></NoData>
    </div>

</template>
<script>
import Scroll from "@/components/Scroll";
import api from "@/api/index";
import NoData from "@/components/NoData";
import { mapActions } from "vuex";
import comonFunc from "@/utils/commonFunc";
export default {
  name: "orderTableList",
  props: {
    tableList: {
      type: Array,
      default: []
    },
    tablePermisson: {
      type: Object,
      default: function() {
        return {
          applicationTime: false, //控制总控管理的table的字段
          applyTime: true //控制订单管理的table的字段
        };
      }
    }
  },
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      activeIndex: -1,
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
      }
    };
  },
  mounted() {},
  created() {},
  // beforeUpdate() {

  //   //底部内容过长滑动
  //   this.$nextTick(function() {
  //     let scrollBom = document.getElementsByClassName("item-bottom");

  //     let liArr = [];
  //     for (let a = 0; a < scrollBom.length; a++) {
  //       liArr[a] = scrollBom[a].getElementsByTagName("li");
  //     }
  //     let liArrLength = [];
  //     for (let i = 0; i < liArr.length; i++) {
  //       let liLength =0;
  //       for (let j = 0; j < liArr[i].length; j++) {
  //         console.log(liArr[i][j].offsetWidth)
  //         liLength += liArr[i][j].offsetWidth + 10;
  //       }
  //       liArrLength.push(liLength);
  //     }
  //     console.log(liArrLength);
  //     let scrollDiv = document.getElementsByClassName("cube-scroll-content");
  //     console.log(scrollDiv);
  //     for (let k = 1; k < scrollDiv.length; k++) {
  //       if (scrollDiv[k].offsetWidth < liArrLength[k - 1]) {
  //         scrollDiv[k].style.width = liArrLength[k - 1] + "px";
  //         console.log( scrollDiv[k].style.width)
  //       }
  //     }
  //   });
  // },
  methods: {
    ...mapActions({
      setItemObj: "SET_ITEM_OBJ"
    }),
    checkPhone() {
      return comonFunc.checkPhone;
    },
    rejectShow(index, crmApplayId) {
      // this.$refs["tip" + index][0].show();
      // this.$createDialog(
      //   {
      //     type: "alert",
      //     showClose: true,
      //   },
      //   createElement => {
      //     return [
      //       createElement(
      //         "div",
      //         {
      //           class: {
      //             "bomb_box": true
      //           },
      //           slot: "content"
      //         },
      //       )
      //     ];
      //   }
      // ).show();
      this.activeIndex = index;

      this.objRefresed = '';
      api
        .queryRefusalReason({
          crmApplayId: crmApplayId
        })
        .then(res => {
          if (res.data.success) {
            if (res.data.data) {
              this.objRefresed = res.data.data.refusalReason || "暂无数据";
            }
          } else {
            this.objRefresed = "暂无数据";
          }
        });
    },
    bombClose(index) {
      this.activeIndex = -1;
    },
    goNull() {
      return false;
    },
    goOrderDetails(val) {
      val.orderType = "orderType"; //区分是从订单模块进到基本信息
      this.setItemObj(val);
      this.$router.push({
        path: "/OrderDetails",
        query: {
          crmApplayId: val.applyId,
          orderStatus: val.orderStatus
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
    }
  },
  watch: {},
  components: { Scroll, NoData }
};
</script>
<style  lang="less" scoped>
.cust-list-item {
  margin: 9px 12px 0;
  font-size: 13px;
  color: #a8a8a8;
  background-color: #fff;
  position: relative;
  .isHang {
    width: 18px;
    height: 17px;
    display: inline-block;
    position: absolute;
    top: 11px;
    margin-left: -12px;
    background: url("../../assets/images/OrderImages/icon_suspend_customer@3x.png")
      no-repeat;
    background-size: cover;
  }
  .application,
  .progress,
  .cleared,
  .rejected,
  .repayment {
    width: 76px;
    height: 54px;
    display: inline-block;
    position: absolute;
    right: 0px;
  }
  .application {
    //申请中
    background: url("../../assets/images/OrderImages/icon_applicatio@3x.png")
      no-repeat;
    background-size: cover;
  }
  .progress {
    // 审批中
    background: url("../../assets/images/OrderImages/icon_approval_in_progress@3x.png")
      no-repeat;
    background-size: cover;
  }
  .cleared {
    // 已结清
    background: url("../../assets/images/OrderImages/icon_cleared@3x.png")
      no-repeat;
    background-size: cover;
  }
  .rejected {
    //拒绝
    background: url("../../assets/images/OrderImages/icon_rejected@3x.png")
      no-repeat;
    background-size: cover;
  }
  .repayment {
    //还款中
    background: url("../../assets/images/OrderImages/icon_repayment@3x.png")
      no-repeat;
    background-size: cover;
  }
  .item-pad {
    font-size: 17px;
    padding: 12px 10px;
    // margin-right:76px;
    // padding: 0 10px;
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
    li {
      //   .cube-tip {
      //     left: 105px;
      //     top: 25px;
      //     width: 120px;
      //     height: 30px;
      //     text-align: center;
      //     padding: 5px;
      //     .cube-tip-close {
      //       right: 0;
      //       top: 0;
      //     }
      //     .cube-tip-content {
      //       min-height: 30px;
      //       line-height: 30px;
      //     }
      //   }
      .com_bomb {
        width: 150px;
        min-height: 70px;
        // line-height: 50px;
        // display:table-cell;
        // vertical-align:middle;
        // text-align:center;
        right: 97px;
        top: 20px;
        text-align: center;
        position: absolute;
        background: url("../../assets/images/bomb_box@3x.png") no-repeat;
        background-size: contain;
        z-index: 99;
        box-sizing: border-box;
        padding: 20px 20px 10px 25px;
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
  .item-bottom {
    padding: 8px;
    .com-tag {
      margin: 2px 4px 2px 0;
    }
    .bor-blu {
      margin-right: 0;
      border: 1px solid #0e7fff;
    }
  }
}
.cust-list {
  .cust-list-item:last-child {
    margin-bottom: 9px;
  }
}
.martop {
  .com-scroll {
    top: 110px;
  }
}
</style>


// <style lang="less">
// .bom-scroll {
//   .cube-scroll-content {
//     display: inline-block;
//     // width: 130%;
//     .cube-scroll-list-wrapper {
//       width: 100%;
//     }
//     .list-wrapper {
//       width: 100%;
//       position: relative;
//       overflow: hidden;
//       white-space: nowrap;
//     }
//     li {
//       display: inline-block;
//     }
//   }
// }
//
//
</style>
