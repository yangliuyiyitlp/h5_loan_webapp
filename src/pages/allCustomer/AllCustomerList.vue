<template>
    <div class="cust-wrap"> 
      <div class="cust-search com-fix">
        <CommonSearch @search = 'search' @clearFn = 'clearFn' :backTitle = "backTitle"></CommonSearch>
        <div class="filter-data" v-if ='showFilterDate'>
          <ul class="clearfix">
            <li>
              <span :class="{active:isTimer}" @click = 'filterTab("isTimer")'>{{filterTit}}<i></i></span>
              <transition name="fade">
                <div class="or-show-filter" v-show="showFade">
                  <div class="filter-pad">
                    <div class="filter-item" @click = 'clickItem(clickItemFlag,1)' :class="{activeBg:clickItemFlag}">
                      <p>注册时间排序<span></span></p>
                    </div>
                    <div class="filter-item" @click = 'clickItem(!clickItemFlag,2)' :class="{activeBg: !clickItemFlag}">
                      <p>最后登录时间排序<span></span></p>
                    </div>
                  </div>
                </div>
              </transition>
            </li>
            <li>
              <span :class="{active:isFil}" @click = 'filterTab("isFil")'>筛选<i></i></span>
              <transition name="fade">
                <div class="or-show-filter" v-show="showFadeFilter" >
                  <div class="filter-main">                 
                    <div class="com-border-top-1px filter-pad18 com-flex">
                      <div class="com-right width-con">状态</div>
                      <div class="width-left com-flex1 com-flex">
                        <span :class="{'check-select': noRealName}" @click = 'selectCustFn(noRealName,"noRealName")'>未实名</span>
                        <span :class="{'check-select': realName}" @click = 'selectCustFn(noRealName,"realName")'>已实名</span>
                        <span :class="{'check-select': traded}" @click = 'selectCustFn(noRealName,"traded")'>已成交</span>
                      </div>
                    </div>
                    <div class="com-border-top-1px filter-pad18 com-flex">
                      <div class="com-right width-con">注册类型</div>
                      <div class="width-left com-flex1 com-flex selectPar">                        
                        <span v-for = '(item, index) in regCustType' :key = 'index' @click = 'selectCustFn(item.value,"regType",$event,index)'>{{item.name}}</span>                        
                      </div>
                    </div>
                    <div class="com-border-top-1px filter-pad18 com-flex city-wrap">
                      <div class="com-right width-con">申请城市</div>
                      <div class="search-con com-flex1 com-flex">
                        <div class="search-pad com-bg">
                          <span>
                            <i class="icon-search" @click="searchCity"></i>
                          </span>
                          <input type="text" placeholder="请输入城市进行搜索" v-model="searchCon">    
                               <i class='icon-clear' @click='searchClear'></i>                   
                        </div>
                        <br>
                        <div class="citys">
                          <div class="clearfix ul-wrap">
                            <span v-for = "(item, index) in arrCity" :key = 'index' @click = 'selectCustFn(item,"city",$event,index,item)'>
                              {{item.cityName}}
                            </span>                          
                          </div>
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
      <div class="cust-list com-scroll" :class="{'cust-top110':!showFilterDate}">
        <!-- <button><router-link to="/customerDet">详情</router-link></button> -->
        <Scroll
          ref="scroll"		
          :data="data"				  
          :options="options"
          @onPullingDown="onPullingDown"
          @onPullingUp="onPullingUp"
          >
          <div class="wrap_con" slot="scollCon">				    	
            <div class="cust-list-item"  @click.prevent.stop = 'goCustDetail(item)' v-for = '(item,ind) in data'   :key='ind'>
              <!-- 1未实名,2已实名,3已成交 -->
              <i class="cust-icon" 
              :class='{"cust-icon-no-realName":item.custStatusCode==1,"cust-icon-realName":item.custStatusCode==2,"cust-icon-done":item.custStatusCode==3 }'
              >
              </i>
              <div class="list-item-top item-pad">
                <div class="item-title">
                  <span class="item-name">{{item.custName}}<span v-if="item.orderNumber != 0 && item.custStatusCode != 1">[{{item.orderNumber}}]</span></span>
                  <a v-if='checkPhone(item.custMobile)' class="item-phone">{{item.custMobile}}</a>
                  <a v-else :href='"tel:" + item.custMobile' class="item-phone">{{item.custMobile}}</a>
                </div>
              </div>
              <div >
                <div class="item-time" >注册时间：{{item.registrationTime}}<i class="com-icon-link fr"></i></div>
                <div class="item-bottom clearfix">
                    <span class="com-tag" v-if='item.compName'>{{item.compName}}</span>
                    <span class="com-tag" v-if='item.deptName'>{{item.deptName}}</span>
                    <span class="com-tag" v-if='item.empName'>{{item.empName}}</span>
                    <span class="com-btn fr" @click.prevent.stop = 'goCustFollow(item)'>跟进</span>
                </div>
              </div>
            </div>
          </div>
		    </Scroll>
        
      </div>
      <NoData v-if = "data.length == 0"></NoData>
    </div>
