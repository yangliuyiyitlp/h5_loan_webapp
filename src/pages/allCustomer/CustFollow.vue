<template>
  <div class="cust-follow-wrap">
      <div class="com-back-bg">
        <CommonBack :backTitle = "backTitle" :showCustFollow = 'showCustFollow' @goCustFollow = 'goCustFollow'></CommonBack>
      </div>  
      <div class="cust-follow-con-top com-bgcolor-fff">
        <div class="com-pad-lr12">
            <div class="com-pad-item clearfix com-flex">
                <div class="com-left com-require fl">跟进日期</div>
                <div class="com-right fr default com-flex1"
                  :class="[followDateDate == ''?'':'choose']"
                  @click = 'followDate'>
                    {{followDateDate == ''?'请选择':followDateDate}}<i class="com-icon-link fr"></i>
                </div>
            </div>
        </div>
        <div class="border-bot-1px"></div>
        <div class="com-pad-lr12">
            <div class="com-pad-item clearfix com-flex">
                <div class="com-left com-require fl">跟进形式</div>
                <div class="com-right fr default com-flex1"
                  :class="[followDateType == ''?'':'choose']"
                  @click = 'followType'>
                    {{followDateType == ''?'请选择':followDateType}}<i class="com-icon-link fr"></i>
                </div>
            </div>
        </div>
      </div>    
      <div class="cust-follow-con-top com-bgcolor-fff">
        <div class="com-pad-lr12">
            <div class="com-pad-item clearfix com-flex">
                <div class="com-left com-require fl">跟进内容</div>
                <div class="com-right fr default com-flex1">
                    <textarea ref='textarea' v-model="textareaValue" class="textarea" placeholder="请输入" maxlength="200" @input = 'orDisabledSubmit' @blur = 'checkFn'></textarea>
                </div>
            </div>
        </div>
      </div>
      <div class="cust-follow-submit">
          <button :disabled="disabledSubmit" @click= "submit" :class="[disabledSubmit ? '':'btn-fornomal']">提交</button>
      </div>
  </div>
</template> 

