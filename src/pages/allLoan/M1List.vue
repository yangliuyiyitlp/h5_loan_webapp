<template>
    <div class="cust-wrap"> 
      <div class="cust-search">
        <CommonSearch @search = 'searchFn' :backTitle = "backTitle"></CommonSearch>
        <allLoan-tabList :tableList="tableList" @onPullingUp='onPullingUp' @onPullingDown='onPullingDown' ref='loanTab'></allLoan-tabList>
      </div> 
      
    </div>
</template>

<script>
import CommonSearch from "@/components/CommonSearch";
import AllLoanTabList from "@/pages/allLoan/AllLoanTabList";
import api from "@/api/index";
export default {
  name: "M1List",
  data() {
    return {
      backTitle: "M1订单",
      //  allLoanTab: {
      //    tip:'逾期天数起点天数不能大于终点天数'
      // },
      tableList: [],
      // toast: null,
      pageSize: 10,
      pageNo: 1,
      // search: {
      //  dayBegin: "",
      //   dayEnd: "",
      // },
      searchPararms: {
        queryParam: ""
      }
    };
  },
  // created() {
  //   this.toast = this.$createToast({
  //     time: 1000,
  //     txt: "加载中...",
  //     mask: true
  //   });
  // },
  mounted() {
    this.queryOverdueOrders();
  },
  methods: {
    searchFn(val) {
      //文本框搜索
       this.pageNo = 1
      this.searchPararms.queryParam = val;
      this.tableList = [];
      this.queryOverdueOrders();
       this.$refs.loanTab.toTop()
    },
    // searchAllLoan(val) {
    //   //高级搜索条件
    //    this.pageNo = 1
    //   this.search = Object.assign(this.search, val);
    //   this.tableList = [];
    //   this.queryOverdueOrders();
    //    this.$refs.loanTab.toTop()
    // },
    queryOverdueOrders() {
      const pararms = {
        // 加上搜索条件
         oneSelf:this.$route.query.oneSelf,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        queryParam: this.searchPararms.queryParam,
        // overdueDayBegin: this.search.dayBegin, //逾期天数开始
        // overdueDayEnd: this.search.dayEnd, //逾期天数结束
        overdueStatusBegin: "1", //逾期状态开始
        overdueStatusEnd: "1", //逾期状态结束
        currentModuleId: this.$route.query.menuId
      };
      // this.toast.show();
      this.showToast("加载中",'loading');
      api.queryOverdueOrders(pararms).then(res => {
        this.toast.hide();
        if (res.data.success) {
          this.tableList = this.tableList.concat(res.data.data);
        } else {
          this.tableList = [];
        }
      }).catch(err=>{
            this.showToast('请求失败','warn');
          this.toast.hide();
      });
    },
    onPullingUp(pageNo) {
      this.pageNo = pageNo;
      this.queryOverdueOrders();
    },
    onPullingDown(pageNo) {
      this.pageNo = pageNo;
      this.tableList = [];
      this.queryOverdueOrders();
    }
  },
  watch: {},
  components: {
    CommonSearch,
    AllLoanTabList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
</style>
