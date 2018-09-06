<template>
	<div class="common-pagition-wrap">
		<el-pagination 
			@size-change="handleSizeChange" 
			@current-change="handleCurrentChange" 
			@prev-click = 'prevClick'
			@next-click = 'nextClick'
			:pager-count = 'pagerCount'
			:small = 'small'
			:disabled = 'disabled'
			:prev-text = 'prevText'
			:nextText = 'nextText'
			:background = 'background'
			:current-page="currentPage" 
			:page-sizes="pageSizes" 
			:page-size="pageSize" 
			:layout="layout" 
			:total="total">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		props: {
			pagerCount: {
				// 大于等于 5 且小于等于 21 的奇数
				type: Number,
				default: 7
			},
			prevText: {
				type: String,
				default: ''
			},
			nextText: {
				type: String,
				default: ''
			},
			pageSize: {
				type: Number,
				default: 10
			},
			pageSizes: {
				type: Array,
				default: function() {
					return [10, 20, 30]
				}
			},
			currentPage: {
				type: Number,
				default: 1
			},
			total: {
				type: Number,
				default: 0
			},
			layout: {
				type: String,
				default: 'total, sizes, prev, pager, next, jumper'
			},
			small: {
				type: Boolean,
				default: false
			},
			background: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false	
			}
		},
		data() {
			return {}
		},
		created() {
		},
		methods: {
			handleSizeChange(val) { //每页要显示的条数
				this.$emit("handleSizeChange", val)
			},
			handleCurrentChange(val) { // 点击页面时
				this.$emit("handleCurrentChange", val)
			},
			prevClick(val) {
				this.$emit("prevClick", val)
			},
			nextClick(val) {
				this.$emit("nextClick", val)
			}
		},
	}
</script>

<style scoped lang="less">

</style>