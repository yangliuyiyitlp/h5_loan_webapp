<template>
  <div class="back-wrap">
   <ul class="clearfix">
     <li>
      <i class="icon-back" @click="goBack"></i>
     </li>
     <li class="com-cen">{{backTitle}}</li>
     <li></li>
   </ul>
  </div>
</template>

<script>
export default {
  name: 'topBack',
  props: {
    backTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
<style scoped  lang="less">
  .back-wrap {
    font-size: 18px;
    height:62px;
   line-height: 62px;
    padding:0 12px;
    box-sizing: border-box;
    background: url("../assets/images/bg_all_customers_det.png") no-repeat;
    background-size:cover;
    ul {      
      li {
        float: left;
        width: 33.33%; 
        color: #fff;     
        .icon-back {
          display: inline-block;
          width: 10px;
          height: 17px;
          background: url("../assets/images/icon_back@3x.png") no-repeat;
          background-size: 10px 17px;
        }  
      }
    }
  }
</style>
