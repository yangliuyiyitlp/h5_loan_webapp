<template>
  <div class="page followUp">
    <div class="FU-top com-fix">
      <CommonBack :backTitle='backTitle' :showCustFollow = 'showCustFollow' @goCustFollow = 'goCustFollow'></CommonBack>
    </div>
    <div class="FU-main">
      <div class="FU-module">
        <div class="FU-item" >
          <div class="FU-lable required">跟进形式</div>
          <div class="module-item" @click='isShowPop(1)'>
            <span :class="['item-value',FUType == '' ? 'default':'choose']">{{FUType == ''?'请选择':FUType}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
      </div>
      <div class="FU-module">
        <div class="FU-item" @click='isShowPop(2)'>
          <div class="FU-lable required">跟进对象</div>
          <div class="module-item">
            <span :class="['item-value',FUObj  == '' ? 'default':'choose']">{{FUObj == ''?'请选择':FUObj}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="bottom-line"></div>
        <div class="FU-item">
          <div class="FU-lable required">姓名</div>
          <div class="module-item">
            <input type="text" placeholder="请输入" :class="['FU-input', form.name == ''?'default':'choose']" v-model="form.name">
          </div>
        </div>
        <div class="bottom-line"></div>
        <div class="FU-item">
          <div class="FU-lable">联系电话</div>
          <div class="module-item">
            {{FUMobile}}
            <!-- <input type="text" placeholder="请输入" :class="['FU-input',phone==''?'default':'choose']" v-model="phone"> -->
          </div>
        </div>
      </div>
      <div class="FU-module">
        <div class="FU-item" @click='isShowPop(6)' v-show = "form.FUType == '000021-0002' ? true:false">
          <div class="FU-lable required">地址状态</div>
          <div class="module-item">
            <span :class="['item-value',addrState == '' ? 'default':'choose']">{{addrState == '' ? '请选择' : addrState}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="bottom-line" v-show = "form.FUType == '000021-0002'?true:false"></div>
        <div class="FU-item" @click='isShowPop(3)' v-show = "form.FUType == '000021-0002'?true:false">
          <div class="FU-lable required">地址类型</div>
          <div class="module-item">
            <span :class="['item-value',form.addressType == ''? 'default':'choose']">{{form.addressType == '' ? '请选择' : form.addressType}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="bottom-line" v-show = "addressType != 4 && addressType != '' && form.FUType == '000021-0002'"></div>
        <div class="FU-item" v-show = "addressType != 4 && addressType != '' && form.FUType == '000021-0002'">
          <div class='FU-lable'>详细地址</div>
          <div class="module-item com-left">
            <span>{{addressObj.addressProvince}}</span>
              <span>{{addressObj.addressCity}}</span>
              <span>{{addressObj.addressArea}}</span>
              <span>{{addressObj.detailedAddress}}</span>
          </div>
        </div>
        <div class="bottom-line" v-show = "form.FUType == '000021-0002'?true:false"></div>
        <div class="FU-item" @click='isShowPop(4)' v-show = "addressType == 4 && form.FUType == '000021-0002'">
          <div class='FU-lable required'>详细地址</div>
          <div class="addrTool" v-show=" form.detailAddress == null?true:false">-省- -市- -区-</div>
          <div class="module-item">
            <span :class="['item-value',form.detailAddress == null ?'default':'choose']">{{form.detailAddress == null ? '请选择' : form.detailAddress}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="bottom-line" v-show = "addressType == 4 && form.FUType == '000021-0002'"></div>
        <div class="FU-item" v-show = "addressType == 4 && form.FUType == '000021-0002'">
          <div class="addrTool">{{form.addressText == ''?'路/乡/镇 门牌号':''}}</div>
          <div :class="['module-item',form.addressText==''?'':'addressText']">
            <input type="text" placeholder="请输入" :class="['FU-input addressText',form.addressText==''?'default':'choose']" v-model="form.addressText">
          </div>
        </div>                
      </div>
      <div class="FU-module">
        <div class="FU-item" @click='isShowPop(5)' v-show = "form.FUType != '000021-0002'">
          <div class="FU-lable">电话状态</div>
          <div class="module-item">
            <span :class="['item-value',phoneState == '' ? 'default':'choose']">{{phoneState == '' ? '请选择' : phoneState}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
      </div>
      <div class="FU-module">        
        <div class="FU-item" @click='isShowPop(7)'>
          <div class="FU-lable">工作状态</div>
          <div class="module-item">
            <span :class="['item-value',workState == '' ? 'default':'choose']">{{workState == '' ? '请选择' : workState}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
      </div>
      <div class="FU-module">
        <div class="FU-item" @click='isShowPop(8)'>
          <div class="FU-lable">债务人状态</div>
          <div class="module-item">
            <span :class="['item-value',debtorState == '' ? 'default':'choose']">{{debtorState == '' ? '请选择' : debtorState}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
      </div>
      <div class="FU-module">
        <div class="FU-item" @click='isShowPop(9)'>
          <div class="FU-lable required">催收反馈</div>
          <div class="module-item">
            <span :class="['item-value',collectionFB == '' ? 'default':'choose']">{{collectionFB == '' ? '请选择' : collectionFB}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
      </div>
      <div class="FU-module">
        <div class="FU-item" @click='isShowPop(10)' v-show = "form.collectionFB == 1 ? true:false">
          <div class="FU-lable required">还款日期</div>
          <div class="module-item">
            <span :class="['item-value',form.repayDate == '' ? 'default':'choose']">{{form.repayDate == '' ? '请选择' : form.repayDate}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="bottom-line" v-show = "form.collectionFB == 1 ? true:false"></div>
        <div class="FU-item" v-show = "form.collectionFB == 1 ? true:false">
          <div class="FU-lable required">还款金额</div>
          <div class="module-item">
            <input type="text" 
              maxlength= '9' 
              placeholder="请输入"
              @blur = 'checkMoney' 
              :class="['FU-input',form.repayMoney == ''?'default':'choose']" 
              v-model.trim="form.repayMoney">
          </div>
        </div>
      </div>
      <div class="FU-module">
        <div class="FU-item textareaH">
          <div class="FU-lable required">跟进情况</div>
          <div class="module-item ">
            <textarea type="text" placeholder="请输入" class="reTextarea" :class="['FU-textarea',form.FUSituation == ''?'default':'choose']"
              :maxlength='maxlength' v-model="form.FUSituation"></textarea>
          </div>
        </div>
        <div class="bottom-line"></div>
        <div class="FU-item" @click='isShowPop(11)'>
          <div class="FU-lable">预约跟进</div>
          <div class="module-item">
            <span :class="['item-value',form.orderFU == '' ? 'default':'choose']">{{form.orderFU == '' ? '请选择' : form.orderFU}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
      </div>
      <div class="FU-module">
        <div class="FU-item textareaH">
          <div class="FU-lable">预约提醒</div>
          <div class="module-item">
            <textarea type="text" placeholder="请输入" :class="['FU-textarea',form.orderRemind == ''?'default':'choose']" 
              :maxlength='maxlength' v-model="form.orderRemind"></textarea>
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
// import CommonFU from "@/components/CommonFU";
import CommonBack from "@/components/CommonBack";
import api from "@/api/index";
const asyncSelectedIndex = [0, 0, 0];
export default {
  name: "AddFollowUp",
  data() {
    return {
      backTitle: "新增跟进",
      showCustFollow: true,
      indicator: true,
      disabled: false,
      maxlength: 200,
      zTreeData: [],
      columns1: [
        // 跟进形式
        {
          text: "电话",
          value: "000021-0003"
        },
        {
          text: "外访",
          value: "000021-0002"
        }
      ],
      columns2: [], // 跟进对象
      columns3: [
        // 地址类型
        {
          text: "现居住地地址",
          value: 1
        },
        {
          text: "单位地址",
          value: 2
        },
        {
          text: "身份证地址",
          value: 3
        },
        {
          text: "其他",
          value: 4
        }
      ],
      columns4: [], // 详细地址 数据字典维护三级联动
      columns5: [], // 电话状态 数据字典维护
      columns6: [], // 地址状态 数据字典维护
      columns7: [], // 工作状态 数据字典维护
      columns8: [], // 债务人状态 数据字典维护
      columns9: [
        // 催收反馈
        {
          text: "承诺还款",
          value: 1
        },
        {
          text: "协助跟进",
          value: 2
        },
        {
          text: "未知",
          value: 3
        },
        {
          text: "拒绝还款",
          value: 4
        }
      ],
      FUType: "", // 跟进形式text
      FUObj: "", // 跟进对象text
      name: "", // 姓名val
      phone: "", // 联系电话val
      phoneState: "", // 电话状态text
      workState: "", // 工作状态text
      debtorState: "", // 债务人状态text
      collectionFB: "", // 催收反馈text
      orderFU: "", // 跟进时间text
      addrState: "", // 地址状态text
      addressType: "", // 地址类型text
      // detailAddress: "", // 详细地址text
      form: {
        FUType: "", //跟进形式
        FUObj: "", //跟进对象
        name: "", //姓名
        relationMobile: "",
        phoneState: "",
        workState: "",
        debtorState: "",
        collectionFB: "",
        orderFU: "",
        repayDate: "",
        repayMoney: "",
        FUSituation: "",
        orderRemind: "",
        addrState: "",
        addressType: "",
        addressText: "",
        detailAddress: null
      },
      FUMobile: "",
      addressObj: {},
      flagMoney: true,
      dateNext:''
      // toastLoading: null
    };
  },
  created() {
    this._inint();
    this.dateNext=this.getDateStr(1)
    console.log(this.dateNext)
    // console.log(this.$route.query)
  },
  mounted() {
    // 跟进形式下拉
    this.picker1 = this.$createPicker({
      title: "跟进形式",
      data: [this.columns1],
      onSelect: (Val, Index, Text) => {
        this.FUType = Text[0];
        this.form.FUType = Val[0];
        if (this.form.FUType == "000021-0002") {
          //要是“外访”，清空电话状态
          this.phoneState = "";
          this.form.phoneState = "";
        } else {
          //要是“电话”，清空地址状态、地址类型
          this.addrState = "";
          this.addressType = "";
          this.form.addrState = "";
          this.form.addressType = "";
          //要是“电话”，清空非必填的详细地址
          this.addressObj = {};
          //要是“电话”，清空必填的详细地址
          this.form.detailAddress = null;
          this.form.addressText = "";
        }
      },
      onCancel: () => {}
    });
    // 跟进对象下拉
    this.picker2 = this.$createPicker({
      title: "跟进对象",
      data: [this.columns2],
      alias: {
        value: "mobile",
        text: "relation"
      },
      onSelect: (Val, Index, Text) => {
        this.FUObj = Text[0];
        this.form.FUObj = Text[0];
        console.log(Val, Index, Text, this.form.FUObj, "===");
        if (this.columns2) {
          this.form.name = this.columns2[Index].name;
          this.form.relationMobile = this.columns2[Index].mobile;
          this.FUMobile = this.columns2[Index].phone;
        } else {
          this.form.name = "";
          this.form.relationMobile = "";
        }
        console.log(this.form.relationMobile, this.form.name, Text);
        // this.FUObjVal = Val[0];
        // 判断是否本人 联系人 单位 赋值姓名与注册手机号码
        // if (Text[0]) {
        //   this.name = "张三"; // 姓名val
        //   this.phone = "18515476213"; // 联系电话val
        // }
      },
      onCancel: () => {}
    });
    // 地址类型下拉
    this.picker3 = this.$createPicker({
      title: "地址类型",
      data: [this.columns3],
      onSelect: (Val, Index, Text) => {
        console.log(Val, Index, Text);
        this.addressType = Val[0] ? Val[0] : "";
        this.form.addressType = Text[0] ? Text[0] : "";
        console.log(
          this.addressType,
          this.form.addressType,
          "Val, Index, Text"
        );
        // 清除之前地址信息
        this.detailAddress = ""; // 详细地址text
        // this.detailAddrVal = null; // 详细地址val
        // this.addressText = ""; // 地址路/乡/镇
        console.log(Val[0], this.form.addressType, "Val[0]");
        if (Val[0] != 4) {
          this.form.addressText = "";
          this.form.detailAddress = null;
          this.queryAddressInfoFn(this.addressType);
        }
      },
      onCancel: () => {}
    });
    this.picker4 = this.$createCascadePicker({
      title: "详细地址",
      data: this.columns4,
      // selectedIndex: asyncSelectedIndex.slice(),
      // alias: {
      //   value: "id",
      //   text: "provinceName"
      // },
      onSelect: (Val, Index, Text) => {
        this.form.detailAddress = Text.join(" ");
        console.log(Val, Index, Text);
        console.log(this.form.detailAddress);
        // this.detailAddress = Text[0];
        // this.detailAddrVal = Val[0];
      },
      onCancel: () => {
        this.form.addressText = "";
        this.form.detailAddress = null;
      }
      // onChange: this.asyncChangeHandle
    });
    // 电话状态下拉
    this.picker5 = this.$createPicker({
      title: "电话状态",
      data: [this.columns5],
      alias: {
        value: "detailCode",
        text: "name"
      },
      onSelect: (Val, Index, Text) => {
        this.phoneState = Text[0] ? Text[0] : "";
        this.form.phoneState = Val[0] ? Val[0] : "";
        console.log(this.form.phoneState);
      },
      onCancel: () => {}
    });
    // 地址状态下拉
    this.picker6 = this.$createPicker({
      title: "地址状态",
      data: [this.columns6],
      alias: {
        value: "detailCode",
        text: "name"
      },
      onSelect: (Val, Index, Text) => {
        console.log(Val, Index, Text);
        this.addrState = Text[0] ? Text[0] : "";
        this.form.addrState = Text[0] ? Text[0] : "";
        console.log(this.form.addrState, "this.form.addrState", Text);
      },
      onCancel: () => {}
    });
    // 工作状态下拉
    this.picker7 = this.$createPicker({
      title: "工作状态",
      data: [this.columns7],
      alias: {
        value: "detailCode",
        text: "name"
      },
      onSelect: (Val, Index, Text) => {
        this.workState = Text[0] ? Text[0] : "";
        this.form.workStateVal = Val[0] ? Val[0] : "";
      },
      onCancel: () => {}
    });
    // 债务人状态下拉
    this.picker8 = this.$createPicker({
      title: "债务人状态",
      data: [this.columns8],
      alias: {
        value: "detailCode",
        text: "name"
      },
      onSelect: (Val, Index, Text) => {
        this.debtorState = Text[0] ? Text[0] : "";
        this.form.debtorState = Val[0] ? Val[0] : "";
      },
      onCancel: () => {}
    });
    // 催收反馈下拉
    this.picker9 = this.$createPicker({
      title: "催收反馈",
      data: [this.columns9],
      onSelect: (Val, Index, Text) => {
        console.log(Val, Index, Text);
        this.collectionFB = Text[0] ? Text[0] : "";
        this.form.collectionFB = Val[0] ? Val[0] : "";
        if (this.form.collectionFB != 1) {
          //清空’还款日期‘，’还款金额‘
          this.form.repayDate = "";
          this.form.repayMoney = "";
        }
      },
      onCancel: () => {}
    });
    // 还款日期 日期选择器
    this.picker10 = this.$createDatePicker({
      title: "还款日期",
      min: new Date(this.dateNext),
      max: new Date(2050, 9, 20),
      value: new Date(),
      format: {
        year: "YYYY",
        month: "MM",
        date: "DD"
      },
      onSelect: (Val, Index, Text) => {
        console.log(Val, Index, Text);
        this.form.repayDate = Text.join("-");
        // this.repayDateVal = Val; //转换成后台需要
      },
      onCancel: () => {}
    });
    // 预约跟进日期选择器
    this.picker11 = this.$createDatePicker({
      title: "跟进日期",
      min: new Date(this.dateNext),
      max: new Date(2050, 9, 20),
      value: new Date(),
      format: {
        year: "YYYY",
        month: "MM",
        date: "DD"
      },
      onSelect: (Val, Index, Text) => {
        console.log(Val, Index, Text);
        this.form.orderFU = Text.join("-");
        // this.orderFUVal = Val;
      },
      onCancel: () => {}
    });
  },
  methods: {
    getDateStr(AddDayCount) {  //获取当前日期的后一天
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期

      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期

      var d = dd.getDate();
      return y + "-" + m + "-" + d;
    },
    // 跟进形式
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
          // if (this.addrTypeVal == 3) {
          //   this.picker4.show();
          // }
          this.picker4.show();
          break;
        case 5:
          this.picker5.show();
          break;
        case 6:
          this.picker6.show();
          break;
        case 7:
          this.picker7.show();
          break;
        case 8:
          this.picker8.show();
          break;
        case 9:
          this.picker9.show();
          break;
        case 10:
          this.picker10.show(); //还款日期
          break;
        case 11:
          this.picker11.show(); // 预约跟进
          break;
        default:
          break;
      }
    },
    // 提交确定
    confirm() {
      // console.log("提交成功", this.form);
      // 验证"跟进形式"
      if (!this.form.FUType) {
        this.showToast("请选择跟进形式", "warn", 1500, this.disabled);
        return;
      }
      // 验证"跟进对象"
      if (!this.form.FUObj) {
        this.showToast("请选择跟进对象", "warn", 1500, this.disabled);
        return;
      }
      // 验证"姓名"
      if (!this.form.name) {
        this.showToast("请选择姓名", "warn", 1500, this.disabled);
        return;
      }
      //要是“外访”
      if (this.form.FUType == "000021-0002" && this.form.FUType) {
        // 验证必填的"地址状态"
        if (!this.form.addrState) {
          this.showToast("请选地址状态", "warn", 1500, this.disabled);
          return;
        }
        // 验证必填的"地址类型"
        if (!this.form.addressType) {
          this.showToast("请选地址类型", "warn", 1500, this.disabled);
          return;
        }
        // 验证必填的"详细地址"
        if (this.form.addressType && this.addressType == 4) {
          if (!this.form.detailAddress || !this.form.addressText) {
            this.showToast("请输入详细地址", "warn", 1500, this.disabled);
            return;
          }
        }
      }
      // 验证催收反馈
      if (!this.form.collectionFB) {
        this.showToast("请选催收反馈", "warn", 1500, this.disabled);
        return;
      }
      // 验证还款日期、还款金额
      if (this.form.collectionFB && this.form.collectionFB == 1) {
        if (!this.form.repayDate) {
          this.showToast("请选还款日期", "warn", 1500, this.disabled);
          return;
        }
        if (!this.form.repayMoney) {
          this.showToast("请输入还款金额", "warn", 1500, this.disabled);
          return;
        }
      }
      // 验证跟进情况
      if (!this.form.FUSituation) {
        this.showToast("请输入跟进情况", "warn", 1500, this.disabled);
        return;
      }
      if (this.flagMoney) {
        console.log(this.flagMoney, "提交成功", this.form, "提交成功");
        this.saveFollowInfoFn();
      } else if (this.form.collectionFB == 1) {
        this.checkMoney();
        console.log(121212, "提交成功");
      }
    },
    checkMoney() {
      let reg = /^([0-9]+)(.[0-9]{1,2})?$/;
      // console.log(reg.test(this.form.repayMoney),"reg.test(this.form.repayMoney)",this.form.repayMoney)
      if (reg.test(this.form.repayMoney)) {
        if (
          Number(this.form.repayMoney) <= 0 ||
          isNaN(Number(this.form.repayMoney))
        ) {
          this.showToast("只允许输入大于零的数字", "warn", 1500, this.disabled);
          this.flagMoney = false;
        } else {
          this.flagMoney = true;
        }
      } else {
        this.showToast("最多只允许输入2位小数", "warn", 1500, this.disabled);
        this.flagMoney = false;
      }
      // if (!this.flagMoney) {
      //   this.disabled = true
      // }
    },
    // 验证弹框
    // showToast(txt, toastTime) {
    //   this.disabled = true;
    //   const toast = this.$createToast({
    //     time: toastTime || 1000,
    //     txt: txt || "请输入内容",
    //     type: "warn"
    //   });
    //   toast.show();
    //   setTimeout(() => {
    //     toast.hide();

    //     this.disabled = false;
    //   }, 1500);
    // },
    // 重置
    reset() {
      this.FUType = ""; // 跟进形式text
      this.FUObj = ""; // 跟进对象text
      this.name = ""; // 姓名val
      this.phone = ""; // 联系电话val
      this.phoneState = ""; // 电话状态text
      this.workState = ""; // 工作状态text
      this.debtorState = ""; // 债务人状态text
      this.collectionFB = ""; // 催收反馈text
      this.orderFU = ""; // 跟进时间text
      this.addrState = ""; // 地址状态text
      this.addressType = ""; // 地址类型text
      // detailAddress: "", // 详细地址text
      this.form = {
        FUType: "", //跟进形式
        FUObj: "", //跟进对象
        name: "", //姓名
        relationMobile: "",
        phoneState: "",
        workState: "",
        debtorState: "",
        collectionFB: "",
        orderFU: "",
        repayDate: "",
        repayMoney: "",
        FUSituation: "",
        orderRemind: "",
        addrState: "",
        addressType: "",
        addressText: "",
        detailAddress: null
      };
      this.FUMobile = "";
      this.addressObj = {};
    },
    saveFollowInfoFn() {
      this.disabled = true;
      let pararms = {
        crmCustInfoId: this.$route.query.crmCustInfoId,
        followNode: "3", //跟进环节:1.贷前 2.监测 3.贷后 4.ERP跟进 必填
        receivingRelation: this.form.FUObj, //跟进对象
        receivingName: this.form.name, //姓名
        receivingMobile: this.form.relationMobile, // 联系电话
        contactMobileStatus: this.form.phoneState, //电话状态
        contactJobStatus: this.form.workStateVal, //工作状态
        contactObligorStatus: this.form.debtorState, //债务人状态
        collectionFeedback: this.form.collectionFB, //催收反馈
        repaymentDate: this.form.repayDate, //还款日期
        repaymentAmount: this.form.repayMoney, //还款金额
        followContent: this.form.FUSituation, //跟进情况
        reminderTime: this.form.orderFU, //跟进时间
        reminderContent: this.form.orderRemind, //预约提醒 贷后
        followType: this.form.FUType, //跟进形式
        addressStatus: this.form.addrState, //地址状态
        addressType: this.form.addressType //地址类型
      };
      if (this.addressType == 4) {
        pararms.addressProvince = this.form.detailAddress.split(" ")[0] || "";
        pararms.addressCity = this.form.detailAddress.split(" ")[1] || "";
        pararms.addressArea = this.form.detailAddress.split(" ")[2] || "";
        pararms.detailedAddress = this.form.addressText;
      }
      if (this.addressType != 4) {
        pararms.addressProvince = this.addressObj.addressProvince;
        pararms.addressCity = this.addressObj.addressCity;
        pararms.addressArea = this.addressObj.addressArea;
        pararms.detailedAddress = this.addressObj.detailedAddress;
      }
      //  addressProvince: this.form.homeProvinceId.provinceName,
      //   addressCity: this.form.homeCityId.cityName,
      //   addressArea: this.form.homeDistrictId.districtName,
      //   detailedAddress: this.form.homeAddress
      // this.toastLoading.show()
      this.showToast("加载中...", "loading");
      api.saveFollowInfo(pararms).then(res => {
        this.disabled = false;
        console.log(res, "==============");
        // this.toastLoading.hide()
        this.toast.hide();
        if (res.data.success) {
          this.reset();
          this.showToast(res.data.msg, "correct");
        } else {
          this.showToast(res.data.msg, "error");
        }
      });
    },
    // toastSubmit(type, val) {
    //   const toast = this.$createToast({
    //     txt: val,
    //     type: type,
    //     time: 0,
    //     onTimeout: () => {
    //       console.log("Timeout");
    //     }
    //   });
    //   toast.show();
    //   setTimeout(() => {
    //     toast.hide();
    //   }, 1000);
    // },
    queryAddressInfoFn(val) {
      let pararms = {
        crmCustInfoId: this.$route.query.crmCustInfoId,
        addressType: val
      };
      api.queryAddressInfoFn(pararms).then(res => {
        if (res.data.success) {
          if (res.data.data != null) {
            this.addressObj = res.data.data;
          }
        }
      });
    },
    querylinkManForFollowFn() {
      let pararms = {
        crmApplayId: this.$route.query.crmApplyId
      };
      this.columns2 = [];
      api.querylinkManForFollow(pararms).then(res => {
        let data = res.data.data;
        for (let i in data) {
          this.columns2.push(data[i]);
        }
        this.columns2 = this.columns2;
        console.log(this.columns2);
      });
    },
    goCustFollow() {
      this.$router.push({
        path: "/followList",
        query: {
          crmCustInfoId: this.$route.query.crmCustInfoId
        }
      });
    },
    _inint() {
      this.querylinkManForFollowFn();
      this.queryPageDictionaryDetailFn("000013");
      this.queryPageDictionaryDetailFn("000014");
      this.queryPageDictionaryDetailFn("000015");
      this.queryPageDictionaryDetailFn("000025");
      // this.queryProvinceFn();
      // this.queryProvinceFn();
      // this.toastLoading = this.$createToast({
      //   time: 1500,
      //   txt: "加载中...",
      //   mask: true
      // });
      this.queryAllAddressFn();
    },
    queryPageDictionaryDetailFn(code) {
      let pararms = {
        pageNo: 1,
        pageSize: 100,
        code: code
      };
      api.queryPageDictionaryDetail(pararms).then(res => {
        if (res.data.success) {
          let data = res.data.data;
          if (code == "000013") {
            //		电话状态
            this.forFn(5, data);
          } else if (code == "000014") {
            //		工作状态
            this.forFn(7, data);
          } else if (code == "000015") {
            //		债务人状态
            this.forFn(8, data);
          } else if (code == "000025") {
            //		地址状态
            this.forFn(6, data);
          }
        }
      });
    },
    forFn(index, data) {
      let columns = "columns" + index;
      if (!data) {
        this.columns = [];
        return;
      }
      for (let i in data) {
        this["columns" + index].push(data[i]);
      }
      this["columns" + index] = this["columns" + index];
      // console.log(this["columns" + index], "columns" + index);
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
  margin-left: 12px;
  background: #e5e5e5;
}
.FU-main {
  margin-top: 50px;
  overflow: auto;
  .FU-module {
    padding: 0 12px;
    margin-top: 9px;
    font-size: 16px;
    background: #fff;
    .FU-item {
      display: flex;
      // height: 67px;
      padding: 25px 0; // line-height: 67px;
      flex-direction: row;
      justify-content: space-between;
      line-height: 16px;
      height: 16px;
      .FU-lable {
        display: inline-block; // height: 15px;
 // line-height: 15px;
        color: #4d4d4d;
        width: 90px;
      }
      .module-item {
        // line-height: 15px;
        flex: 1;
        text-align: right;
        font-size: 16px;
        color: #737373;
        .item-value {
          margin-right: 10px;
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
.addrTool {
  color: #c4c4c4;
}
.addressText {
  width: 100% !important;
  box-sizing: border-box;
}
.FU-textarea {
  width: 100%;
  font-size: 16px;
  min-height: 65px;
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
.FU-main .FU-module .textareaH {
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
// .textareaH {
//   text-align: right;
//   height: 50px;
// }
</style>
