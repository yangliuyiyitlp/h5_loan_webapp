<template>
  <div class="cust-wrap">
      <CommonTopBack :backTitle = 'backTitle'></CommonTopBack>
  <div class='examlist'>
      <ul >
          <li v-for='(val,index) in examData' :key='index'>
               <i :class="{'通过':'examPass','拒单':'examRefused'}[val.nodeDesc]"></i>
              <div class='examListTit'><i></i><span>{{val.taskName}}</span></div>
              <div class='examListInfo'>
                  <ul>
                      <li><span>操作时间：</span><span>{{val.endTime}}</span></li>
                      <li><span>进入环节时间：</span><span>{{val.startTime}}</span></li>
                      <li><span>停留时间：</span><span>{{val.difTime}}</span></li>
                     <!-- <li v-if="val.nodeDesc =='拒单'"><span>拒绝原因：</span><span>{{val.a}}</span> -->
                      <li v-if="val.nodeDesc =='拒单'"><span>拒绝原因：</span><span class='js-blue' @click.stop='rejectShow(index,val.applyId)'>查看</span>
                       <div :ref='"tip"+ index' v-show='activeIndex==index' class='com_bomb'>{{objRefresed}} <i @click.stop='bombClose(index)'></i></div> 
                      </li>
                  </ul>
              </div>
          </li>
      </ul>
  </div>
   <NoData v-if = "examData.length == 0"></NoData>
  </div>
</template>
<script>
import CommonTopBack from "@/components/CommonTopBack";
import NoData from "@/components/NoData";
import api from "@/api/index";
export default {
  name: "ExamListInfo",

  data() {
    return {
      backTitle: "审核记录表",
      examData: [],
      activeIndex: -1,
      objRefresed: ""
    };
  },
  mounted() {
    this.queryExamData();
  },
  methods: {
    rejectShow(index, crmApplayId) {
      this.activeIndex = index;
      this.objRefresed = " ";
      api
        .queryRefusalReason({
          crmApplayId: this.$route.query.crmApplayId
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
    queryExamData() {
      //审批记录
      this.showToast("加载中...", "loading");
      api
        .queryExamDataList({
          crmApplayId: this.$route.query.crmApplayId
        })
        .then(res => {
          this.examData = [];
          if (res.data.success) {
            this.examData = res.data.data;
          } else if (res.data.msg == "暂无信息！") {
            this.examData = [];
          }
          this.toast.hide();
        })
        .catch(err => {
          this.showToast("请求失败", "warn");
          this.toast.hide();
        });
    }
  },
  components: {
    CommonTopBack,
    NoData
  }
};
</script>
<style lang="less" scoped >
.examlist {
  margin: 9px 12px 0;
  box-sizing: border-box;
  li {
    background-color: #fff;
    margin-bottom: 9px;
  }
  .examPass,
  .examRefused {
    width: 69px;
    height: 66px;
    display: inline-block;
    position: absolute;
    right: 0px;
    margin-right: 12px;
  }
  .examPass {
    background: url("../../../assets/images/OrderImages/icon_via@3x.png")
      no-repeat;
    background-size: contain;
  }
  .examRefused {
    background: url("../../../assets/images/OrderImages/icon_refuse@3x.png")
      no-repeat;
    background-size: contain;
  }
  .examListTit {
    width: 100%;
    height: 65px;
    padding-left: 12px;
    line-height: 65px;
    font-size: 16px;
    color: rgba(77, 77, 77, 1);
    border-bottom: 1px solid #e5e5e5;
    i {
      width: 7px;
      height: 7px;
      display: inline-block;
      margin-right: 5.5px;
      background: url("../../../assets/images/icon_round@3x.png") no-repeat;
      background-size: cover;
    }
  }
  .examListInfo {
    font-size: 13px;
    position: relative;
    li {
      margin: 18px 12px 0;
      span {
        display: inline-block;
        text-align: left;
      }
      span:nth-child(1) {
        width: 40%;
      }
      span:nth-child(2) {
        width: 60%;
      }
    }
    li:last-child {
      padding-bottom: 18px;
    }
  }
  .com_bomb {
    width: 150px;
    min-height: 70px;
    // line-height: 40px;
    right: 10px;
    top: 85px;
    text-align: center;
    position: absolute;
    background: url("../../../assets/images/bomb_left@3x.png") no-repeat;
    background-size: contain;
    z-index: 99;
    box-sizing: border-box;
    padding: 20px 20px 10px 25px;
    i {
      width: 15px;
      height: 15px;
      right: 15px;
      top: 15px;
      position: absolute;
      background: url("../../../assets/images/bomb_close@3x.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>

