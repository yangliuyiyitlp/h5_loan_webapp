<template>
  <div class="follow-wrap">
   <div class="follow-top">
     <CommonBack :backTitle = "backTitle"></CommonBack>
   </div>
   <div class="follow-con">
     <Scroll
      ref="scroll"		
      :data="data"				  
      :options="options"
      @onPullingDown="onPullingDown"
      @onPullingUp="onPullingUp"
     >
      <div class="follow-pad" slot="scollCon">           
        <ul id = "ul-wrap">
          <!-- //followNode跟进环节:1.贷前 2.监测 3.贷后 4.ERP贷后 -->
          <li v-for = "(item,index) in data" :key = 'index' >
            <div v-if = 'item.followNode == 1'>
              <!-- 贷前 START-->              
              <div class="follow-item-tit clearfix" @click = 'tabItem(index)'>
                <div class="fl">
                    <i class="icon-com"></i>贷前
                </div>
                <div class="fr">{{item.createTime}}<i class='icon-tab'></i></div>
              </div>
              <div class="follow-item-con">
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进形式：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.followType}}
                  </div>
                </div>  
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进时间：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.followTime}}
                  </div>
                </div> 
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    操作人：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.realName}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进内容：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.followContent}}
                  </div>
                </div>                      
              </div>
              <!-- 贷前 END-->
            </div>          
            <div v-if = 'item.followNode == 4'>
              <!-- ERP贷后 START-->
              <div class="follow-item-tit clearfix" @click = 'tabItem(index)'>
                <div class="fl">
                    <i class="icon-com" :class="['item.followNode == 4'? 'icon-com-erp': '']"></i>ERP贷后
                </div>
                <div class="fr">{{item.followTime}}<i class='icon-tab'></i></div>
              </div>
              <div class="follow-item-con follow-item-erp">
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进人员：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.realName}}
                  </div>
                </div>  
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进类型：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.followType}}
                  </div>
                </div> 
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    系统来源：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    <span v-if='item.systemType == 1'>贷后</span>
				  			    <span v-if='item.systemType == 2'>信贷</span>
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    客户状态：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.customerType}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    本人联系状态：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.contactType}}
                  </div>
                </div> 
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进内容：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.followContent}}
                  </div>
                </div>                     
              </div>
              <!-- ERP贷后 START-->
            </div>          
            <div v-if = 'item.followNode == 3'>
              <!-- 贷后 START-->
              <div class="follow-item-tit clearfix" @click = 'tabItem(index)'>
                <div class="fl">
                    <i class="icon-com" :class="['item.followNode == 3'? 'icon-com-loan': '']"></i>贷后
                </div>
                <div class="fr">2018-06-12<i class='icon-tab'></i></div>
              </div>
              <div class="follow-item-con">
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    催收对象：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.receivingRelation}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    姓名：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                     {{item.receivingName}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    电话：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.receivingMobile | formatMobile}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    催收反馈：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    <!-- {{item.collectionFeedback}} -->                    
                    <span v-if='item.collectionFeedback == 1'>承诺还款</span>
                    <span v-if='item.collectionFeedback == 2'>协助跟进</span>
                    <span v-if='item.collectionFeedback == 3'>未知</span>
                    <span v-if='item.collectionFeedback == 4'>拒绝还款</span>
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    还款日期：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.repaymentDate}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    还款金额：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.repaymentAmount}}元
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进情况：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.followContent}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    预约跟进：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.reminderTime}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进提醒：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.reminderContent}}
                  </div>
                </div>
              </div>
               <!-- 贷后 END-->
            </div>          
            <div v-if = 'item.followNode == 2'>
               <!-- 检测 START-->
              <div class="follow-item-tit clearfix" @click = 'tabItem(index)'>
                <div class="fl">
                  <i class="icon-com" :class="['item.followNode == 2'? 'icon-com-monitoring': '']"></i>检测
                </div>
                <div class="fr">2018-06-12<i class='icon-tab'></i></div>
              </div>
              <div class="follow-item-con follow-item-listen">
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    检测时间：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.followTime}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    检测方式：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.monitorType == 1 ? '常规监测' : '上门回访'}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    是否失联：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.disappearStatus == 0 ? '否' : '是'}}<span class='space-5px'></span>{{item.disappearRemark}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    是否异常：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.expectionStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.expectionRemark}}
                    </div>
                  </div>
                  <div v-show="item.monitorType == 2">
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        上门回访家庭地址：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                        {{item.homeProvinceId}}&nbsp;{{item.homeCityId}}&nbsp;{{item.homeDistrictId}}&nbsp;{{item.homeAddress}}
                      </div>
                    </div>
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        地址是否变化：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                        {{item.homeChangeStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.homeChangeRemark}}
                      </div>
                    </div>
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        地址是否异常：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                        {{item.homeExceptionStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.homeExceptionRemark}}
                      </div>
                    </div>
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        上门回访公司地址：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                      {{item.comProvinceId}}&nbsp;{{item.comCityId}}&nbsp;{{item.comDistrictId}}&nbsp;{{item.comAddress}}
                      </div>
                    </div>
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        地址是否变化：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                        {{item.comChangeStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.comChangeRemark}}
                      </div>
                    </div>
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        地址是否异常：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                        {{item.comExceptionStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.comExceptionRemark}}
                      </div>
                    </div>
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        其他异常信息：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                        {{item.otherExceptionStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.otherExceptionRemark}}
                      </div>
                    </div>
                  </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    结论：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    <span v-if='item.monitorResult == 1'>正常</span>
	                  <span v-if='item.monitorResult == 2'>移交电催</span>
	                  <span v-if='item.monitorResult == 3'>移交外访</span>
	                  <span v-if='item.monitorResult == 4'>移交总部</span>
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    回访意见：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.visitOpinion}}
                  </div>
                </div>
              </div>
              <!-- 检测 END-->
            </div>
          </li>
        </ul>
      </div>
     </Scroll>      
   </div>
  </div>
