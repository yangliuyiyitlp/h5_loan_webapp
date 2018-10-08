<template>
  <div class="page followUp">
    <div class="FU-top com-fix">
      <CommonBack :backTitle='backTitle' :showCustFollow = 'showCustFollow' @goCustFollow = 'goCustFollow'></CommonBack>
    </div>
    <div class="Listen-main">
      <div class="FU-module">
        <div class="FU-item" >
          <div class="FU-lable required">监测时间</div>
          <div class="module-item" @click='isShowPop(1)'>
            <span :class="['item-value',form.checkDate == '' ? 'default':'choose']">{{form.checkDate == ''?'请选择':form.checkDate}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="bottom-line"></div>
        <div class="FU-item" @click='isShowPop(2)'>
          <div class="FU-lable required">监测方式</div>
          <div class="module-item">
            <span :class="['item-value',label.checkType  == '' ? 'default':'choose']">{{label.checkType == ''?'请选择':label.checkType}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>        
      </div>
      <div class="FU-module">
        <div class="FU-item" >
          <div class="FU-lable required otherExpectionStatus">是否失联</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span @click = "tabRadio(0,'disappearStatus')"><i class="radioDispear" :class = "[!form.disappearStatus ? 'radioDispearActive':'']"></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'disappearStatus')"><i class="radioDispear" :class = "[form.disappearStatus ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div> 
        <div class="bottom-line" v-if = 'form.disappearStatus == 1'></div>
        <div class="FU-item"  v-if = 'form.disappearStatus == 1'>
          <div class="module-item com-flex1">
            <input type="text" placeholder="请输入" class = "FU-input com-flex1 color73" v-model = "form.disappearInput">
          </div>
        </div>             
      </div>
      <div class="FU-module">
        <div class="FU-item" >
          <div class="FU-lable required otherExpectionStatus">是否异常</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span @click = "tabRadio(0,'expectionStatus')"><i class="radioDispear" :class = "[!form.expectionStatus ? 'radioDispearActive':'']" ></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'expectionStatus')"><i class="radioDispear" :class = "[form.expectionStatus ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div> 
        <div class="bottom-line" v-if = 'form.expectionStatus == 1'></div>
        <div class="FU-item"  v-if = 'form.expectionStatus == 1'>
          <div class="module-item com-flex1">
            <input type="text" placeholder="请输入" class = "FU-input com-flex1 color73" v-model = "form.expectionInput">
          </div>
        </div>             
      </div>
      <div class="FU-module" v-if =  'form.checkType == 2'>
        <div class="FU-item" >
          <div class="FU-lable required otherExpectionStatus">是否回访家庭地址</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span @click = "tabRadio(0,'homeAddress')"><i class="radioDispear" :class = "[!homeAddressState ? 'radioDispearActive':'']"></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'homeAddress')"><i class="radioDispear" :class = "[homeAddressState ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div> 
        <div class="bottom-line" v-if = 'homeAddressState == 1'></div>
        <div class="FU-item" @click='isShowPop(3)' v-if = 'homeAddressState == 1'>
          <div class='FU-lable required wid140'>上门回访家庭地址</div>
          <div class="addrTool" v-show=" form.homeAddress == ''? true:false">省-市-区</div>
          <div class="module-item">
            <span :class="['item-value',form.homeAddress == '' ?'default':'choose']">{{form.homeAddress == '' ? '请选择' : form.homeAddress}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="FU-item"  v-if = 'homeAddressState == 1'>
          <div class="addrTool fl">{{form.homeDetAddress == ''?'路/乡/镇 门牌号':''}}</div>
          <div :class="['module-item',form.homeDetAddress==''?'':'addressText']">
            <input type="text" placeholder="请输入" :class="['FU-input addressText',form.homeDetAddress ==''?'default':'choose']" v-model="form.homeDetAddress">
          </div>
        </div>  
        <div class="bottom-line" v-if = 'form.checkType == 2 && homeAddressState == 1'></div>
        <div class="FU-item" v-if = 'form.checkType == 2  && homeAddressState == 1'>
          <div class="FU-lable required otherExpectionStatus">地址是否变化</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span @click = "tabRadio(0,'homeChangeStatus')"><i class="radioDispear" :class = "[!form.homeChangeStatus ? 'radioDispearActive':'']" ></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'homeChangeStatus')"><i class="radioDispear" :class = "[form.homeChangeStatus ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div>         
        <div class="FU-item"  v-if = 'form.homeChangeStatus == 1  && (form.checkType == 2)  && homeAddressState == 1'>
          <div class="addrTool">{{form.homeChangeRemark == ''?'路/乡/镇 门牌号':''}}</div>
          <div class="module-item ">
            <input type="text" placeholder="请输入" class = "FU-input addressText  color73" v-model = "form.homeChangeRemark">
          </div>
        </div>     
        <div class="bottom-line" v-if = 'form.checkType == 2  && homeAddressState == 1'></div>   
        <div class="FU-item"  v-if = 'form.checkType == 2  && homeAddressState == 1'>
          <div class="FU-lable required otherExpectionStatus">地址是否异常</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span @click = "tabRadio(0,'homeExceptionStatus')"><i class="radioDispear" :class = "[!form.homeExceptionStatus ? 'radioDispearActive':'']" ></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'homeExceptionStatus')"><i class="radioDispear" :class = "[form.homeExceptionStatus ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div>         
        <div class="FU-item"  v-if = 'form.homeExceptionStatus == 1 && (form.checkType == 2)  && homeAddressState == 1'>
          <div class="addrTool">{{form.homeExceptionRemark == ''?'路/乡/镇 门牌号':''}}</div>
          <div class="module-item">
            <input type="text" placeholder="请输入" class = "FU-input addressText color73" v-model = "form.homeExceptionRemark">
          </div>
        </div>
      </div>

      <div class="FU-module" v-if =  'form.checkType == 2'>
        <div class="FU-item" >
          <div class="FU-lable required otherExpectionStatus">是否回访公司地址</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span @click = "tabRadio(0,'comAddress')"><i class="radioDispear" :class = "[!comAddressState ? 'radioDispearActive':'']"></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'comAddress')"><i class="radioDispear" :class = "[comAddressState ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div> 
        <div class="bottom-line" v-if = 'comAddressState == 1'></div>
        <div class="FU-item" @click='isShowPop(4)' v-if = 'comAddressState == 1'>
          <div class='FU-lable required wid140'>上门回访公司地址</div>
          <div class="addrTool" v-show=" form.comAddress == ''? true:false">省-市-区</div>
          <div class="module-item">
            <span :class="['item-value',form.comAddress == '' ?'default':'choose']">{{form.comAddress == '' ? '请选择' : form.comAddress}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="FU-item"  v-if = 'comAddressState == 1'>
          <div class="addrTool fl">{{form.comDetAddress == ''?'路/乡/镇 门牌号':''}}</div>
          <div :class="['module-item',form.comDetAddress==''?'':'addressText']">
            <input type="text" placeholder="请输入" :class="['FU-input addressText',form.comDetAddress == '' ? 'default':'choose']" v-model = "form.comDetAddress">
          </div>
        </div>  
        <div class="bottom-line" v-if = 'form.checkType == 2 && comAddressState == 1'></div>
        <div class="FU-item" v-if = 'form.checkType == 2 && comAddressState == 1'>
          <div class="FU-lable required otherExpectionStatus">地址是否变化</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span @click = "tabRadio(0,'comChangeStatus')"><i class="radioDispear" :class = "[!form.comChangeStatus ? 'radioDispearActive':'']" ></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'comChangeStatus')"><i class="radioDispear" :class = "[form.comChangeStatus ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div>         
        <div class="FU-item"  v-if = 'form.comChangeStatus == 1  && (form.checkType == 2) && comAddressState == 1'>
          <div class="addrTool">{{form.comChangeRemark == ''?'路/乡/镇 门牌号':''}}</div>
          <div class="module-item">
            <input type="text" placeholder="请输入" class = "FU-input addressText color73" v-model = "form.comChangeRemark">
          </div>
        </div>     
        <div class="bottom-line" v-if = 'form.checkType == 2  && comAddressState == 1'></div>   
        <div class="FU-item"  v-if = 'form.checkType == 2  && comAddressState == 1'>
          <div class="FU-lable required otherExpectionStatus">地址是否异常</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span @click = "tabRadio(0,'comExceptionStatus')"><i class="radioDispear" :class = "[!form.comExceptionStatus ? 'radioDispearActive':'']" ></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'comExceptionStatus')"><i class="radioDispear" :class = "[form.comExceptionStatus ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div>         
        <div class="FU-item"  v-if = 'form.comExceptionStatus == 1 && (form.checkType == 2)  && comAddressState == 1'>
          <div class="addrTool">{{form.comExceptionRemark == ''?'路/乡/镇 门牌号':''}}</div>
          <div class="module-item">
            <input type="text" placeholder="请输入" class = "FU-input addressText color73" v-model = "form.comExceptionRemark">
          </div>
        </div>
      </div>
      <div class="FU-module">
        <div class="FU-item" >
          <div class="FU-lable required otherExpectionStatus">其他异常信息</div>
          <div class="module-item com-flex">
            <div class="com-flex1">
              <span><i class="radioDispear" :class = "[!form.otherExpectionStatus ? 'radioDispearActive':'']" @click = "tabRadio(0,'otherExpectionStatus')"></i>否</span>
            </div>
            <div class="com-flex1">
              <span @click = "tabRadio(1,'otherExpectionStatus')"><i class="radioDispear" :class = "[form.otherExpectionStatus ? 'radioDispearActive':'']"></i>是</span>
            </div>
          </div>
        </div> 
        <div class="bottom-line" v-if = 'form.otherExpectionStatus == 1'></div>
        <div class="FU-item"  v-if = 'form.otherExpectionStatus == 1'>
          <div class="module-item com-flex1">
            <input type="text" placeholder="请输入" class = "FU-input com-flex1 color73" v-model = "form.otherExpectionInput">
          </div>
        </div>             
      </div>
      <div class="FU-module">
        <div class="FU-item" >
          <div class="FU-lable required mt10">结论</div>
          <div class="module-item com-flex">
            <div class="com-flex1 resault">
              <div class="com-flex1 com-left mb10">
                <span @click = "tabRadio(1,'monitorResult')"><i class="radioDispear" :class = "[form.monitorResult == 1 ? 'radioDispearActive':'']"></i>正常</span>
              </div>
              <div class="com-flex1 com-left">
                <span @click = "tabRadio(2,'monitorResult')"><i class="radioDispear" :class = "[form.monitorResult == 2? 'radioDispearActive':'']"></i>移交电催</span>
              </div>
            </div>
            <div class="com-flex1 resault">
              <div class="com-flex1 com-left mb10">
                <span @click = "tabRadio(3,'monitorResult')"><i class="radioDispear" :class = "[form.monitorResult == 3 ? 'radioDispearActive':'']"></i>移交外访</span>
              </div>
              <div class="com-flex1 com-left">
                <span @click = "tabRadio(4,'monitorResult')"><i class="radioDispear" :class = "[form.monitorResult == 4 ? 'radioDispearActive':'']"></i>移交总部</span>
              </div>
            </div>            
          </div>
        </div> 
        <!-- <div class="bottom-line" v-if = 'form.otherExpectionStatus == 1'></div>
        <div class="FU-item"  v-if = 'form.otherExpectionStatus == 1'>
          <div class="module-item com-flex1">
            <input type="text" placeholder="请输入" class = "FU-input com-flex1 color73" v-model = "form.otherExpectionInput">
          </div>
        </div>              -->
      </div>
      <div class="FU-module">
        <div class="FU-item textareaH">
          <div class="FU-lable required">回访意见</div>
          <div class="module-item">
            <textarea type="text" placeholder="请输入" :class="['FU-textarea',form.visitOpinion == ''?'default':'choose']" 
              maxlength='200' v-model="form.visitOpinion"></textarea>
          </div>
        </div>
      </div>
      <div class="FU-btn">
        <button class="confirm-btn" @click="confirm" :disabled = 'disabled'>确定</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import CommonBack from "@/components/CommonBack";
import api from "@/api/index";
const asyncSelectedIndex = [0, 0, 0];
export default {
  name: "AddFollowUp",
  data() {
    return {
      backTitle: "新增跟进",
      showCustFollow: true,
      disabled: false,
      maxlength: 50,
      zTreeData: [],
      columns2: [
        // 监测方式
        {
          text: "常规监测",
          value: "1"
        },
        {
          text: "上门回访",
          value: "2"
        }
      ],
      columns3: [],// 上门回访家庭地址
      columns4: [], //  上门回访公司地址
      homeAddressState: 0,//是否回访公司地址
      comAddressState: 0, //是否回访公司地址
      label: {
        checkType: "" ////监测方式
      },
      form: {
        checkDate: "", // 监测时间
        checkType: "", //监测方式
        disappearStatus: 0, // 是否失联,状态
        disappearInput: "", // 是否失联
        expectionStatus: 0, // 是否异常,状态
        expectionInput: "", // 是否异常
        otherExpectionStatus: 0, //其他异常信息，状态
        otherExpectionInput: "", //其他异常信息
        monitorResult: 1, // 结论
        visitOpinion: "", //回访意见
        homeAddress: "", // 上门回访家庭地址
        homeAddressId: [],// 上门回访家庭地址
        homeDetAddress: "", // 上门回访家庭地址--门号
        homeChangeStatus: 0, // 地址是否变化
        homeChangeRemark: "", // 地址是否变化--输入内容
        homeExceptionStatus: 0, // 地址是否异常
        homeExceptionRemark: "", // 地址是否异常--输入内容
        comAddress: "", // 上门回访公司地址
        comAddressId: [],// 上门回访公司地址
        comDetAddress: "", // 上门回访公司地址--门号
        comChangeStatus: 0, // 地址是否变化
        comChangeRemark: "", // 地址是否变化--输入内容
        comExceptionStatus: 0, // 地址是否异常
        comExceptionRemark: "" // 地址是否异常--输入内容
      }
    };
  },
  created() {
    // console.log(this.$route.query)
    this.queryAllAddressFn()
  },
  mounted() {
    this._initPicker();
  },
  methods: {
    tabRadio(val, type) {
      if (type == "disappearStatus") {
        // 是否失联
        this.form.disappearStatus = val;
        if (this.form.disappearStatus != 1) {
          this.form.disappearInput = "";
        }
      }
      if (type == "expectionStatus") {
        // 是否异常
        this.form.expectionStatus = val;
        if (this.form.expectionStatus != 1) {
          this.form.expectionInput = "";
        }
        console.log(val, type, this.form.expectionInput, "22");
      }

      if (type == "otherExpectionStatus") {
        // 其他异常信息
        this.form.otherExpectionStatus = val;
        if (this.form.otherExpectionStatus != 1) {
          this.form.otherExpectionInput = "";
        }
        console.log(val, type, this.form.otherExpectionInput, "22");
      }
      if (type == "monitorResult") {
        // 结论
        this.form.monitorResult = val;
        console.log(val, type, this.form.otherExpectionInput, "22");
      }
      if (type == 'homeAddress') {
        // 是否回访家庭地址
        this.homeAddressState = val
        if (this.homeAddressState == 0) {
          this.form.homeAddress = '' 
          this.form.homeDetAddress  = '' 
          this.form.homeChangeStatus = 0
          this.form.homeChangeRemark  = '' 
          this.form.homeExceptionStatus  = 0
          this.form.homeExceptionRemark = '' 
        }
      }
      if (type == 'comAddress') {
        // 是否回访公司地址
        this.comAddressState = val
        if (this.comAddressState == 0) {
          this.form.comAddress = ''
          this.form.comDetAddress = ''
          this.form.comChangeStatus = 0
          this.form.comChangeRemark = ''
          this.form.comExceptionStatus = 0
          this.form.comExceptionRemark = ''
        }
      }
      if (type == "homeChangeStatus") {
        // 家庭地址是否变化
        this.form.homeChangeStatus = val;
        if (this.form.homeChangeStatus != 1) {
          this.form.homeChangeRemark = "";
        }
        console.log(
          this.form.homeChangeStatus,
          this.form.homeChangeRemark,
          "22"
        );
      }
      if (type == "homeExceptionStatus") {
        // 家庭地址是否异常
        this.form.homeExceptionStatus = val;
        if (this.form.homeExceptionStatus != 1) {
          this.form.homeExceptionRemark = "";
        }
        console.log(
          this.form.homeExceptionStatus,
          this.form.homeExceptionStatus,
          "22"
        );
      }
      if (type == "comChangeStatus") {
        // 公司地址是否变化
        this.form.comChangeStatus = val;
        if (this.form.comChangeStatus != 1) {
          this.form.comChangeRemark = "";
        }
        console.log(this.form.comChangeStatus, this.form.comChangeRemark, "22");
      }
      if (type == "comExceptionStatus") {
        // 公司地址是否异常
        this.form.comExceptionStatus = val;
        if (this.form.comExceptionStatus != 1) {
          this.form.comExceptionRemark = "";
        }
        console.log(
          this.form.comExceptionStatus,
          this.form.comExceptionRemark,
          "22"
        );
      }
    },
    isShowPop(val) {
      switch (val) {
        case 1:
          this.picker1.show();
          break;
        case 2:
          this.picker2.show();
          break;
        case 3:
          this.picker3.show();
          break;
        case 4:
          this.picker4.show();
          break;
        default:
          break;
      }
    },
    // 提交确定
    confirm() {
      // console.log("提交成功", this.form);
      // 验证"监测时间"
      if (!this.form.checkDate) {
        this.showToast("请选择监测时间");
        return;
      }
      // 验证"监测方式"
      if (!this.form.checkType) {
        this.showToast("请选择监测方式");
        return;
      }
      // 验证"是否失联"
      if (this.form.disappearStatus == 1 && !this.form.disappearInput) {        
        this.showToast("请填写失联备注");
        return;
      }
      // 验证"是否异常"
      if (this.form.expectionStatus == 1 && !this.form.expectionInput) {
        this.showToast("请填写异常备注");
        return;
      }
      // 验证"其他异常信息"
      if (this.form.otherExpectionStatus == 1 && !this.form.otherExpectionInput) {
        this.showToast("请填写其他异常信息备注");
        return;
      }
      // 验证“上门回访家庭地址”
      if (this.form.checkType == 2 && this.homeAddressState == 1) {
        if (!this.form.homeAddress || !this.form.homeDetAddress) {
          this.showToast("请填写上门回访家庭地址");
          return;
        }
        // 地址是否变化
        if (this.form.homeChangeStatus == 1) {
          if (!this.form.homeChangeRemark) {
            this.showToast("请填写地址变化备注");
            return;
          }          
        }
        // 地址是否异常
        if (this.form.homeExceptionStatus == 1) {
          if (!this.form.homeExceptionRemark) {
            this.showToast("请填写地址异常备注");
            return;
          }          
        }
      }
      // 验证“上门回访公司地址”
      if (this.form.checkType == 2  && this.comAddressState == 1) {
        if (!this.form.comAddress || !this.form.comDetAddress) {
          this.showToast("请填写上门回访公司地址");
          return;
        }
        // 地址是否变化
        if (this.form.comChangeStatus == 1) {
          if (!this.form.comChangeRemark) {
            this.showToast("请填写地址变化备注");
            return;
          }          
        }
        // 地址是否异常
        if (this.form.comExceptionStatus == 1) {
          if (!this.form.comExceptionRemark) {
            this.showToast("请填写地址异常备注");
            return;
          }          
        }      
      }
      // 验证回访意见
      if (!this.form.visitOpinion) {
        this.showToast("请填回访意见");
        return;
      }
      this.saveFollowInfoFn()
      console.log("提交成功", this.form);
    },
    // 验证弹框
    showToast(txt, toastTime) {
      this.disabled = true;
      const toast = this.$createToast({
        time: toastTime || 1000,
        txt: txt || "请输入内容",
        type: "warn"
      });
      toast.show();
      setTimeout(() => {
        toast.hide();
        // if (!this.flagMoney) {
        //   this.disabled = true
        // } else {
        //   }
        this.disabled = false;
      }, 1500);
    },
    // 重置
    reset() {},
    saveFollowInfoFn() {
      this.disabled = true;  
      let pararms = {
        followNode: 2,
        crmCustInfoId: this.$route.query.crmCustInfoId,
        followTime: this.form.checkDate, // 监测时间
        monitorType: this.form.checkType, //监测方式
        disappearStatus: this.form.disappearStatus, // 是否失联,状态
        disappearRemark: this.form.disappearInput, // 是否失联
        expectionStatus: this.form.expectionStatus, // 是否异常,状态
        expectionRemark: this.form.expectionInput,// 是否异常
        otherExceptionStatus: this.form.otherExpectionStatus, // 其他异常信息，状态
        otherExceptionRemark: this.form.otherExpectionInput,// 其他异常信息
        monitorResult: this.form.monitorResult, // 结论
        visitOpinion: this.form.visitOpinion,// 回访意见        
      };
      if (this.form.checkType == 2) { // 上门回访
        pararms.homeProvinceId = this.form.homeAddressId[0] || ''; // 上门回访家庭地址
        pararms.homeCityId = this.form.homeAddressId[1] || ''; // 上门回访家庭地址
        pararms.homeDistrictId = this.form.homeAddressId[2] || ''; // 上门回访家庭地址
        pararms.homeAddress = this.form.homeDetAddress; // 上门回访家庭地址--门号
        pararms.homeChangeStatus = this.form.homeChangeStatus; // 地址是否变化
        pararms.homeChangeRemark = this.form.homeChangeRemark; // 地址是否变化--输入内容
        pararms.homeExceptionStatus = this.form.homeExceptionStatus; // 地址是否异常
        pararms.homeExceptionRemark = this.form.homeExceptionRemark; // 地址是否异常--输入内容
        pararms.comProvinceId = this.form.comAddressId[0] || ''; // 上门回访公司地址
        pararms.comCityId = this.form.comAddressId[1] || ''; // 上门回访公司地址
        pararms.comDistrictId = this.form.comAddressId[2] || ''; // 上门回访公司地址
        pararms.comAddress = this.form.comDetAddress; // 上门回访公司地址--门号
        pararms.comChangeStatus = this.form.comChangeStatus; // 地址是否变化
        pararms.comChangeRemark = this.form.comChangeRemark; // 地址是否变化--输入内容
        pararms.comExceptionStatus = this.form.comExceptionStatus; // 地址是否异常
        pararms. comExceptionRemark = this.form.comExceptionRemark; // 地址是否异常--输入内容
      }     
      let loading = this.$createToast({
        time: 1500,
        txt: "加载中...",
        mask: true
      });
      loading.show()
      api.saveFollowInfo(pararms).then(res => {
        this.disabled = false;
        loading.hide()
        if (res.data.success) {
          // window.location.reload()
          this.resetData()
          this.toastSubmit('correct',res.data.msg)
        } else {
          this.toastSubmit('error',res.data.msg)
        }
      });
    },
    resetData() {
      this.label = {
        checkType: "" ////监测方式
      },
       this.form = {
        checkDate: "", // 监测时间
        checkType: "", //监测方式
        disappearStatus: 0, // 是否失联,状态
        disappearInput: "", // 是否失联
        expectionStatus: 0, // 是否异常,状态
        expectionInput: "", // 是否异常
        otherExpectionStatus: 0, //其他异常信息，状态
        otherExpectionInput: "", //其他异常信息
        monitorResult: 1, // 结论
        visitOpinion: "", //回访意见
        homeAddress: "", // 上门回访家庭地址
        homeAddressId: [],// 上门回访家庭地址
        homeDetAddress: "", // 上门回访家庭地址--门号
        homeChangeStatus: 0, // 地址是否变化
        homeChangeRemark: "", // 地址是否变化--输入内容
        homeExceptionStatus: 0, // 地址是否异常
        homeExceptionRemark: "", // 地址是否异常--输入内容
        comAddress: "", // 上门回访公司地址
        comAddressId: [],// 上门回访公司地址
        comDetAddress: "", // 上门回访公司地址--门号
        comChangeStatus: 0, // 地址是否变化
        comChangeRemark: "", // 地址是否变化--输入内容
        comExceptionStatus: 0, // 地址是否异常
        comExceptionRemark: "" // 地址是否异常--输入内容
      }
    },
    toastSubmit(type, val) {
      const toast = this.$createToast({
        txt: val,
        type: type,
        time: 0,
        onTimeout: () => {
          console.log("Timeout");
        }
      });
      toast.show();
      setTimeout(() => {
        toast.hide();
      }, 1000);
    },  
    goCustFollow() {
      this.$router.push({
        path: "/followList",
        query: {
          crmCustInfoId: this.$route.query.crmCustInfoId
        }
      });
    },
    queryProvinceFn() {
      //省份
      api.queryProvince().then(res => {
        if (res.data.success) {
          let data = res.data.data;
          for (let i in data) {
            let obj = {};
            obj.value = data[i].id;
            obj.text = data[i].provinceName;
            this.columns4.push(obj);
          }
          // console.log(this.columns4, "this.columns3----------");
        }
      });
    },    
    _initPicker() {
      // 监测时间
      this.picker1 = this.$createDatePicker({
        title: "监测时间",
        min: new Date(2000, 0, 0),
        max: new Date(2050, 9, 20),
        value: new Date(),
        format: {
          year: "YYYY",
          month: "MM",
          date: "DD"
        },
        onSelect: (Val, Index, Text) => {
          if (Text) {
            this.form.checkDate = Text.join("-");
          }
          // console.log(this.form.checkDate, Val, Index, Text);
        },
        onCancel: () => {
          this.form.checkDate = "";      
        }
      });
      // 监测方式
      this.picker2 = this.$createPicker({
        title: "监测方式",
        data: [this.columns2],
        onSelect: (Val, Index, Text) => {
          this.label.checkType = Text[0];
          this.form.checkType = Val[0];
          console.log(this.form.checkType, Val, Index, Text);
          if (this.form.checkType == 1) {// 常规监测
            // 常规监测
            let obj = {
              homeAddress: "", // 上门回访家庭地址
              homeAddressId: [],
              homeDetAddress: "", // 上门回访家庭地址--门号
              homeChangeStatus: 0, // 地址是否变化
              homeChangeRemark: "", // 地址是否变化--输入内容
              homeExceptionStatus: 0, // 地址是否异常
              homeExceptionRemark: "", // 地址是否异常--输入内容
              comAddress: "", // 上门回访公司地址
              comAddressId: [],
              comDetAddress: "", // 上门回访公司地址--门号
              comChangeStatus: 0, // 地址是否变化
              comChangeRemark: "", // 地址是否变化--输入内容
              comExceptionStatus: 0, // 地址是否异常
              comExceptionRemark: "" // 地址是否异常--输入内容
            }
            this.form = Object.assign(this.form,obj)
            console.log(this.form)
          } 
        },
        onCancel: () => {
          this.label.checkType = "";
          this.form.checkType = "";
        }
      });
      // 上门回访家庭地址
      this.picker3 = this.$createCascadePicker({
        title: "上门回访家庭地址",
        data: this.columns3,
        onSelect: (Val, Index, Text) => {
          console.log(Val, Index, Text);
          // this.addressType = Text[0] ? Text[0] : "";
          this.form.homeAddress = Text.join(" ") ? Text.join(" ") : "";
          this.form.homeAddressId = Val;
        },
        onCancel: () => {
          this.form.homeAddress = ''
          this.form.homeAddressId =  []
          this.form.homeDetAddress = ''
        }
      });
      // 上门回访公司地址
      this.picker4 = this.$createCascadePicker({
        title: "上门回访公司地址",
        data: this.columns4,
        onSelect: (Val, Index, Text) => {
          console.log(Val, Index, Text);
          // this.addressType = Text[0] ? Text[0] : "";
          this.form.comAddress = Text.join(" ") ? Text.join(" ") : "";
          this.form.comAddressId = Val;
        },
        onCancel: () => {
          this.form.comAddress = ''
          this.form.comAddressId = []
          this.form.comDetAddress = ''
        }
      });
    },
    queryAllAddressFn() {
      api.queryAllAddress().then(res => {
        if (res.data.success) {
          let data = res.data.data;
          for (let i in data) {
            let obj = {};
            obj.value = data[i].value;
            obj.text = data[i].text;
            if (data[i].children) {
              obj.children = data[i].children;
            }
            this.columns3.push(obj);
            this.columns4.push(obj);
          }
        }
        // this.columns4 = res.data.data
        // console.log(this.columns4,"dddddddddddd")
        // console.log(res.data.data,"dddddddddddd")
      });
    }
  },
  components: {
    // CommonFU,
    CommonBack
  }
};
</script>

<style scoped lang="less">
.FU-top {
  height: 50px;
  line-height: 50px;
  background-image: -webkit-linear-gradient(
    -52deg,
    #232c81 110px,
    #2858a0 200px
  );
}
// 默认色 选择色
.default {
  color: #c4c4c4;
}
.choose {
  color: #737373;
}
.bottom-line {
  width: 100%;
  height: 1px;
  // margin-left: 12px;
  padding-right: 12px;
  background: #e5e5e5;
}
.Listen-main {
  margin-top: 50px;
  overflow: auto;
  .FU-module {
    padding: 0 12px;
    margin-top: 9px;
    font-size: 16px;
    background: #fff;
    .FU-item {
      display: flex; // height: 67px;
      padding: 24px 0;
      // line-height: 67px;
      flex-direction: row;
      justify-content: space-between;
      line-height: 16px;
      // height: 16px;
      .FU-lable {
        display: inline-block; // height: 15px;
        // line-height: 15px;
        color: #4d4d4d;
        width: 90px;
      }
      .otherExpectionStatus {
        width: 140px;
      }
      .wid140 {
        width: 140px;
      }
      .module-item {
        // line-height: 15px;
        flex: 1;
        text-align: right;
        font-size: 16px;
        color: #737373;
        display: flex;
        .item-value {
          margin-right: 10px;
          flex: 1;
        }
        .com-icon-link {
          margin-top: 1px;
        }
        .FU-input {
          // width: 230px;
          // height: 30px;
          padding-right: 19px;
          text-align: right;
        }
      }
      .com-left {
        text-align: left;
      }
    }
  }
}
.FU-btn {
  font-size: 0;
  .confirm-btn {
    display: block;
    width: 80%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    color: #ffffff;
    background: #0e7fff;
    // margin: auto;
    border-radius: 0.22rem;
    margin: 22px auto;
    outline: none;
    border: none;
  }
}
.FU-textarea {
  width: 230px;
  font-size: 16px;
  min-height: 65px;
  padding-right: 9px;
  padding-right: 20px;
  box-sizing: border-box;
}
.cube-textarea {
  padding-top: 0;
  text-align: right;
}
.reTextarea {
  outline: none;
  border: none;
}
.Listen-main .FU-module .textareaH {
  height: 75px;
  padding-bottom: 0;
  color: #737373;
}
.textareaH textarea {
  text-align: right;
  color: #737373;
  outline: none;
  border: none;
}
.radioDispear {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../../assets/images/loanImages/radio_default.png") no-repeat;
  background-size: cover;
  vertical-align: middle;
  margin-top: -3px;
  margin-right: 4px;
}
.radioDispearActive {
  background: url("../../assets/images/loanImages/radio_check.png") no-repeat;
  background-size: cover;
}
.com-flex1 {
  text-align: center;
}
.color73 {
  color: #737373;
}
.mt10 {
  margin-top: 10px;
}
.mb10 {
  margin-bottom: 10px;
}
.addrTool {
  color: #c4c4c4;
}
.addressText {
  width: 100%;
  box-sizing: border-box;
}
</style>
