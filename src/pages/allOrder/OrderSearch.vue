<template>
<div class='component-orderSearch'>
  <div class="filter-data">
          <ul class="clearfix">
            <li>
              <span :class="{active:isTimer}" @click = 'filterTab("isTimer")'>申请时间排序<i></i></span>
              <transition name="fade">
                <div class="or-show-filter" v-if="showFade">
                  <div class="filter-pad">
                    <div class="filter-item activeBg" @click = 'clickItem'>
                      <p>申请时间排序<span></span></p>
                    </div>
                    <!-- <div class="filter-item" @click = 'clickItem' :class="{activeBg: !clickItemFlag}">
                      <p>更新时间排序<span></span></p>
                    </div> -->
                  </div>
                </div>
              </transition>
            </li>
            <li>
              <span :class="{active:isFil}" @click = 'filterTab'>筛选<i></i></span>
                <transition name="fade">
                <div class="or-show-filter" v-show="showFadeFilter" >
                 
                  <div class="filter-main clearfix">                 
                    <div class="com-border-top-1px filter-pad18 com-flex">
                      <div class="com-right width-con">状态</div>
                      <div class="width-left com-flex1 com-flex selectNode">
                           <!-- <span v-for ='(val,index) in checkListName' :class="{'check-select': checked == val.checkName}" @click = 'selectCustFn(val.detailCode,val.checkName)' :key='index'>{{val.name}}</span> -->
                        <span :class="{'check-select': applyList}" data ='1' @click = 'selectCustFn("000001","applyList")'>申请中</span>
                        <span :class="{'check-select': examList}" data ='2,6,7,8,9'  @click = 'selectCustFn("000002","examList")'>审批中</span>
                         <span :class="{'check-select': repaymentList}" data ='3'   @click = 'selectCustFn( "000003","repaymentList")'>还款中</span>
                         <span :class="{'check-select': payOffList}" data ='4'  @click = 'selectCustFn("000004","payOffList")'>已结清</span>
                         <span :class="{'check-select': rejectList}" data ='5,10' @click = 'selectCustFn("000005","rejectList")'>拒单</span>
                         <span :class="{'check-select': hangs}" @click = 'selectCustFn("0","hangs")'>挂起</span>
                      </div>
                    </div>
                    <div class="com-border-top-1px filter-pad18 com-flex">
                      <div class="com-right width-con">订单环节</div>
                      <div class="width-left com-flex1 com-flex selectPar">                        
                        <span v-for = '(item, index) in orderNode' :key = 'index' :data='item.detailCode' :class="{'check-select': checked == item.detailCode}" @click = 'selectCustFn(item.detailCode,"orderNode",$event,index)'>{{item.name}}</span>                        
                      </div>
                    </div>
                    <div class="com-border-top-1px filter-pad18 com-flex city-wrap">
                      <div class="com-right width-con">申请时间</div>
                      <div class="search-con com-flex1 com-flex">
                        <div>
                          <input v-model="search.applyTimeBegin" class ='search-input' placeholder="请输入" readonly  @focus='showDatePicker("begin")'/>
                          <i @click='timeBegin'></i>
                        </div>
                        
                          <span>——</span>
                          <div>
                         <input v-model="search.applyTimeEnd" class ='search-input' placeholder="请输入"  readonly @focus='showDatePicker("end")'/>
                           <i @click='timeEnd'></i>
                          </div>
                          
                         
                        </div>
                      </div>
                    </div>
                  <div class="filter-btns">
                    <CommonResetBtn @resetFn = "resetFn" @submitFn = "submitFn"></CommonResetBtn>
                  </div>
                 
                </div>
              </transition>
            </li>
          </ul>
        </div> 
        
        </div>
</template>

