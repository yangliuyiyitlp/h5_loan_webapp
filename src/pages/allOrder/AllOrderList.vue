<template>
    <div class="cust-wrap"> 
      <div class="cust-search">
        <CommonSearch @search = 'searchFn' :backTitle = "backTitle"></CommonSearch>
        <order-search @searchOrder='searchOrder'></order-search>
        <Order-tableList :tableList="tableList" @onPullingUp='onPullingUp' @onPullingDown='onPullingDown' ref ='orderTab'></Order-tableList>
      </div> 
      
    </div>
</template>

<script>
import CommonSearch from "@/components/CommonSearch";
import OrderSearch from "@/pages/allOrder/OrderSearch";
import OrderTableList from "@/pages/allOrder/OrderTableList";
import api from "@/api/index";
export default {
  name: "allCustomerList",
  data() {
    return {
      backTitle: "全部订单",
      tableList: [],
      toast: null,
      pageSize: 10,
      pageNo: 1,
      search: {
        orderStatus: "",
        nodeCode: "",
        hangStatus: false,
        applyTimeBegin: "",
        applyTimeEnd: ""
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
    this.queryApplyOrderInfoFn();
  },
  methods: {
    searchFn(val) {
      //文本框搜索
      console.log(val, 90909);
       this.pageNo = 1
      this.searchPararms.queryParam = val;
      this.tableList = [];
      this.queryApplyOrderInfoFn();
       this.$refs.orderTab.toTop()
    },
    searchOrder(val) {
      //高级搜索条件
       this.pageNo = 1
      this.search = Object.assign(this.search, val);
      this.tableList = [];
      this.queryApplyOrderInfoFn();
       this.$refs.orderTab.toTop()
    },
    queryApplyOrderInfoFn() {
      const pararms = {
        // 加上搜索条件
        // oneSelf: this.$store.state.selectOrder,
        oneSelf:this.$route.query.oneSelf,
        // oneSelf:window.localStorage.getItem('orderOneSelf'),
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        queryParam: this.searchPararms.queryParam,
        orderStatus: this.search.orderStatus,
        nodeCode: this.search.nodeCode,
        hangStatus: this.search.hangStatus,
        applyTimeBegin: this.search.applyTimeBegin,
        applyTimeEnd: this.search.applyTimeEnd
      };
      this.toast.show();
      api.queryApplyOrderInfo(pararms).then(res => {
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
      this.queryApplyOrderInfoFn();
    },
    onPullingDown(pageNo) {
      this.pageNo = pageNo;
      this.tableList = [];
      this.queryApplyOrderInfoFn();
    }
  },
  watch: {},
  components: {
    CommonSearch,
    OrderSearch,
    OrderTableList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
</style>
