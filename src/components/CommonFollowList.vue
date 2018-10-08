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
          <li v-for = "(row,index) in data" :key = 'index' >
            <div v-if = 'row.followNode == 1 || row.followNode == 5 || row.followNode == 6 || row.followNode == 7 || row.followNode == 8'>
              <!-- 贷前 START-->              
              <div class="follow-item-tit clearfix" @click = 'tabItem(index,row)'>
                <div class="fl">
                    <i class="icon-com" :class="[
                    item.followNode == 5 ? 'icon_real_name_upgrade':'',
                    item.followNode == 6 ? 'icon_real_information_application':'',
                    item.followNode == 7 ? 'icon_video_subscription':'',
                    item.followNode == 8 ? 'icon_open_account':'',
                    ]"
                    ></i>
                    <span v-if='row.followNode == 1'>贷前</span>
                    <span v-if='row.followNode == 5'>实名升级</span>
                    <span v-if='row.followNode == 6'>信息申请</span>
                    <span v-if='row.followNode == 7'>视频签约</span>
                    <span v-if='row.followNode == 8'>开户</span> 
                </div>
                <div class="fr">{{row.followTime}}<i class='icon-tab'></i></div>
              </div>
              <div class="follow-item-con">
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进形式：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{row.followType}}
                    <!-- <span v-if='item.followNode == 1'>贷前</span>
                    <span v-if='item.followNode == 2'>监测</span>
                    <span v-if='item.followNode == 3'>贷后</span>
                    <span v-if='item.followNode == 4'>ERP贷后</span>
                    <span v-if='item.followNode == 5'>实名升级</span>
                    <span v-if='item.followNode == 6'>信息申请</span>
                    <span v-if='item.followNode == 7'>视频面审</span>
                    <span v-if='item.followNode == 8'>开户</span> -->
                  </div>
                </div>  
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进时间：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    {{item.followTime}}
                  </div>
                </div> 
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    操作人：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    {{row.realName}}
                  </div>
                </div>
                <div class="follow-item-list com-flex"  v-if = 'item.followNode != 1 && item.followNode != 2 && item.followNode != 3 && item.followNode != 4'>
                  <!-- 实名升级、信息申请、视频面审 、开户-->
                  <div class="follow-item-list-tit">
                    跟进结果：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    {{item.followupResultMsg}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进内容：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    {{item.followContent}}
                  </div>
                </div>                      
              </div>
              <!-- 贷前 END-->
            </div>          
            <div v-if = 'row.followNode == 4'>
              <!-- ERP贷后 START-->
              <div class="follow-item-tit clearfix" @click = 'tabItem(index,row)'>
                <div class="fl">
                    <i class="icon-com" :class="['row.followNode == 4'? 'icon-com-erp': '']"></i>ERP贷后
                </div>
                <div class="fr">{{row.followTime}}<i class='icon-tab'></i></div>
              </div>
              <div class="follow-item-con follow-item-erp">
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进人员：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{row.realName}}
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
                    来源：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    <span v-if = 'item.receivableType ==1'>客户提醒</span>
				  			    <span v-else-if ='item.receivableType == null'></span>
				  			    <span v-else>催收管理</span>
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
                    {{row.customerType | formatState("1")}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    本人联系状态：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{row.contactType | formatState("2")}}
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
            <div v-if = 'row.followNode == 3'>
              <!-- 贷后 START-->
              <div class="follow-item-tit clearfix" @click = 'tabItem(index,row)'>
                <div class="fl">
                    <i class="icon-com" :class="['row.followNode == 3'? 'icon-com-loan': '']"></i>贷后
                </div>
                <div class="fr">{{row.followTime}}<i class='icon-tab'></i></div>
              </div>
              <div class="follow-item-con">
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    跟进形式：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    <span v-if = 'row.followType == "外访"'>外访</span>
	                  <span v-if = 'row.followType == "电话"'>电话</span>
                  </div>
                </div>
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
                    联系电话：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.receivingMobile}}
                  </div>
                </div>
                <div class="follow-item-list com-flex" v-if = 'row.followType == "外访"'>
                  <div class="follow-item-list-tit">
                    地址状态：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.addressStatus}}
                  </div>
                </div>
                <div class="follow-item-list com-flex" v-if = 'row.followType == "外访"'>
                  <div class="follow-item-list-tit">
                    地址类型：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.addressType}}
                  </div>
                </div>
                <div class="follow-item-list com-flex" v-if = 'row.followType == "外访"'>
                  <div class="follow-item-list-tit">
                    详细地址：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    <span>{{item.addressProvince}}</span>
								  	<span>{{item.addressCity}}</span>
								  	<span>{{item.addressArea}}</span>
								  	<span>{{item.detailedAddress}}</span>	
                  </div>
                </div>
                <div class="follow-item-list com-flex" v-if = 'row.followType == "电话"'>
                  <div class="follow-item-list-tit">
                    电话状态：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.contactMobileStatus}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    工作状态：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.contactJobStatus}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit wid81">
                    债务人状态：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.contactObligorStatus}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    催收反馈：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    <!-- {{item.collectionFeedback}} -->                    
                    <span v-if='row.collectionFeedback == 1'>承诺还款</span>
                    <span v-if='row.collectionFeedback == 2'>协助跟进</span>
                    <span v-if='row.collectionFeedback == 3'>未知</span>
                    <span v-if='row.collectionFeedback == 4'>拒绝还款</span>
                  </div>
                </div>
                <div class="follow-item-list com-flex" v-if = "row.collectionFeedback == 1">
                  <div class="follow-item-list-tit">
                    还款日期：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.repaymentDate}}
                  </div>
                </div>
                <div class="follow-item-list com-flex" v-if = "row.collectionFeedback == 1">
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
                    预约提醒：
                  </div>
                  <div class="follow-item-list-con com-flex1  ">
                    {{item.reminderContent}}
                  </div>
                </div>
              </div>
               <!-- 贷后 END-->
            </div>          
            <div v-if = 'row.followNode == 2'>
               <!-- 监测 START-->
              <div class="follow-item-tit clearfix" @click = 'tabItem(index,row)'>
                <div class="fl">
                  <i class="icon-com" :class="['row.followNode == 2'? 'icon-com-monitoring': '']"></i>监测
                </div>
                <div class="fr">{{row.followTime}}<i class='icon-tab'></i></div>
              </div>
              <div class="follow-item-con follow-item-listen">
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    监测时间：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    {{item.followTime}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    监测方式：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    {{row.monitorType == 1 ? '常规监测' : '上门回访'}}
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
                  <div v-show="row.monitorType == 2" class="marbot20">
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
                        {{row.homeChangeStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.homeChangeRemark}}
                      </div>
                    </div>
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        地址是否异常：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                        {{row.homeExceptionStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.homeExceptionRemark}}
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
                        {{row.comChangeStatus == 0 ? '否' : '是'}}<span class='space-5px'></span>{{item.comChangeRemark}}
                      </div>
                    </div>
                    <div class="follow-item-list com-flex">
                      <div class="follow-item-list-tit">
                        地址是否异常：
                      </div>
                      <div class="follow-item-list-con com-flex1  ">
                        {{row.comExceptionStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.comExceptionRemark}}
                      </div>
                    </div>
                    
                  </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    其他异常情况：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    {{row.otherExceptionStatus == 0? '否' : '是'}}<span class='space-5px'></span>{{item.otherExceptionRemark}}
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    结论：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    <span v-if='row.monitorResult == 1'>正常</span>
	                  <span v-if='row.monitorResult == 2'>移交电催</span>
	                  <span v-if='row.monitorResult == 3'>移交外访</span>
	                  <span v-if='row.monitorResult == 4'>移交总部</span>
                  </div>
                </div>
                <div class="follow-item-list com-flex">
                  <div class="follow-item-list-tit">
                    回访意见：
                  </div>
                  <div class="follow-item-list-con com-flex1">
                    {{item.visitOpinion}}
                  </div>
                </div>
              </div>
              <!-- 监测 END-->
            </div>
          </li>
        </ul>
      </div>
     </Scroll>      
   </div>
   <NoData v-if = "data.length == 0"></NoData>
  </div>
</template>

<script>
import CommonBack from "@/components/CommonBack";
import Scroll from "@/components/Scroll";
import NoData from "@/components/NoData";
import { mapActions } from "vuex";
import api from "@/api/index";
export default {
  name: "followList",
  data() {
    return {
      backTitle: "跟进记录",
      data: [],
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
      pageSize: 10,
      item: {},
      codeArr: []
    };
  },
  computed: {},
  created() {
    this.getItemObj();
    this.custItem = this.$store.state.custItem;
    console.log(this.custItem, this.$store.state.custItem);
    this.queryPageDictionaryDetailOptions("000013")
    this.queryPageDictionaryDetailOptions("000014")
    this.queryPageDictionaryDetailOptions("000015")
    this.queryPageDictionaryDetailOptions("000025")
    
  },
  mounted() {
    this.queryFollowInfoFn();
  },
  methods: {
    queryPageDictionaryDetailOptions(code) {
      let pararms = {
        pageNo: 1,
        pageSize: 100,
        code: code
      };
      api.queryPageDictionaryDetail(pararms).then(res => {
        console.log(res.data.data,"queryPageDictionaryDetailOptions")
        if (res.data.success) {
          this.codeArr = this.codeArr.concat(res.data.data)
          if (code == "000013") {
            //		电话状态
            // this.phoneStateOptions = res.data.data;
          } else if (code == "000014") {
            //		工作状态
            // this.workStateOptions = res.data.data;
          } else if (code == "000015") {
            //		债务人状态

            // this.debtStateOptions = res.data.data;
          }
          console.log(this.codeArr,"queryPageDictionaryDetailOptions")
        }
      });
    },
    tabItem(index,row) {
      let ul = document.getElementById("ul-wrap");
      let arrLi = ul.getElementsByTagName("li");
      let tarDiv = arrLi[index].getElementsByClassName("follow-item-con")[0];
      let tarI = arrLi[index].getElementsByClassName("icon-tab")[0];
      tarDiv.style.display = tarDiv.style.display == "block" ? "none" : "block";
      tarI.className =
      tarI.className == "icon-tab" ? "icon-tab icon-tab-active" : "icon-tab";
      if (tarDiv.style.display == 'block') {
        this.queryFollowInfo(row.id)
      }
       for (let i=0;i < arrLi.length;i++) {
        if (i != index) {
          arrLi[i].getElementsByClassName("follow-item-con")[0].style.display = "none";
        }
        console.log(i,i != index, index)
      }
      // tarDiv.style.display = 'block'icon-tab-active
      // console.log(tarI.className,"follow-item-con")
    },
    queryFollowInfo(followId) {
      this.item = {}
      api.queryFollowInfo({
          followId: followId
        }).then(res => {
          //followNode跟进环节:1.贷前 2.监测 3.贷后 4.ERP贷后
          if (res.data.success) {
            this.item = res.data.data;	          
          }
        });
	  },
    queryFollowInfoFn() {
      let prarms = {
        crmCustId: this.$route.query.crmCustInfoId,
        // crmCustId: this.$route.query.crmCustInfoId || this.custItem.crmCustInfoId, //02983e444357425ab19e8330e9466426
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
         this.queryFollowInfoFn();
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
  filters: {
    formatCode(detailCode,arr){ // 根据code找到对应的名字
      if (detailCode && typeof detailCode == 'string') {
        let name = '';
        console.log(detailCode, arr)
        for (let i in arr) {
          if (arr[i].detailCode == detailCode) {
            name = arr[i].name        
            break;
          }
        }
        return name;
      }
    },
    formatState(value,type) {
      // 1是客户状态，2是联系状态
      let arr1 = [
        {
          value: 0,
          text: "正常"
        },
        {
          value: 1,
          text: "失联"
        },
        {
          value: 2,
          text: "核销"
        },
        {
          value: 3,
          text: "诉讼"
        },
        {
          value: 4,
          text: "特殊处理"
        }
      ]
      let arr2 = [
        {
          value: 0,
          text: "正常"
        },
        {
          value: 1,
          text: "空号"
        },
        {
          value: 2,
          text: "停机"
        },
        {
          value: 3,
          text: "无法接通"
        },
        {
          value: 4,
          text: "号码错误"
        }
      ]
      console.log(value,type,"411211")
      let name = '';
      if (value && typeof value == 'string') {       
        if (type == "1") {
          for (let i in arr1) {
            if (arr1[i].value == value) {
              name = arr1[i].text        
              break;
            }
          }
          console.log(name,"411211")
        
        }
      
        if (type == "2") {
          for (let i in arr2) {
            if (arr2[i].value == value) {
              name = arr2[i].text        
              break;
            }
          }
        }       
        return name;
      }
    }
  },
  components: {
    CommonBack,
    Scroll,
    NoData
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
      .icon_real_name_upgrade {
        width: 54px;
        background: url("../assets/images/custImages/icon_real_name_upgrade@2x.png")
          no-repeat;
        background-size: 54px 16px;
      }
      .icon_real_information_application {
        width: 54px;
        background: url("../assets/images/custImages/icon_real_information_application@2x.png")
          no-repeat;
        background-size: 54px 16px;
      }
      .icon_video_subscription {
        width: 54px;
        background: url("../assets/images/custImages/icon_video_subscription@2x.png")
          no-repeat;
        background-size: 54px 16px;
      }
      .icon_open_account {
        background: url("../assets/images/custImages/icon_open_account@2x.png")
          no-repeat;
        background-size: 32px 16px;
      }
      .fr {
        font-size: 12px;
        color: #a8a8a8;
        margin-top: 2px;
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
        .wid81 {
          width: 81px;
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
  .marbot20 {
    margin-bottom: 20px;
  }
}
</style>
