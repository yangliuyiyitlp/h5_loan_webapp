<template>
    <div class="cust-wrap"> 
      <div class="cust-search">
        <CommonSearch @search = 'searchFn' :backTitle = "backTitle" ></CommonSearch>
        <AllLoanSearch @searchAllLoan='searchAllLoan' :allLoanTab='allLoanTab'></AllLoanSearch>
        <AllLoanTabList :tableList="tableList" :tablePermisson='tablePermisson' @onPullingUp='onPullingUp' @onPullingDown='onPullingDown' ref='loanTab'></AllLoanTabList>
      </div> 
      
    </div>
</template>

<script>
import CommonSearch from "@/components/CommonSearch";
import AllLoanSearch from "@/pages/allLoan/AllLoanSearch";
import AllLoanTabList from "@/pages/allLoan/AllLoanTabList";
import api from "@/api/index";
export default {
  name: "CollectionList",
  data() {
    return {
      backTitle: "预催收订单",
      tablePermisson: {
        collection: false, //放款监测
        minitor: true //预催收
      },
      allLoanTab: {
        overDueTab: false, //m1 逾期
        title:'距还款日',
        tip:'输入的放款天数起点的天数不能大于终点的天数'
      },
      tableList: [],
      toast: null,
      pageSize: 10,
      pageNo: 1,
      search: {
       dayBegin: "",
        dayEnd: "",
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
    this.queryMiniList();
  },
  methods: {
    searchFn(val) {
      //文本框搜索
       this.pageNo = 1
      this.searchPararms.queryParam = val;
      this.tableList = [];
      this.queryMiniList();
        this.$refs.loanTab.toTop()
    },
    searchAllLoan(val) {
      //高级搜索条件
       this.pageNo = 1
      this.search = Object.assign(this.search, val);
      this.tableList = [];
      this.queryMiniList();
       this.$refs.loanTab.toTop()
    },
    queryMiniList() {
      const pararms = {
        // 加上搜索条件
         oneSelf:this.$route.query.oneSelf,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        queryParam: this.searchPararms.queryParam,
        repaymentDayBegin: this.search.dayBegin, //距还款日开始
        repaymentDayEnd: this.search.dayEnd, //距还款日结束
        repaymentDayBegin: 0,
        repaymentDayEnd: 3
        // currentModuleId: this.$route.query.menuId
      };
      this.toast.show();
      api.queryMiniList(pararms).then(res => {
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
      this.queryMiniList();
    },
    onPullingDown(pageNo) {
      this.pageNo = pageNo;
      this.tableList = [];
      this.queryMiniList();
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
