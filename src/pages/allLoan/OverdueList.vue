<template>
    <div class="cust-wrap"> 
      <div class="cust-search">
        <CommonSearch @search = 'searchFn' :backTitle = "backTitle" ></CommonSearch>
        <AllLoanSearch @searchAllLoan='searchAllLoan'></AllLoanSearch>
        <AllLoanTabList :tableList="tableList" @onPullingUp='onPullingUp' @onPullingDown='onPullingDown' ref='loanTab'></AllLoanTabList>
      </div> 
      
    </div>
</template>

<script>
import CommonSearch from "@/components/CommonSearch";
import AllLoanSearch from "@/pages/allLoan/AllLoanSearch";
import AllLoanTabList from "@/pages/allLoan/AllLoanTabList";
import api from "@/api/index";
export default {
  name: "OverdueList",
  data() {
    return {
      backTitle: "全部逾期状态",
      tableList: [],
      toast: null,
      pageSize: 10,
      pageNo: 1,
      search: {
        dayBegin: "",
        dayEnd: "",
        overdueStatusBegin: "",
        overdueStatusEnd: ""
      },
      searchPararms: {
        queryParam: ""
      }
    };
  },
  created() {
    this.toast = this.$createToast({
      time: 1000,
      txt: "加载中...",
      mask: true
    });
  },
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
    searchAllLoan(val) {
      //高级搜索条件
       this.pageNo = 1
      this.search = Object.assign(this.search, val);
      this.tableList = [];
      this.queryOverdueOrders();
       this.$refs.loanTab.toTop()
    },
    queryOverdueOrders() {
      const pararms = {
        // 加上搜索条件
          oneSelf:this.$route.query.oneSelf,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        queryParam: this.searchPararms.queryParam,
        overdueDayBegin: this.search.dayBegin, //逾期天数开始
        overdueDayEnd: this.search.dayEnd, //逾期天数结束
        overdueStatusBegin: this.search.overdueStatusBegin, //逾期状态开始
        overdueStatusEnd: this.search.overdueStatusEnd //逾期状态结束
        // currentModuleId: this.$route.query.menuId
      };
      this.toast.show();
      api.queryOverdueOrders(pararms).then(res => {
        this.toast.hide();
        if (res.data.success) {
          this.tableList = this.tableList.concat(res.data.data);
        } else {
          this.tableList = [];
        }
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
    AllLoanSearch,
    AllLoanTabList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
</style>
