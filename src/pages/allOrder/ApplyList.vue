<template>
    <div class="cust-wrap"> 
      <div class="cust-search">
      <CommonSearch @search = 'searchFn' :backTitle = "backTitle"></CommonSearch>
         <Order-tableList :tableList="tableList" @onPullingUp='onPullingUp' @onPullingDown='onPullingDown' ref='orderTab'></Order-tableList>
      </div> 
      
    </div>
</template>

<script>
import CommonSearch from "@/components/CommonSearch";
import OrderTableList from "@/pages/allOrder/OrderTableList";
import api from "@/api/index";

export default {
  name: "ApplyList",
  data() {
    return {
      backTitle: "申请中订单",
      tableList: [],
      // toast: null,
      pageSize: 10,
      pageNo: 1,
      searchPararms:{
       queryParam:''
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
    this.queryApplyOrderInfoFn();
  },
  methods: {
      searchFn(val) {  //文本框搜索
      console.log(val, 90909);
       this.pageNo = 1
     this.searchPararms.queryParam = val
       this.tableList =[]
    this.queryApplyOrderInfoFn()
     this.$refs.orderTab.toTop()
    },
    queryApplyOrderInfoFn() {
      const pararms = {
       oneSelf:this.$route.query.oneSelf,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        orderStatus: 1,
        queryParam:this.searchPararms.queryParam,
         currentModuleId: this.$route.query.menuId
      };
      // this.toast.show();
      this.showToast('加载中...','loading');
      api.queryApplyOrderInfo(pararms).then(res => {
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
      this.queryApplyOrderInfoFn();
    },
    onPullingDown(pageNo) {
      this.pageNo = pageNo;
      this.queryApplyOrderInfoFn();
    }
  },
  watch: {},
  components: {
    CommonSearch,
    OrderTableList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>


</style>
