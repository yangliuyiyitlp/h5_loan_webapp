<template>
  <div class="back-wrap">
    <ul class="clearfix">
      <li>
        <i class="icon-back" @click="goBack"></i>
      </li>
      <li class="com-cen isTitle">{{backTitle}}</li>
      <li class="com-right">
        <span class="FU-recode">跟进记录</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'back',
    props: {
      backTitle: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        msg: 'Welcome to sasas Page'
      }
    },
    methods: {
      goBack() {
        this.$router.back(-1)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .back-wrap {
    font-size: 14px;
    ul {
      li {
        float: left;
        width: 33.33%;
        font-size: 18px;
        color: #fff;
        .icon-back {
          margin-left: 12px;
          display: inline-block;
          width: 10px;
          height: 17px;
          background: url("../assets/images/icon_back@3x.png") no-repeat;
          background-size: 10px 17px;
        }
      }
      .isTitle {
        font-weight: 500;
      }
      .com-right {
        font-size: 16px;
        color: #fff;
        .FU-recode {
          margin-right: 10px;
        }
      }
    }
  }

</style>
