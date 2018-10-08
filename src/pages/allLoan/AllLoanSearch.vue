<template>
<div class='component-orderSearch'>
  <div class="filter-data">
          <ul class="clearfix">
            <li>
              <span :class="{active:isTimer}" @click = 'filterTab("isTimer")'>订单申请时间<i></i></span>
              <transition name="fade">
                <div class="or-show-filter" v-if="showFade">
                  <div class="filter-pad">
                    <div class="filter-item activeBg" @click = 'clickItem'>
                      <p>订单申请时间<span></span></p>
                    </div>
                  </div>
                </div>
              </transition>
            </li>
            <li>
              <span :class="{active:isFil}" @click = 'filterTab'>筛选<i></i></span>
                <transition name="fade">
                <div class="or-show-filter" v-show="showFadeFilter" >
                  <div class="filter-main">
                   <div class="com-border-top-1px filter-pad18 com-flex city-wrap" >
                      <div class="com-right width-con">{{allLoanTab.title}}</div>
                      <div class="search-con com-flex1 com-flex">
                        <div>
                          <input v-model="search.dayBegin"  class ='search-input' placeholder="请输入" />
                             <i @click='timeBegin'></i>
                        </div>
                          <span>——</span>
                          <div >
                         <input v-model="search.dayEnd"  class ='search-input' placeholder="请输入"  />
                           <i @click='timeEnd'></i>
                          </div>
                         
                        </div>
                      </div>
                    <div class="com-border-top-1px filter-pad18 com-flex"  v-if='allLoanTab.overDueTab'>
                      <div class="com-right width-con" > 逾期状态</div>
                      <div class="width-left com-flex1 com-flex selectPar">                        
                        <span v-for = '(item, index) in productState'  :key = 'index'  :class="{'check-select': checked.indexOf(item)>=0 }"
                         @click = 'selectCustFn(item,index)'>M{{item}}</span>                        
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
  props: {
    allLoanTab: {
      type: Object,
      default: function() {
        return {
          overDueTab: true, //m1 逾期
          title: "逾期天数",
          tip: "逾期天数起点天数不能大于终点天数"
        };
      }
    }
  },
  data() {
    return {
      isTimer: true,
      isFil: false,
      clickItemFlag: true,
      showFade: false,
      showFadeFilter: false,
      currentDate: "",
      checked: [],
      orderNode: [],
      search: {
        dayBegin: null,
        dayEnd: null,
        overdueStatusBegin: null,
        overdueStatusEnd: null
      },
      orderStatus: [],
      productState: []
    };
  },
  mounted() {
    this.queryPageDictionaryDetailFn();
  },

  watch: {
    search: {
      handler(val, oldVal) {
        if (val.dayBegin) {
          this.search.dayBegin = val.dayBegin.replace(/[^0-9$]/g, "");
        }
        if (val.dayEnd) {
          this.search.dayEnd = val.dayEnd.replace(/[^0-9$]/g, "");
        }
        // 输入的逾期天数起点的天数不能大于终点的天数
      },
      deep: true
    }
  },
  methods: {
    timeBegin() {
      this.search.dayBegin = "";
    },
    timeEnd() {
      this.search.dayEnd = "";
    },
    queryPageDictionaryDetailFn() {
      let pararms = {
        code: "000016",
        pageNo: 1,
        pageSize: 100,
        status: 1
      };
      this.productState = [];
      api.queryPageDictionaryDetail(pararms).then(res => {
        if (res.data.data) {
          for (var i = 1; i <= Number(res.data.data[0].price); i++) {
            this.productState.push(i);
          }
        }
      });
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
        // this.resetFilter();
        this.showFadeFilter = !this.showFadeFilter;
        this.showFade = false;
      }
    },
    clickItem(type) {
      this.clickItemFlag = !this.clickItemFlag;
      this.showFade = !this.showFade;
    },
    selectCustFn(item, index) {
      var index = this.checked.indexOf(item);
      if (index > -1) {
        this.checked.splice(index, 1);
      } else {
        this.checked.push(item);
      }

      console.log(this.checked);
    },
    submitFn() {
      // 逾期天数 放款天数
      if (+this.search.dayBegin > +this.search.dayEnd) {
        this.showToast(this.allLoanTab.tip, "warn", 2000);
        console.log(+this.search.dayBegin);
        return false;
      }

      //获取选中的逾期状态
      if (this.checked.length > 2 || this.checked.length == 1) {
        console.log(this.checked);
        this.showToast("逾期状态请选择开始和结束2个值", "warn", 2000);
        return false;
      }
      function sortNum(a, b) {
        //升序
        return a - b;
      }
      this.checked.sort(sortNum);
      this.search.overdueStatusBegin = this.checked[0];
      this.search.overdueStatusEnd = this.checked[1];

      console.log(this.search);
      this.showFadeFilter = false;
      this.$emit("searchAllLoan", this.search);
    },
    resetFn() {
      this.resetFilter();
    },
    resetFilter() {
      this.search = {
        dayBegin: "",
        dayEnd: "",
        overdueStatusBegin: "",
        overdueStatusEnd: ""
      };
      this.checked = [];
    }
  },
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
        }
        .width-con {
          color: #737373;
          font-size: 15px;
          width: 60px;
          margin-right: 10px;
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
          max-height: 80%;
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
        text-align: center;
        position: relative;
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
       i {
        position: absolute;
        top: 6px;
        right: 5px;
        width: 18px;
        height: 18px;
        background: url("../../assets/images/bomb_close@3x.png") no-repeat;
        background-size: 18px 18px;
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
