<template>
  <div class="reset-btn-wrap clearfix">
    <div class="fl" @click='resetFn'>重置</div>
    <div class="fl" @click='submitFn'>确定</div>
  </div>
</template>

<script>
export default {
  name: "resetBtn",
  data() {
    return {
      msg: ""
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    resetFn() {
      this.$emit("resetFn");
    },
    submitFn() {
      this.$emit("submitFn");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.reset-btn-wrap {
  font-size: 17px;
  color: #595959;
  height: 48px;
  line-height: 48px;
  .fl {
    background-color: #fff;
    width: 50%;
    &:nth-child(2) {
      background-color: #0e7fff;
      color: #fff;
    }
  }
}
</style>
