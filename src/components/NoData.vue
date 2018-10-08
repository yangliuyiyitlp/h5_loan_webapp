<template>
   <div class="no-data-wrap">
       {{titleName}}
   </div>
</template>

<script>
export default {
  name: "NoData",
  props: {
    titleName: {
      type: String,
      default: "暂无数据"
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.no-data-wrap {
  position: absolute;
  /* width: 100%; */
  /* height: 100%; */
  /* text-align: center; */
  font-size: 16px;      
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>
