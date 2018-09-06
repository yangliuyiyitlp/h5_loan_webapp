<template>
  <div class="back-wrap">
    <ul class="clearfix">
      <li>
        <i class="icon-back" @click="goBack"></i>
      </li>
      <li class="com-cen">{{backTitle}}</li>
      <li class="com-right">
        <span v-if='showCustFollow' @click='goCustFollow'>跟进记录</span>
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
    },
    showCustFollow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      msg: 'Welcome to sasas Page'
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    },
    goCustFollow() {
      
      this.$emit('goCustFollow')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="less">
  .back-wrap {
    font-size: 14px;  
    height: 0.5rem;
    line-height: 0.5rem;
    background-image: -webkit-linear-gradient(-52deg, #232c81 1.1rem, #2858a0 2rem); 
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
        &.com-right {
          span {
            display: inline-block;
            margin-right: 8px;
            line-height: 15px;
          }
        }  
      }
    }
  }
</style>