<script>
import CommonBack from "@/components/CommonBack";
// import { mapActions} from 'vuex'
import api from "@/api/index";
export default {
  name: "CustFollw",
  //   showCustFollow
  data() {
    return {
      showCustFollow: true,
      disabledSubmit: true,
      backTitle: "新增跟进",
      textareaValue: "",
      datePicker: null,
      typePicker: null,
      typeData: [],
      showLoading: null,
      followDateDate: "",
      followDateType: "",
      followDateTypeCode: "",
    };
  },
  created() {
    this.queryPageDictionaryDetailFn();
    // this.getItemObj();
    // this.custItem = this.$store.state.custItem;
    // console.log(this.$store.state.custItem);
  },
  mounted() {
    this.initPicker();
  },
  methods: {
    // ...mapActions({
    //   setItemObj: 'SET_ITEM_OBJ'
    // }),
    goCustFollow() {
      // this.setItemObj({num: 520,num12: 8})
      this.$router.push({
        path: "/followList"
      })
    },
    checkFn() {
      console.log(6666);
      this.$refs.textarea.blur();
      if (!this.followDateDate) {
        this.showToast("请输入跟进时间");
        return;
      }
      if (!this.followDateType && !this.followDateTypeCode) {
        this.showToast("请输入跟进形式");
        return;
      }
      if (!this.textareaValue) {
        this.showToast("请输入跟进内容");
        return;
      }
      this.disabledSubmit = false;
      console.log(6666, this.disabledSubmit);
    },
    orDisabledSubmit() {
      console.log(8989898);
      if (
        !this.followDateDate ||
        !this.followDateType ||
        !this.followDateTypeCode ||
        !this.textareaValue
      ) {
        this.disabledSubmit = true;
      } else {
        this.disabledSubmit = false;
      }
    },
    showToast(txt, toastTime) {
      const toast = this.$createToast({
        time: toastTime || 1000,
        txt: txt,
        type: "warn"
      });
      toast.show();
      setTimeout(() => {
        toast.hide();
      }, 1500);
    },
    followDate() {
      this.datePicker.show();
      console.log(this.datePicker);
    },
    followType() {
      this.typePicker.show();
    },
    selectHandle(val, val2, val3) {
      this.followDateDate = val3.join("-");
      this.orDisabledSubmit();
      //   console.log(val3.join("-"), "val ");
    },
    selectHandleType(selectedVal, selectedIndex, selectedText) {
      this.followDateType = selectedText[0];
      this.followDateTypeCode = selectedVal[0];
      this.orDisabledSubmit();
    },
    submit() {
      this.disabledSubmit = true;
      this.showLoading.show();
      let pararms = {
        crmCustInfoId: this.$route.query.crmCustInfoId,
        followNode: "1",
        followTime: this.followDateDate,
        followType: this.followDateTypeCode,
        followContent: this.textareaValue
      };
      console.log(pararms)
      api.saveFollowInfo(pararms).then(res => {
        setTimeout(() => {
          this.showLoading.hide();
        }, 1500);
        // this.disabledSubmit = false;
        this.resetData();
        if (!res.data.success) {
          let msg = this.$createToast({
            time: 1000,
            txt: res.data.msg,
            type: "warn"
            // mask: true
          });
        }
      });
    },
    resetData() {
      this.followDateDate = "";
      this.followDateType = "";
      this.followDateTypeCode = "";
      this.textareaValue = "";
    },
    initPicker() {
      // 跟进时间
      this.datePicker = this.$createDatePicker({
        title: "跟进时间",
        min: new Date(2000, 7, 8),
        max: new Date(),
        value: new Date(),
        format: {
          year: "YYYY",
          month: "MM",
          date: "DD"
        },
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      });
      // 跟进形式
      this.typePicker = this.$createPicker({
        title: "跟进形式",
        data: [this.typeData],
        alias: {
          value: "detailCode",
          text: "name"
        },
        onSelect: this.selectHandleType,
        onCancel: () => {
          // console.log(this.followDateTypeCode);
        }
      });
      this.showLoading = this.$createToast({
        time: 1500,
        txt: "加载中...",
        // type: "warn"
        mask: true
      });
    },
    queryPageDictionaryDetailFn() {
      let pararms = {
        pageNo: 1,
        pageSize: 100,
        code: "000021",
        status: 1
      };
      api.queryPageDictionaryDetail(pararms).then(res => {
        if (res.data.success) {
          let datas = res.data.data;
          for (let i in datas) {
            let obj = {};
            obj.name = datas[i].name;
            obj.detailCode = datas[i].detailCode;
            this.typeData.push(obj);
          }
          this.typeData = this.typeData;
        } else {
          this.typeData = [];
        }
      });
    },
    // ...mapActions({
    //   getItemObj: "GET_ITEM_OBJ"
    // })
  },
  //   watch: {
  //       "textareaValue"() {

  //       }
  //   },
  components: {
    CommonBack
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.cust-follow-wrap {
  font-size: 16px;
  color: #4d4d4d;
  .cust-follow-con-top {
    margin: 9px 0;
  }
  .com-icon-link {
    margin-top: 0;
    margin-left: 10px;
  }
  .default {
    color: #c4c4c4;
  }
  .border-bot-1px {
    border-bottom: 0.01rem solid #e5e5e5;
    margin-left: 12px;
  }
  .com-require {
    width: 72px;
  }
  .textarea {
    width: 95%;
    height: 67px;
    color: #4d4d4d;
    text-align: right;
    padding: 5px;
    border: none;
  }
  .cust-follow-submit {
    text-align: center;
    padding-top: 22px;
    button {
      display: inline-block;
      color: #fff;
      width: 80%;
      height: 44px;
      background: rgba(128, 188, 255, 1);
      border-radius: 22px;
      outline: none;
      border: 0;
      &.btn-fornomal {
        background-color: #0e7fff;
      }
    }
  }

  .choose {
    color: #404040;
  }
}
</style>
