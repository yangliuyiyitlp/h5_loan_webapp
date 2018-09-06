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
                      <li v-if="val.nodeDesc =='拒单'"><span>拒绝原因：</span><span class='js-blue' @click.stop='rejectShow'>查看</span></li>
                  </ul>
              </div>
          </li>
      </ul>
  </div>
  </div>
</template>
<script>
import CommonTopBack from "@/components/CommonTopBack";
import api from "@/api/index";
export default {
  name: "ExamListInfo",

  data() {
    return {
      backTitle: "审核记录表",
      examData: []
    };
  },
  mounted(){
    this.queryExamData()
  },
  methods: {
      rejectShow(){
          alert(9)
      },
       queryExamData() { //审批记录
      api
        .queryExamDataList({
          crmApplayId: this.$route.query.crmApplayId
        })
        .then(res => {
          this.examData = [];
          if (res.data.success ) {
            this.examData = res.data.data;
          } else if(res.data.msg=='暂无信息！'){
            this.examData = []
          }
        });
    },
  },
  components: {
    CommonTopBack
  }
};
</script>
<style lang="less" scoped >
.examlist {
  margin: 9px 12px 0;
  box-sizing: border-box;
  li{
      background-color: #FFF;
      margin-bottom:9px;
  }
  .examPass,
  .examRefused {
    width: 69px;
    height: 66px;
    display: inline-block;
    position: absolute;
    right: 0px;
   margin-right:12px;
  }
  .examPass {
    background: url("../../../assets/images/OrderImages/icon_via@3x.png")
      no-repeat;
       background-size:contain;
  }
  .examRefused {
    background: url("../../../assets/images/OrderImages/icon_refuse@3x.png")
      no-repeat;
       background-size:contain;
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
}
</style>