<script>
import api from "@/api/index";
import CommonResetBtn from "@/components/CommonResetBtn";
export default {
  name: "OrderSearch",
  data() {
    return {
      isTimer: true,
      isFil: false,
      clickItemFlag: true,
      showFade: false,
      showFadeFilter: false,
      currentDate: "",
      applyList: false,
      examList: false,
      repaymentList: false,
      payOffList: false,
      rejectList: false,
      hangs: false,
      checked: null,
      orderNode: [],
      // checkListName: [
      //       { name: "申请中", detailCode: "000001", checkName: "applyList" },
      //       { name: "审批中", detailCode: "000002", checkName: "examList" },
      //       { name: "还款中", detailCode: "000003", checkName: "repaymentList" },
      //       { name: "已结清", detailCode: "000004", checkName: "payOffList" },
      //       { name: "拒单", detailCode: "000005", checkName: "rejectList" },
      //       { name: "挂起", detailCode: "000006", checkName: "hangs" }
      //     ],
      search: {
        orderStatus: "",
        nodeCode: "",
        hangStatus: false,
        applyTimeBegin: "",
        applyTimeEnd: ""
      },
      orderStatus: []
    };
  },
  mounted() {},

  methods: {
    queryPageDictionaryDetailFn(code, type) {
      this.checked = null;
      let pararms = {
        code: code,
        pageSize: 10000,
        status: 1
      };

      api.queryPageDictionaryDetail(pararms).then(res => {
        if (res.data.success) {
          if (type == "add") {
            this.orderNode = this.orderNode.concat(res.data.data);
          } else if (type == "del") {
            res.data.data.forEach((value, index) => {
              let indexCur = this.orderNode.findIndex((val, ind) => {
                return val.id == res.data.data[index].id;
              });
              this.orderNode.splice(indexCur, 1);
            });
          } else {
            this.orderNode = res.data.data;
          }
        } else {
          this.orderNode = [];
        }
        //  			this.showOrderNodeChild = this.orderNode.length > 0 ? false:true
      });
    },
    isChecked(detailCode, isTrue) {
      if (isTrue) {
        this.queryPageDictionaryDetailFn(detailCode, "add");
      } else {
        this.queryPageDictionaryDetailFn(detailCode, "del");
      }
    },
    selectCustFn(detailCode, type, $event, targetIndex) {
      if (type == "applyList") {
        //申请中
        this.applyList = !this.applyList;
        this.isChecked(detailCode, this.applyList);
      }
      if (type == "examList") {
        // 审批中
        this.examList = !this.examList;
        this.isChecked(detailCode, this.examList);
      }
      if (type == "repaymentList") {
        //还款中
        this.repaymentList = !this.repaymentList;
        this.isChecked(detailCode, this.repaymentList);
      }
      if (type == "payOffList") {
        //已结清
        this.payOffList = !this.payOffList;
        this.isChecked(detailCode, this.payOffList);
      }
      if (type == "rejectList") {
        //拒绝
        this.rejectList = !this.rejectList;
        this.isChecked(detailCode, this.rejectList);
      }
      if (type == "hangs") {
        //挂起
        this.hangs = !this.hangs;
        this.search.hangStatus = this.hangs;
      }
      if (type == "orderNode") {
        // 订单环节
        if (this.checked == detailCode) {
          this.checked = null;
        } else {
          this.checked = detailCode;
        }
      }
      // if (type == "orderNode") {
      //   // 订单环节
      //   if ($event.target.className.indexOf("check-select") > -1) {
      //     $event.target.className = "";
      //     this.regType = null;
      //   } else {
      //     $event.target.className = "check-select";
      //     this.regType = targetIndex + 1;
      //     let eles = document.getElementsByClassName("selectPar")[0];
      //     let childEleSpans = eles.getElementsByTagName("span");
      //     for (let i = 0; i < childEleSpans.length; i++) {
      //       if (i != targetIndex) {
      //         childEleSpans[i].className = "";
      //       }
      //     }
      //   }
      // }
    },
    //时间选择 start
    showDatePicker(val) {
      let selectHandle = null;
      if (val == "begin") {
        selectHandle = this.selectHandleBegin;
      } else if (val == "end") {
        selectHandle = this.selectHandleEnd;
      }

      this.datePicker = this.$createDatePicker({
        title: "日期",
        min: new Date(2010, 12, 30),
        max: new Date(2080, 12, 30),
        value: new Date(),
        zIndex: 9999,
        onSelect: selectHandle
      });

      this.datePicker.show();
    },

    selectHandleBegin(date, selectedVal, selectedText) {
      this.search.applyTimeBegin = selectedText.join("-");
    },
    selectHandleEnd(date, selectedVal, selectedText) {
      this.search.applyTimeEnd = selectedText.join("-");
    },
    //时间选择end
    timeBegin() {
      this.search.applyTimeBegin = "";
    },
    timeEnd() {
      this.search.applyTimeEnd = "";
    },

    filterTab(type) {
      this.isTimer = type == "isTimer" ? true : false;
      // this.isTeam = type == "isTeam"? true : false
      this.isFil = !this.isTimer;
      if (this.isTimer) {
        this.showFade = !this.showFade;
        this.showFadeFilter = false;
      }
      if (this.isFil) {
        this.resetFilter();
        this.showFadeFilter = !this.showFadeFilter;
        this.showFade = false;
      }
    },
    clickItem(type) {
      this.clickItemFlag = !this.clickItemFlag;
      this.showFade = !this.showFade;
    },
    submitFn() {
      this.orderStatus = [];
      // 获取选中的状态
      let ele = document.getElementsByClassName("selectNode")[0];
      let childEleSpan = ele.getElementsByTagName("span");
      console.log(childEleSpan);
      for (let i = 0; i < childEleSpan.length; i++) {
        if (
          childEleSpan[i].innerText !== "挂起" &&
          childEleSpan[i].className == "check-select"
        ) {
          this.orderStatus.push(childEleSpan[i].attributes["data"].value);
        }
      }
      this.search.orderStatus = this.orderStatus.join(",");
      // 获取选中的订单环节
      let selectPar = document.getElementsByClassName("selectPar")[0];
      let selectChildSpan = selectPar.getElementsByTagName("span");
      console.log(selectChildSpan);
      for (let i = 0; i < selectChildSpan.length; i++) {
        if (selectChildSpan[i].className == "check-select") {
          this.search.nodeCode = selectChildSpan[i].attributes["data"].value;
        }
      }
      console.log(this.search);
      this.showFadeFilter = false;
      this.$emit("searchOrder", this.search);
      // this.resetFilter();
    },
    resetFn() {
      this.resetFilter();
    },
    resetFilter() {
      (this.search = {
        orderStatus: "",
        nodeCode: "",
        hangStatus: false,
        applyTimeBegin: "",
        applyTimeEnd: ""
      }),
        (this.applyList = false);
      this.examList = false;
      this.repaymentList = false;
      this.payOffList = false;
      this.rejectList = false;
      this.hangs = false;
      this.orderNode = [];
      this.orderStatus = [];
      // 订单环节
      let ele = document.getElementsByClassName("selectPar")[0];
      let childEleSpan = ele.getElementsByTagName("span");
      for (let i = 0; i < childEleSpan.length; i++) {
        childEleSpan[i].className = "";
      }

      let selectPar = document.getElementsByClassName("selectPar")[0];
      let selectChildSpan = selectPar.getElementsByTagName("span");
      for (let i = 0; i < selectChildSpan.length; i++) {
        selectChildSpan[i].className = "";
      }
    }
  },
  watch: {},
  components: { CommonResetBtn }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.component-orderSearch {
  .filter-data {
    & > ul {
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
      li {
        float: left;
        width: 50%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #737373;
        font-size: 15px;
        border-radius: 3px;
        i {
          display: inline-block;
          width: 12px;
          height: 9px;
          margin-left: 5px;
          // background: url("../../assets/images/icon_drop_down_click@3x.png") no-repeat;
          background: url("../../assets/images/icon_drop_down_default@3x.png")
            no-repeat;
          background-size: 100%;
        }
        span.active {
          color: #0e7fff;
          i {
            background: url("../../assets/images/icon_drop_down_click@3x.png")
              no-repeat;
            background-size: 100%;
          }
        }
      }
      .or-show-filter {
        position: fixed;
        width: 100%;
        top: 150px;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 8888;
        left: 0;
        right: 0;

        .filter-pad {
          text-align: left;
          background-color: #fff;
        }
        .filter-item {
          height: 59px;
          line-height: 59px;
          padding: 0 23px 0 21px;
        }
        .activeBg {
          color: #0e7fff;
          background-color: #f5f5f5;
          span {
            width: 24px;
            height: 18px;
            float: right;
            display: inline-block;
            margin-top: 20px;
            background: url("../../assets/images/icon_check@3x.png") no-repeat;
            background-size: 100%;
          }
        }

        .filter-pad18 {
          line-height: 32px;
          // height: 32px;
          padding: 12px 9px 12px 10px;
          background-color: #fff;
        }
        .city-wrap {
          line-height: 28px;
          padding: 12px 9px 12px 10px;
          background-color: #fff;
          position: relative;
          padding-bottom: 20px;
          i {
            position: absolute;
            top: 6px;
            right: 5px;
            width: 20px;
            height: 18px;
            background: url("../../assets/images/bomb_close@3x.png") no-repeat;
            background-size: 20px 18px;
          }
        }
        .width-con {
          color: #737373;
          font-size: 15px;
          width: 60px;
          margin-right: 10px;
        }
        .or-show-filter {
          padding-bottom: 46px;
        }
        .filter-con {
          // position: absolute;
          // margin-bottom: 46px;
          // overflow: auto;
        }
        .filter-main {
          width: 100%;
          top: 0;
          // bottom: 46px;
          // margin-bottom: 46px;
          // overflow: auto;
          // position: absolute;
          // z-index: 8888;
          left: 0;
          right: 0;
          // background-color: #fff;
            max-height:80%;
           overflow: auto;
          .com-flex1 {
            flex-wrap: wrap;
          }
          .check-select {
            position: relative;
            background-color: #ffeae1;
            color: #ff450c;
            &::after {
              content: "";
              display: inline-block;
              position: absolute;
              bottom: 0;
              right: 0;
              width: 22px;
              height: 18px;
              background: url("../../assets/images/icon_close1@3x.png")
                no-repeat;
              background-size: 22px 18px;
            }
          }
        }
        .filter-btns {
          // position: absolute;
          // bottom: 46px;
          // left: 0;
          // width: 100%;
          // color: #eee;
          // z-index: 121212;
        }
        .width-left {
          // justify-content: space-between;
          span {
            display: inline-block;
            width: 30%;
            background-color: #f5f5f5;
            font-size: 0.12rem;
            color: #333333;
            margin-right: 3%;
          }
          span:nth-child(n + 4) {
            margin-top: 12px;
          }
        }
      }
    }

    .search-con {
      align-content: flex-start;
      flex-direction: wrap;
      -webkit-flex-wrap: wrap;
      div {
        position: relative;
        width: 42%;
      }
      input {
        width: 100%;
        height: 28px;
        line-height: 28px;
        text-align: left;
        padding-left: 20px;
        box-sizing: border-box;
        background: rgba(245, 245, 245, 1);
        border-radius: 16px;
        font-size: 12px;
        flex: 1;
      }
      span {
        width: 10%;
        padding: 0 2%;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