</template>

<script>
import CommonSearch from "@/components/CommonSearch";
import CommonResetBtn from "@/components/CommonResetBtn";
import Scroll from "@/components/Scroll";
import NoData from "@/components/NoData";
import { mapActions } from "vuex";
import api from "@/api/index";
import comonFunc from "@/utils/commonFunc";
console.log(comonFunc);
export default {
  name: "allCustomerList",
  data() {
    return {
      isTimer: false,
      isFil: false,
      clickItemFlag: true,
      showFade: false,
      showFadeFilter: false,
      noRealName: false,
      realName: false,
      traded: false,
      regType: null,
      backTitle: "全部客户",
      searchCon: "",
      placeholder: "ssa",
      data: [],
      regCustType: [
        {
          name: "自由注册",
          value: 1
        },
        {
          name: "业务员推广",
          value: 2
        },
        {
          name: "邀请好友",
          value: 3
        }
      ],
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
      pageSize: 5,
      pageNo: 1,
      toast: null,
      showFilterDate: false,
      custStatus: "",
      queryParam: "",
      orderByName: 1, //排序字段 (注册时间:1 登录时间 :2)
      arrCity: [],
      cityId: "",
      filterTit: "注册时间排序"
    };
  },
  created() {
    this.toast = this.$createToast({
      time: 1000,
      txt: "加载中...",
      mask: true
    });
    this.checkTypeCustList();
    this.queryHotCityFn();
  },
  mounted() {
    this.queryCustInfoDataFn();
  },
  methods: {
    searchClear() {
      this.searchCon = "";
    },
    ...mapActions({
      setItemObj: "SET_ITEM_OBJ"
    }),
    searchCity() {
      this.cityId = "";
      this.queryHotCityFn();
    },
    queryHotCityFn() {
      let pararms = {
        cityName: this.searchCon
      };
      api.queryHotCity(pararms).then(res => {
        if (res.data.success) {
          this.arrCity = res.data.data;
        }
      });
    },
    goCustDetail(item) {
      // 进入客户详情
      item.custType = "custType"; //区分是从客户进到基本信息
      this.setItemObj(item);
      this.$router.push({
        path: "/customerDet",
        query: {
          crmCustInfoId: item.crmCustInfoId,
          types: 'custType'
        }
      });
    },
    selectCustFn(flag, type, $event, targetIndex, item) {
      // noRealName: true,
      // realName: false,
      // traded: false,
      if (type == "noRealName") {
        this.noRealName = !this.noRealName;
      }
      if (type == "realName") {
        this.realName = !this.realName;
      }
      if (type == "traded") {
        this.traded = !this.traded;
      }
      // console.log(this.noRealName, this.realName, this.traded, "====");
      if (type == "regType") {
        // 注册类型
        if ($event.target.className.indexOf("check-select") > -1) {
          $event.target.className = "";
          this.regType = null;
        } else {
          $event.target.className = "check-select";
          this.regType = targetIndex + 1;
          let eles = document.getElementsByClassName("selectPar")[0];
          let childEleSpans = eles.getElementsByTagName("span");
          for (let i = 0; i < childEleSpans.length; i++) {
            if (i != targetIndex) {
              childEleSpans[i].className = "";
            }
          }
        }
      }
      if (type == "city") {
        // 申请城市
        if ($event.target.className.indexOf("check-select") > -1) {
          $event.target.className = "";
          this.applyCity = null;
          this.cityId = "";
        } else {
          $event.target.className = "check-select";
          this.cityId = item.cityId;
          this.applyCity = targetIndex;
          let ele = document.getElementsByClassName("ul-wrap")[0];
          let childEleSpan = ele.getElementsByTagName("span");
          for (let i = 0; i < childEleSpan.length; i++) {
            if (i != targetIndex) {
              childEleSpan[i].className = "";
            }
          }
        }
      }
      // console.log(this.applyCity , "applyCity");
      console.log(this.cityId, "regType");
    },
    checkTypeCustList() {
      // 全部，未实名，实名，成交客户列表
      let pararms = this.$route.query;
      if (pararms.type && pararms.type == "allCust") {
        //全部客户
        this.showFilterDate = true;
        this.custStatus = "";
      } else {
        this.showFilterDate = false;
      }
      if (pararms.custStatus && pararms.custStatus == 1) {
        this.backTitle = "未实名客户";
      } else if (pararms.custStatus && pararms.custStatus == 2) {
        this.backTitle = "已实名客户";
      } else if (pararms.custStatus && pararms.custStatus == 3) {
        this.backTitle = "已成交客户";
      } else {
        this.backTitle = "全部客户";
      }
      this.custStatus = pararms.custStatus;
      console.log(pararms);
    },
    checkPhone() {
      return comonFunc.checkPhone;
    },
    search(val) {
      this.queryParam = val;
      this.onPullingDown();
      console.log(val, 90909);
    },
    clearFn() {
      this.queryParam = "";
    },
    filterTab(type) {
      // this.isTimer = type == "isTimer" ? true : false;
      // this.isTeam = type == "isTeam"? true : false
      if (type == "isTimer") {
        this.isTimer = !this.isTimer;
        this.isFil = false;
      }
      if (type == "isFil") {
        this.isFil = !this.isFil;
        this.isTimer = false;
      }
      this.showFade = this.isTimer ? true : false;
      this.showFadeFilter = this.isFil ? true : false;
      // if (this.showFadeFilter) {
      //   this.resetFilter()
      // }
    },
    clickItem(flag, val) {
      if (!flag) {
        this.clickItemFlag = !this.clickItemFlag;
      }
      if (val == 1) {
        this.filterTit = "注册时间排序";
      } else if (val == 2) {
        this.filterTit = "最后登录时间排序";
      }
      this.orderByName = val;
      this.showFade = !this.showFade;
      if (!this.showFade) {
        this.isTimer = false;
      }
      this.queryCustInfoDataFn();
    },
    submitFn() {
      this.showFadeFilter = false;
      this.isFil = false;
      this.onPullingDown();
    },
    resetFn() {
      this.resetFilter();
    },
    resetFilter() {
      this.noRealName = false;
      this.realName = false;
      this.traded = false;
      this.regType = null;
      this.applyCity = null;
      this.searchCon = "";
      this.cityId = "";
      // 注册形式
      let ele = document.getElementsByClassName("selectPar")[0];
      let childEleSpan = ele.getElementsByTagName("span");
      for (let i = 0; i < childEleSpan.length; i++) {
        childEleSpan[i].className = "";
      }
      // 城市申请
      let eles = document.getElementsByClassName("ul-wrap")[0];
      let childEleSpans = eles.getElementsByTagName("span");
      for (let i = 0; i < childEleSpans.length; i++) {
        childEleSpans[i].className = "";
      }
    },
    tab() {
      console.log(12121);
    },
    goCustFollow(item) {
      this.setItemObj(item);
      this.$router.push({
        path: "/addCustFollowUp",
        query: {
          crmCustInfoId: item.crmCustInfoId
        }
      });
    },
    queryCustInfoDataFn() {
      if (this.showFilterDate) {
        //筛选条件存在
        let custStatus;
        let par1 = this.noRealName ? "1" : "";
        let par2 = this.realName ? "2" : "";
        let par3 = this.traded ? "3" : "";
        this.custStatus = (par1 + par2 + par3).split("");
      }
      console.log(this.custStatus, "this.custStatus");
      let pararms = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        custStatus: this.custStatus,
        pushType: this.regType,
        queryParam: this.queryParam,
        oneSelf: this.$route.query.oneSelf,
        orderByName: this.orderByName,
        cityId: this.cityId
      };
      this.toast.show();
      api.queryCustInfoData(pararms).then(res => {
        this.toast.hide();
        if (res.data.success && res.data.data) {
          this.data = this.data.concat(res.data.data);
          // console.log(res.data.data,"this.data")
        } else {
          this.data = [];
        }
      });
      //  console.log(api)
    },
    onPullingDown() {
      // Mock async load.
      // console.log(this.$refs.scroll)
      setTimeout(() => {
        this.pageNo = 1;
        this.data = [];
      
        this.$refs.scroll.$refs.scroll.scrollTo(0, 10);
          this.queryCustInfoDataFn();
      }, 1000);
    },
    onPullingUp() {
      // Mock async load.
      setTimeout(() => {
        this.pageNo = this.pageNo + 1;
        this.queryCustInfoDataFn();
      }, 1000);
    }
  },
  watch: {},
  components: {
    CommonSearch,
    CommonResetBtn,
    Scroll,
    NoData
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.cust-wrap {
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
          position: relative;
          // padding-bottom: 48px;
          .citys {
            width: 100%;
            margin-top: 15px;
            margin-bottom: 15px;
            .ul-wrap {
              span {
                float: left;
                width: 30%;
                background-color: #f5f5f5;
                font-size: 0.12rem;
                color: #333333;
                margin-right: 5%;
                margin-bottom: 2.5%;
                line-height: 32px;
                height: 32px;
                display: inline-block;
                background-color: #f5f5f5;
                font-size: 0.12rem;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                &:nth-child(3n + 1) {
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
          }
        }
        .width-con {
          color: #737373;
          font-size: 15px;
          width: 60px;
          margin-right: 10px;
        }
        .filter-main {
          // position: absolute;
          // width: 100%;
          // top: 0;
          // bottom: 46px;
          // background-color: red;
          // z-index: 8888;
          // left: 0;
          // right: 0;
          // overflow: auto;
          width: 100%;
          top: 0;
          left: 0;
          right: 0;
          max-height: 80%;
          overflow: auto;
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
      .icon-clear {
        position: absolute;
        top: 6px;
        right: 5px;
        width: 18px;
        height: 18px;
        background: url("../../assets/images/bomb_close@3x.png") no-repeat;
        background-size: 18px 18px;
      }
      .search-pad {
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        padding: 7px 10px 7px 5px;
        border-radius: 28px;
        // background:rgba(255,255,255,1);
        // opacity:0.14;
        // color: #fff;
        // background: rgba(255,255,255,0.14);
        background-color: #f5f5f5;
        color: #a8a8a8;
        position: relative;
        span {
          width: 35px;
          height: 18px;
          text-align: center;
        }
        .icon-search {
          width: 18px;
          height: 18px;
          display: inline-block;
          background: url("../../assets/images/icon_search_gray@3x.png")
            no-repeat;
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
    color: #a8a8a8;
    background-color: #fff;
    position: relative;
    .item-pad {
      font-size: 17px;
      padding: 12px 10px 0 12px;
      margin-right: 70px;
      word-break: break-all;
      .item-name {
        color: #333333;
        display: inline-block;
        // margin-right: 3px;

        span {
          font-weight: bolder;
          margin-left: 5px;
        }
      }
      .item-phone {
        color: #0e7fff;
      }
    }
    .cust-icon {
      display: inline-block;
      width: 79px;
      height: 32px;
      position: absolute;
      top: 5px;
      right: -5px;
    }
    .cust-icon-realName {
      background: url("../../assets/images/custImages/icon_real_name@3x.png")
        no-repeat;
      background-size: 100%;
    }
    .cust-icon-no-realName {
      background: url("../../assets/images/custImages/icon_no_real_name@3x.png")
        no-repeat;
      background-size: 100%;
    }
    .cust-icon-done {
      background: url("../../assets/images/custImages/icon_done@3x.png")
        no-repeat;
      background-size: 100%;
    }
    .item-time {
      font-size: 13px;
      color: #a8a8a8;
      margin: 15px 0;
      padding: 0 10px 0 12px;
      .com-icon-link {
        width: 8px;
        height: 14px;
        // width: 10px;
        // height: 18px;
        background: url("../../assets/images/icon_link@2x.png") no-repeat;
        background-size: 100%;
        margin-top: 0;
      }
    }
    .item-bottom {
      padding: 8px 12px 12px;
      font-size: 0;
      border-top: 1px solid #e5e5e5;
      .com-tag {
        margin-right: 10px;
        margin-top: 4px;
        &:nth-child(3) {
          margin-right: 0;
        }
      }
      .com-btn {
        font-size: 13px;
        color: #0e7fff;
      }
    }
  }
  .cust-top110 {
    top: 110px;
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
