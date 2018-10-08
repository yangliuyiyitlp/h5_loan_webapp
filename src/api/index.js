import Axios from './config-interceptors.js'
const queryString = require('query-string');
export default {
  //by WQ
  getDepartmentZtree(data, params) {
    return Axios.get("/department/getDepartmentZtree", data, {
      params: params
    });
  },
  //获取客户列表
  queryCustInfoData(data, params) {
    return Axios.post("/api/customer/queryCustInfo", queryString.stringify(data), {
      params: params
    });
  },
  saveFollowInfo(data, params) { //保存客户跟进
    return Axios.post("/api/followUp/saveFollowInfo", queryString.stringify(data), {
      params: params
    });
  },
  //全部订单:查询全部订单列表
  queryApplyOrderInfo(data, params) {
    return Axios.post("/api/allOrder/queryApplyInfo", queryString.stringify(data), {
      params: params
    });
  },
  queryBaseOrderInfo(data, params) { //查询订单基本信息
    return Axios.post("/api/orderDetail/queryBaseOrderInfo", queryString.stringify(data), {
      params: params
    });
  },
  queryPaymentHistory(data, params) { //查询还款记录
    return Axios.post("/api/orderDetail/queryPaymentHistory", queryString.stringify(data), {
      params: params
    });
  },
  queryRepaymentPlan(data, params) { //查询还款计划
    return Axios.post("/api/orderDetail/queryRepaymentPlan", queryString.stringify(data), {
      params: params
    });
  },
  queryQueryOrderAmountt(data, params) { //订单还款中当前应该还金额
    return Axios.post("/api/orderDetail/QueryOrderAmount", queryString.stringify(data), {
      params: params
    });
  },
  queryExamDataList(data, params) { //审核记录
    return Axios.post("/api/orderDetail/QueryTrackRecodList", queryString.stringify(data), {
      params: params
    });
  },
  queryRefusalReason(data, params) { //查看拒单原因
    return Axios.post("/api/allOrder/queryRefusalReason", queryString.stringify(data), {
      params: params
    });
  },
  queryPageDictionaryDetail(data, params) { //数据字典小类列表分页
    return Axios.post("/api/dictionaryDetail/queryPageDictionaryDetail", queryString.stringify(data), {
      params: params
    });
  },
  // 贷后 全部逾期订单列表
  queryOverdueOrders(data, params) {
    return Axios.post("/api/allOrder/queryOverdueOrders", queryString.stringify(data), {
      params: params
    });
  },
  //贷后 放款监测 预催收查询还款订单列表
  queryMiniList(data, params) {
    return Axios.post("/api/allOrder/queryRepaymentOrders", queryString.stringify(data), {
      params: params
    });
  },
  queryEssentialInfo(data, params) { //查询用户基本信息
    return Axios.post("/api/custInfoDetail/queryEssentialInfo", queryString.stringify(data), {
      params: params
    });
  },
  getCustDetailBase(data, params) { //查询后台客户详细信息注册基本信息
    return Axios.post("/api/custInfoDetail/getCustDetailBase", queryString.stringify(data), {
      params: params
    });
  },
  queryLinkManInfo(data, params) { //查询联系人信息
    return Axios.post("/api/custInfoDetail/queryLinkManInfo", queryString.stringify(data), {
      params: params
    });
  },
  queryAccountInfo(data, params) { //查询账号信息
    return Axios.post("/api/custInfoDetail/queryAccountInfo", queryString.stringify(data), {
      params: params
    });
  },
  queryAccountBalance(data, params) { //查询电子账户余额
    return Axios.post("/api/orderDetail/queryAccountBalance", queryString.stringify(data), {
      params: params
    });
  },
  queryFollowInfo(data, params) { //查询跟进内容
    return Axios.post("/api/followUp/queryFollowInfo", queryString.stringify(data), {
      params: params
    });
  },
  queryFollowList(data, params) { //查询客户跟进列表
    return Axios.post("/api/followUp/queryFollowList", queryString.stringify(data), {
      params: params
    });
  },
  querylinkManForFollow(data, params) { //新增贷后跟进时查询联系人
    return Axios.post("/api/followUp/querylinkManForFollow", queryString.stringify(data), {
      params: params
    });
  },
  getCollectors(data, params) { //催收机构
    return Axios.post("/api/loanafter/getCollectors", queryString.stringify(data), {
      params: params
    });
  },
  getDepartmentZtree(data, params) { //组织架构
    return Axios.get("/department/getDepartmentZtree", data, {
      params: params
    });
  },
  //查询省份
  queryProvince(data, params) {
    return Axios.post("/api/address/queryProvince", queryString.stringify(data), {
      params: params
    });
  },
  //查询城市
  queryCityByProvinceId(data, params) {
    return Axios.post("/api/address/queryCityByProvinceId", queryString.stringify(data), {
      params: params
    });
  },
  //查询区
  queryCityByCityId(data, params) {
    return Axios.post("/api/address/queryDistrictByCityId", queryString.stringify(data), {
      params: params
    });
  },
  queryAddressInfoFn(data, params) { //
    return Axios.post("/api/followUp/queryAddressInfo", queryString.stringify(data), {
      params: params
    });
  },
  queryOrderCount(data, params) { //查询订单数
    return Axios.post("/api/allOrder/queryOrderCount", queryString.stringify(data), {
      params: params
    });
  },
  queryOverdueOrderCount(data, params) { //查询总控订单数
    return Axios.post("/api/allOrder/queryOverdueOrderCount", queryString.stringify(data), {
      params: params
    });
  },
  // 获取所有的省市区
  queryAllAddress(data, params) { //
    return Axios.post("/api/address/queryAllAddress", queryString.stringify(data), {
      params: params
    });
  },
  // 获取客户统计数量
  queryCustCount(data, params) { //
    return Axios.post("/api/customer/queryCustCount", queryString.stringify(data), {
      params: params
    });
  },
  // 获取贷后统计数量
  queryOverdueOrderCount(data, params) { //
    return Axios.post("/api/allOrder/queryOverdueOrderCount", queryString.stringify(data), {
      params: params
    });
  },
  // 热门城市搜索
  queryHotCity(data, params) { //
    return Axios.post("/api/allOrder/queryHotCity", queryString.stringify(data), {
      params: params
    });
  },
  //菜单menu
  queryMenulist(data, params) {
    return Axios.get("/auth/menu/list",data, { params: params });
  },
  
}
