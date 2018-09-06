// import HelloWorld from '@/pages/HelloWorld'
const Test = () =>
  import('@/pages/Test')
const Common404 = () =>
  import('@/components/Common404')
const Common500 = () =>
  import('@/components/Common500')
const Layout = () =>
  import('@/pages/Layout')
  //客户
const AllCustomer = () =>
  import('@/pages/allCustomer/AllCustomer')
const AllCustomerList = () =>
  import('@/pages/allCustomer/AllCustomerList')
const CustomerDetail = () =>
  import('@/pages/allCustomer/CustomerDetail')
const CustFollow = () =>
  import('@/pages/allCustomer/CustFollow')
const CommonBaseInformain = () =>
  import('@/components/CommonBaseInformain')
const CommonRelation = () =>
  import('@/components/CommonRelation')
const CommonAccountInformain = () =>
  import('@/components/CommonAccountInformain')
const CommonFollowList = () =>
  import('@/components/CommonFollowList')
  // 订单
const AllOrder = () =>
  import('@/pages/allOrder/AllOrder')
const AllOrderList = () =>
  import('@/pages/allOrder/AllOrderList')
const ApplyList = () =>
  import('@/pages/allOrder/ApplyList')
const ExamList = () =>
  import('@/pages/allOrder/ExamList')
const PayOffList = () =>
  import('@/pages/allOrder/PayOffList')
const RejectList = () =>
  import('@/pages/allOrder/RejectList')
const RepaymentList = () =>
  import('@/pages/allOrder/RepaymentList')
const OrderDetails = () =>
  import('@/pages/allOrder/OrderDetails')
const RepaymentListInfo = () =>
  import('@/pages/allOrder/orderInfoList/RepaymentListInfo')
const RepaymentplayInfo = () =>
  import('@/pages/allOrder/orderInfoList/RepaymentplayInfo')
const ExamListInfo = () =>
  import('@/pages/allOrder/orderInfoList/ExamListInfo')
  //贷后
const AllLoan = () =>
  import('@/pages/allLoan/Loan')
const AddFollowUp = () =>
  import('@/pages/allLoan/AddFollowUp')
  const OverdueList = () =>
  import('@/pages/allLoan/OverdueList')
  const M1List = () =>
  import('@/pages/allLoan/M1List')
  const MinitorList = () =>
  import('@/pages/allLoan/MinitorList')
  const CollectionList = () =>
  import('@/pages/allLoan/CollectionList')
export default [{
  path: '/',
  redirect: 'index/customerManage',
},
{
  path: '/index',
  alies: '',
  component: Layout,
  redirect: 'index/customerManage',
  children: [{
    path: '',
    redirect: 'customerManage',
  },
  {
    path: 'customerManage',
    name: '客户',
    component: AllCustomer
  },
  {
    path: 'orderManage',
    name: '订单',
    component: AllOrder
  },
  {
    path: 'loan',
    name: '贷后',
    component: AllLoan
  }
  ]
},
{
  path: '/allCustomerList',
  name: '全部客户',
  component: AllCustomerList
},
{
  path: '/customerDet',
  name: '客户详情',
  component: CustomerDetail
},
{
  path: '/baseInformain',
  name: '基本信息',
  component: CommonBaseInformain
},
{
  path: '/relationInformain',
  name: '联系人信息',
  component: CommonRelation
},
{
  path: '/accountInformain',
  name: '账户信息',
  component: CommonAccountInformain
},
{
  path: '/followList',
  name: '跟进记录',
  component: CommonFollowList
  
},
{
  path: '/AllOrderList',
  name: '全部订单',
  component: AllOrderList
},
{
  path: '/ApplyList',
  name: '申请中订单',
  component: ApplyList
},
{
  path: '/ExamList',
  name: '审批中订单',
  component: ExamList
},
{
  path: '/PayOffList',
  name: '已结清订单',
  component: PayOffList
},
{
  path: '/RejectList',
  name: '拒绝订单',
  component: RejectList
},
{
  path: '/RepaymentList',
  name: '还款中订单',
  component: RepaymentList
},
{
  path: '/OrderDetails',
  name: '订单详情',
  component: OrderDetails
},
{
  path: '/OverdueList',
  name: '全部逾期订单',
  component: OverdueList
},
{
  path: '/M1List',
  name: 'M1订单',
  component: M1List
},
{
  path: '/MinitorList',
  name: '放款监测订单',
  component: MinitorList
},
{
  path: '/CollectionList',
  name: '预催收订单',
  component: CollectionList
},
{
  path: '/test',
  name: 'ceshi',
  component: Test
},
{
  path: '/RepaymentListInfo',
  name: '还款记录',
  component: RepaymentListInfo
},
{
  path: '/RepaymentplayInfo',
  name: '还款计划',
  component: RepaymentplayInfo
},
{
  path: '/ExamListInfo',
  name: '审核记录表',
  component: ExamListInfo
},
{
  path: '/addFollowUp',
  name: '新增跟进',
  component: AddFollowUp
},
{
  path: '/addCustFollowUp',
  name: '新增客户跟进',
  component: CustFollow
},
{
  path: '/404',
  name: '走丢了',
  component: Common404
},
{
  path: '/500',
  name: '服务异常',
  component: Common500
},
{
  path: '*',
  name: '丢失了',
  redirect: 'index/customerManage',
}
]
