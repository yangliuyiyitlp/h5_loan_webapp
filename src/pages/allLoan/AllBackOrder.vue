<template>
  <div class="cust-wrap">
    <div class="cust-search com-fix">
      <CommonSearch @search='search' :backTitle="backTitle"></CommonSearch>
      <div class="filter-data">
        <ul class="clearfix">
          <li>
            <span :class="{active:isTimer}" @click='filterTab("isTimer")'>注册时间排序
              <i></i>
            </span>
            <transition name="fade">
              <div class="or-show-filter" v-if="showFade">
                <div class="filter-pad">
                  <div class="filter-item" @click='clickItem' :class="{activeBg:clickItemFlag}">
                    <p>注册时间排序
                      <span></span>
                    </p>
                  </div>
                </div>
              </div>
            </transition>
          </li>
          <li>
            <span :class="{active:isFil}" @click='filterTab("isFil")'>筛选
              <i></i>
            </span>
            <transition name="fade">
              <div class="or-show-filter" v-if="showFadeFilter">
                <div class="filter-main">
                  <div class="com-border-top-1px filter-pad18 com-flex">
                    <div class="com-right width-con">状态</div>
                  </div>
                  <div class="com-border-top-1px filter-pad18 com-flex">
                    <div class="com-right width-con">注册类型</div>
                  </div>
                </div>
                <div class="filter-btns">
                  <CommonResetBtn @resetFn="resetFn" @submitFn="submitFn"></CommonResetBtn>
                </div>
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </div>
    <div class="cust-list com-scroll">
      <!-- <button><router-link to="/customerDet">详情</router-link></button> -->
      <div class="cust-list-item" v-for='i in 5' :key='i'>
        <div class="list-item-top item-pad">
          <div class="item-title">
            <span class="item-name">周四【6】</span>
            <a href="tel:110" class="item-phone">12388886666</a>
          </div>
          <div class="item-time">注册时间：2018-02-27
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="item-bottom clearfix">
          <span class="com-tag">苏州门店</span>
          <span class="com-tag">业务一部</span>
          <span class="com-tag">丽丽</span>
          <span class="com-btn fr">跟进</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonSearch from "@/components/CommonSearch";
  import CommonResetBtn from "@/components/CommonResetBtn";

  export default {
    name: "allCustomerList",
    data() {
      return {
        isTimer: false,
        isFil: false,
        clickItemFlag: true,
        showFade: false,
        showFadeFilter: false,
        backTitle: "全部逾期订单",
        searchCon: "",
        placeholder: "ssa"
      };
    },
    mounted() {},
    methods: {
      search(val) {
        console.log(val, 90909);
      },
      filterTab(type) {
        // this.isTimer = type == "isTimer" ? true : false;
        // this.isTeam = type == "isTeam"? true : false
        if (type == "isTimer") {
          this.isTimer = !this.isTimer
          this.isFil = false
        }
        if (type == "isFil") {
          this.isFil = !this.isFil
          this.isTimer = false
        }
        this.showFade = this.isTimer ? true : false
        this.showFadeFilter = this.isFil ? true : false
      },
      clickItem(type) {
        this.clickItemFlag = !this.clickItemFlag;
        this.showFade = !this.showFade;
        if (!this.showFade) {
          this.isTimer = false
        }
      },
      submitFn() {
        this.showFadeFilter = false
      },
      resetFn() {
        alert("resetFn");
      }
    },
    watch: {},
    components: {
      CommonSearch,
      CommonResetBtn
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .cust-wrap {
    .filter-data {
      &>ul {
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
            margin-left: 5px; // background: url("../../assets/images/icon_drop_down_click@3x.png") no-repeat;
            background: url("../../assets/images/icon_drop_down_default@3x.png") no-repeat;
            background-size: 100%;
          }
          span.active {
            color: #0e7fff;
            i {
              background: url("../../assets/images/icon_drop_down_click@3x.png") no-repeat;
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
            line-height: 32px; // height: 32px;
            padding: 12px 9px 12px 10px;
            background-color: #fff;
          }
          .city-wrap {
            position: relative;
            padding-bottom: 48px;
            .citys {
              width: 100%;
              margin-top: 15px;
              margin-bottom: 15px;
              ul {
                li {
                  float: left;
                  width: 30%;
                  background-color: #f5f5f5;
                  font-size: 0.12rem;
                  color: #333333;
                  margin-right: 5%;
                  margin-bottom: 2.5%;
                  &:nth-child(3n+1) {
                    // text-align: left
                  }
                  &:nth-child(3n) {
                    // text-align: right;
                    margin-right: 0;
                  }
                  &:nth-last-child(1),
                  &:nth-last-child(2),
                  &:nth-last-child(3) {
                    margin-bottom: 0;
                  }
                  span {
                    display: inline-block;

                    background-color: #f5f5f5;
                    font-size: 0.12rem;
                    color: #333333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                  }
                }
              }
            }
          }
          .width-con {
            color: #737373;
            font-size: 15px;
            width: 60px;
            margin-right: 10px;
          }
          .filter-main {
            position: absolute;
            width: 100%;
            top: 0;
            bottom: 46px;
            background-color: red;
            z-index: 8888;
            left: 0;
            right: 0;
            /* height: 100%; */
            overflow: auto; // padding-bottom: 50px;
          }
          .filter-btns {
            position: absolute;
            bottom: 46px;
            left: 0;
            width: 100%;
            color: #eee;
            z-index: 121212;

          }
          .width-left {
            // justify-content: space-between;
            span {
              display: inline-block;
              width: 30%;
              background-color: #f5f5f5;
              font-size: 0.12rem;
              color: #333333;
              margin-right: 5%;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }

      .search-con {
        align-content: flex-start;
        flex-direction: wrap;
        -webkit-flex-wrap: wrap;
        input {
          display: block;
          font-size: 12px;
          width: 100%;
          line-height: 18px;
          height: 18px;
          flex: 1;
          background: #f5f5f5;
        }
        .search-pad {
          width: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 7px 10px 7px 5px;
          border-radius: 28px; // background:rgba(255,255,255,1);
          // opacity:0.14;
          // color: #fff;
          // background: rgba(255,255,255,0.14);
          background-color: #f5f5f5;
          color: #a8a8a8;
          span {
            width: 35px;
            height: 18px;
            text-align: center;
          }
          .icon-search {
            width: 18px;
            height: 18px;
            display: inline-block;
            background: url("../../assets/images/icon_search_gray@3x.png") no-repeat;
            background-size: 18px 18px;
            margin-left: 0;
            vertical-align: top;
          }
        }
      }
    }
    .cust-list-item {
      margin: 9px 12px 0;
      font-size: 13px;
      color: #A8A8A8;
      background-color: #fff;
      .item-pad {
        font-size: 17px;
        padding: 12px 10px 0 12px;
        border-bottom: 1px solid #E5E5E5;
        .item-name {
          color: #333333;
        }
        .item-phone {
          color: #0E7FFF;
        }
        .item-time {
          font-size: 13px;
          color: #A8A8A8;
          margin: 15px 0;
          .com-icon-link {
            width: 8px;
            height: 14px; // width: 10px;
            // height: 18px;
            background: url("../../assets/images/icon_link@2x.png") no-repeat;
            background-size: 100%;
            margin-top: 0;
          }
        }

      }
      .item-bottom {
        padding: 8px 12px 12px;
        font-size: 0;
        .com-tag {
          margin-right: 10px;
          margin-top: 4px;
          &:nth-child(3) {
            margin-right: 0;
          }
        }
        .com-btn {
          font-size: 13px;
          color: #0E7FFF;
        }
      }
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to/* .fade-leave-active below version 2.1.8 */
      {
      opacity: 0;
    }
  }
</style>
