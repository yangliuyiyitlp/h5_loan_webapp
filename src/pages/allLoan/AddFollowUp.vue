<template>
  <div class="page followUp">
    <div class="FU-top com-fix">
      <CommonFU :backTitle='backTitle'></CommonFU>
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
            <span :class="['item-value',addressType == ''? 'default':'choose']">{{addressType == '' ? '请选择' : addressType}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="bottom-line" v-show = "form.addressType != 4 && form.addressType != '' && form.FUType == '000021-0002'"></div>
        <div class="FU-item" v-show = "form.addressType != 4 && form.addressType != '' && form.FUType == '000021-0002'">
          <div class='FU-lable'>详细地址</div>
          <div class="module-item com-left">
            <span>{{addressObj.addressProvince}}</span>
              <span>{{addressObj.addressCity}}</span>
              <span>{{addressObj.addressArea}}</span>
              <span>{{addressObj.detailedAddress}}</span>
          </div>
        </div>
        <div class="bottom-line" v-show = "form.FUType == '000021-0002'?true:false"></div>
        <div class="FU-item" @click='isShowPop(4)' v-show = "form.addressType == 4 && form.FUType == '000021-0002'">
          <div class='FU-lable required'>详细地址</div>
          <div class="addrTool" v-show=" form.detailAddrVal == ''?true:false">-省- -市- -区-</div>
          <div class="module-item">
            <span :class="['item-value',form.detailAddress == '' ?'default':'choose']">{{form.detailAddress == '' ? '请选择' : form.detailAddress}}</span>
            <i class="com-icon-link fr"></i>
          </div>
        </div>
        <div class="bottom-line" v-show = "form.addressType == 4 && form.FUType == '000021-0002'"></div>
        <div class="FU-item" v-show = "form.addressType == 4 && form.FUType == '000021-0002'">
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
            <input type="text" placeholder="请输入" :class="['FU-input',form.repayMoney == ''?'default':'choose']" v-model="form.repayMoney">
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
          <div class="FU-lable">跟进时间</div>
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
        <span class="confirm-btn" @click="confirm">确定</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import CommonFU from "@/components/CommonFU";
import api from "@/api/index";
const asyncSelectedIndex = [0, 0, 0]
export default {
  name: "AddFollowUp",
  data() {
    return {
      backTitle: "新增跟进",
      indicator: true,
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
      columns3: [ // 地址类型
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
      columns5: [],// 电话状态 数据字典维护
      columns6: [], // 地址状态 数据字典维护
      columns7: [], // 工作状态 数据字典维护
      columns8: [], // 债务人状态 数据字典维护
      columns9: [ // 催收反馈        
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
      // FUTypeVal: null, // 跟进形式val
      FUObj: "", // 跟进对象text
      // FUObjVal: null, // 跟进对象val
      name: "", // 姓名val
      phone: "", // 联系电话val
      phoneState: "", // 电话状态text
      // phoneStateVal: null, // 电话状态val
      workState: "", // 工作状态text
      // workStateVal: null, // 工作状态val
      debtorState: "", // 债务人状态text
      // debtorStateVal: null, // 债务人状态val
      collectionFB: "", // 催收反馈text
      // collectionFBVal: null, // 催收反馈val
      orderFU: "", // 跟进时间text
      // orderFUVal: null, // 预约时间val
      addrState: "", // 地址状态text
      // addrStateVal: null, // 地址状态val
      addressType: "", // 地址类型text
      // addrTypeVal: null, // 地址类型val
      // detailAddress: "请选择", // 详细地址text
      // detailAddrVal: null, // 详细地址val
      // addressText: "", // 地址路/乡/镇

      // repayDate: "请选择", // 还款日期text
      // repayDateVal: null, // 还款日期val
      // repayMoney: "", // 还款金额
      // FUSituation: "", // 跟进情况

      // orderRemind: "", // 预约提醒
      form: {
        FUType: "",
        FUObj: "",
        name: "",
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
        addrState: '',
        addressType: '',
        addressText: ''
      },
      FUMobile: "",
      provinceIndex: '',
      cityIndex:'',
      addressObj: {}
    };
  },
  created() {
    this.querylinkManForFollowFn();
    this._inint();
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
        }
        console.log(this.form.FUType, Index, Text, 12);
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
        console.log(Val, Index, Text);
        this.FUObj = Text[0];
        this.form.FUObj = Val[0];
        if (this.columns2) {
          this.form.name = this.columns2[Index].name;
          this.form.relationMobile = this.columns2[Index].mobile;
          this.FUMobile = this.columns2[Index].phone;
        } else {
          this.form.name = "";
          this.form.relationMobile = "";
        }
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
        this.addressType =Text[0] ? Text[0] : ""
        this.form.addressType = Val[0] ? Val[0] : ""
        // 清除之前地址信息
        this.detailAddress = "请选择"; // 详细地址text
        this.detailAddrVal = null; // 详细地址val
        this.addressText = ""; // 地址路/乡/镇     
        this.queryAddressInfoFn(this.form.addressType)   
      },
      onCancel: () => {},
    }); 
    // this.picker3 = this.$createCascadePicker({
    //   title: "地址类型",
    //   data: this.columns3,
    //   selectedIndex: asyncSelectedIndex.slice(),
    //   // alias: {
    //   //   value: "id",
    //   //   text: "provinceName"
    //   // },
    //   onSelect: (Val, Index, Text) => {
    //     console.log(Val, Index, Text);
    //     this.addressType = Text[0];
    //     this.addrTypeVal = Val[0];
    //     // 清除之前地址信息
    //     this.detailAddress = "请选择"; // 详细地址text
    //     this.detailAddrVal = null; // 详细地址val
    //     this.addressText = ""; // 地址路/乡/镇
    //     // 是否回显地址
    //     if (this.addrTypeVal == 3) {
    //     } else {
    //       // 获取地址回显
    //     }
    //   },
    //   onCancel: () => {},
    //   onChange: this.asyncChangeHandle
    // }); // 详细地址下拉
    this.picker4 = this.$createCascadePicker({
      title: "详细地址",
      data: this.columns4,
      selectedIndex: asyncSelectedIndex.slice(),
      // alias: {
      //   value: "id",
      //   text: "provinceName"
      // },
      onSelect: (Val, Index, Text) => {
        this.detailAddress = Text[0];
        this.detailAddrVal = Val[0];
      },
      onCancel: () => {},
      onChange: this.asyncChangeHandle
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
        console.log(Val, Index, Text)
        this.addrState = Text[0] ? Text[0] : "";
        this.form.addrState = Val[0] ? Val[0] : "";
        console.log(this.form.addrState, 'this.form.addrState', Text);
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
      min: new Date(2000, 0, 0),
      max: new Date(2020, 9, 20),
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
      min: new Date(2000, 0, 0),
      max: new Date(2020, 9, 20),
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
          this.picker10.show();
          break;
        case 11:
          this.picker11.show();
          break;
        default:
          break;
      }
    },
    // 提交确定
    confirm() {
      console.log("提交成功", this.form);
    },
    // 重置
    reset() {
      this.FUObj = "请选择";
      this.FUObjVal = null;
      this.name = "";
      this.phone = "";
      this.addressType = "请选择";
      this.addrTypeVal = null;
      this.detailAddress = "请选择";
      this.detailAddrVal = null;
      this.addressText = "";
      this.phoneState = "请选择";
      this.phoneStateVal = null;
      this.addrState = "请选择";
      this.addrStateVal = null;
      this.workState = "请选择";
      this.workStateVal = null;
      this.debtorState = "请选择";
      this.debtorStateVal = null;
      this.collectionFB = "请选择";
      this.collectionFBVal = null;
      this.repayDate = "请选择";
      this.repayDateVal = null;
      this.repayMoney = "";
      this.FUSituation = "";
      this.orderFU = "请选择";
      this.orderFUVal = null;
      this.orderRemind = "";
    },
    queryAddressInfoFn(val) {
    	api.queryAddressInfoFn({
    		crmCustInfoId: this.$route.query.crmCustInfoId,
    		addressType: val
    	}).then((res) => {
    		if (res.data.success) {
          if (res.data.data != null) {
          	this.addressObj = res.data.data;  
          }
        }
    	})
    },
    querylinkManForFollowFn() {
      let pararms = {
        crmApplayId: "09950eda68b64e088c4f2bc30467a3b1"
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
    _inint() {
      this.queryPageDictionaryDetailFn("000013");
      this.queryPageDictionaryDetailFn("000014");
      this.queryPageDictionaryDetailFn("000015");
      this.queryPageDictionaryDetailFn("000025");
      this.queryProvinceFn();
      this.queryProvinceFn();
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
    queryProvinceFn() {//省份
      api.queryProvince().then(res => {
        if (res.data.success) {
          let data = res.data.data;
          for (let i in data) {
            let obj = {}
            obj.value = data[i].id
            obj.text = data[i].provinceName
            this.columns4.push(obj)
          }
          console.log(this.columns4, "this.columns3----------");
        }
      });
    },
    queryCityByProvinceIdFn(id) {
      let pararms = {
        provinceId: id
      }
      api.queryCityByProvinceId(pararms).then(res => {
        if (res.data.success) {
          let data = res.data.data;
          this.columns4[this.provinceIndex].children = []
          for (let i in data) {
            let obj = {}
            obj.value = data[i].id
            obj.text = data[i].cityName
            this.columns4[this.provinceIndex].children.push(obj);
          }
          console.log(this.columns4, "this.columns4----------");
        }
      });
    },
    asyncChangeHandle(i, newIndex) {
      console.log(i, newIndex,'===')
      if (newIndex !== asyncSelectedIndex[i]) {
        asyncSelectedIndex[i] = newIndex
        this.provinceIndex = newIndex
        this.queryCityByProvinceIdFn(this.columns4[newIndex].value)
        // console.log()
        // If the first two column is changed, request the data for rest columns.
        if (i < 2) {
          // Mock async load.
          setTimeout(() => {
            if (i === 0) {
              // const current = this.columns3[newIndex]
              // current.children = current.children || cityList[current.value]
              // current.children[0].children = current.children[0].children || areaList[current.children[0].value]
              asyncSelectedIndex[1] = 0
              asyncSelectedIndex[2] = 0
            }

            if (i === 1) {
              // const current = asyncData[asyncSelectedIndex[0]].children[newIndex]
              // current.children = current.children || areaList[current.value]
              asyncSelectedIndex[2] = 0
            }
            this.picker4.setData(this.columns4, asyncSelectedIndex)
          }, 500)
        }
      }
    },
  },
  components: {
    CommonFU
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
  }
}
.addrTool {
  color: #c4c4c4;
}
.addressText {
  width: 100% !important;
}
.FU-textarea {
  width: 230px;
  font-size: 16px;
  min-height: 65px;
  padding-right: 9px;
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