</template>

<script>
import CommonBack from "@/components/CommonBack";
import Scroll from "@/components/Scroll";
import { mapActions } from "vuex";
import api from "@/api/index";
export default {
  name: "followList",
  data() {
    return {
      backTitle: "跟进记录",
      data: [12, 12, 12, 12, 12, 121, 2],
      custItem: {},
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
      pageNo: 1,
      pageSize: 10
    };
  },
  computed: {},
  created() {
    this.getItemObj();
    this.custItem = this.$store.state.custItem;
    console.log(this.custItem, this.$store.state.custItem);
  },
  mounted() {
    this.queryFollowInfoFn();
  },
  methods: {
    tabItem(index) {
      let ul = document.getElementById("ul-wrap");
      let arrLi = ul.getElementsByTagName("li");
      let tarDiv = arrLi[index].getElementsByClassName("follow-item-con")[0];
      let tarI = arrLi[index].getElementsByClassName("icon-tab")[0];
      tarDiv.style.display = tarDiv.style.display == "block" ? "none" : "block";
      tarI.className =
        tarI.className == "icon-tab" ? "icon-tab icon-tab-active" : "icon-tab";
      // tarDiv.style.display = 'block'icon-tab-active
      // console.log(tarI.className,"follow-item-con")
    },
    queryFollowInfoFn() {
      let prarms = {
        crmCustId: this.custItem.crmCustInfoId, //02983e444357425ab19e8330e9466426
        // 9ef0e7c886bc408eb0b9a6b89e18856d
        // crmCustId: "2c908a82586fd63501586fe6023c0070",
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      api.queryFollowList(prarms).then(res => {
        if (res.data.success && res.data.data.length != 0) {
          // this.data.concat(res.data.data)
          //followNode跟进环节:1.贷前 2.监测 3.贷后 4.ERP贷后
          this.data = this.data.concat(res.data.data);
        } else {
          this.$refs.scroll.$refs.scroll.forceUpdate();
        }
        console.log(res.data.data);
      });
    },
    onPullingDown() {
      // Mock async load.
      // console.log(this.$refs.scroll)
      setTimeout(() => {
        this.pageNo = 1;
        this.data = [];
        this.$refs.scroll.$refs.scroll.scrollTo(0, 10, 500);
      }, 1000);
    },
    onPullingUp() {
      // Mock async load.
      setTimeout(() => {
        this.pageNo = this.pageNo + 1;
        this.queryFollowInfoFn();
      }, 1000);
    },
    ...mapActions({
      getItemObj: "GET_ITEM_OBJ" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  },
  components: {
    CommonBack,
    Scroll
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="less">
.follow-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .follow-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1213;
  }
  .follow-con {
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1213;
    font-size: 13px;
    color: #a8a8a8;
    overflow: auto;
    .follow-pad {
      padding: 9px 12px 0 12px;
      ul {
        li {
          margin-bottom: 9px;
          background-color: #fff;
          &:last-child {
            margin-bottom: 0;
          }
          & > div {
            padding-left: 0.08rem;
            padding-right: 0.08rem;
          }
        }
      }
    }
    .follow-item-tit {
      font-size: 16px;
      color: #4d4d4d;
      padding-top: 25px;
      padding-bottom: 25px;
      .icon-com {
        width: 32px;
        height: 16px;
        display: inline-block;
        vertical-align: top;
        margin-right: 7px;
        background: url("../assets/images/custImages/icon_pre_loan@2x.png")
          no-repeat;
        background-size: 32px 16px;
      }
      .icon-com-erp {
        background: url("../assets/images/custImages/icon_erp@2x.png") no-repeat;
        background-size: 32px 16px;
      }
      .icon-com-loan {
        background: url("../assets/images/custImages/icon_post_loan@2x.png")
          no-repeat;
        background-size: 32px 16px;
      }
      .icon-com-monitoring {
        background: url("../assets/images/custImages/icon_monitoring@2x.png")
          no-repeat;
        background-size: 32px 16px;
      }
      .fr {
        font-size: 12px;
        color: #a8a8a8;
        .icon-tab {
          display: inline-block;
          width: 13px;
          height: 8px;
          vertical-align: middle;
          background: url("../assets/images/custImages/icon_spread_default.png")
            no-repeat;
          background-size: 13px 8px;
          margin-left: 25px;
        }
        .icon-tab-active {
          background: url("../assets/images/custImages/icon_spread_click.png")
            no-repeat;
          background-size: 13px 8px;
        }
      }
    }
    .follow-item-con {
      border-top: 1px solid #e5e5e5;
      padding: 21px 8px 25px;
      display: none;
      .follow-item-list {
        font-size: 13px;
        line-height: 1.5;
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        .follow-item-list-tit {
          width: 65px;
          color: #a8a8a8;
        }
        .follow-item-list-con {
          color: #595959;
        }
      }
    }
    .follow-item-listen {
      .follow-item-list .follow-item-list-tit {
        width: 120px;
      }
    }
    .follow-item-erp {
      .follow-item-list .follow-item-list-tit {
        width: 91px;
      }
    }
  }
}
</style>
