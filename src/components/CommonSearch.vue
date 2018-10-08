<template>
  <div class="search-wrap">
    <div class="search-top">
      <CommonBack :backTitle = 'backTitle'></CommonBack>
    </div>
    <div class="search-con">
      <div class="search-pad">
        <span>
          <i class="icon-search" @click="search"></i>
        </span>
        <input type="text" :placeholder="placeholder" v-model.trim="searchCon">
       <span class="com-right">
          <i class="icon-search icon-search-close" @click="clearFn"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import CommonBack from "@/components/CommonBack"

export default {
  name: 'search',
  props: {
    placeholder: {
      type: String,
      default: '请输入姓名/手机号/身份证号码进行搜索'
    },
    backTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchCon: ''
    }
  },
  methods: {
    search() {
      this.$emit('search',this.searchCon)
    },
    clearFn() {
      this.searchCon = ''
      this.$emit('clear',this.searchCon)
    }
  },
  components: {
    CommonBack
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="less">
.search-wrap {
  height: 110px;
  width: 100%;
  background: url("../assets/images/bg_all_customers_det.png") no-repeat;
  background-size: 100% 100%;
  .search-top {
    // padding-top: 18px;
    // padding-bottom: 18px;
    // padding-top: 15px;
    // padding-bottom: 16px;
  }
  .search-con {
    padding: 0 17px;
    
    input {
      display: block;
      font-size: 12px;
      width: 100%;
      line-height: 18px;
      height: 18px;
      flex: 1;
      background: #ffffff00;
      color: #fff;
      background: rgba(255, 255, 255, 0);
    }
    .search-pad {
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 7px 5px;
      border-radius: 28px;
      // background:rgba(255,255,255,1);
      // opacity:0.14;
      // color: #fff;
      background: rgba(255,255,255,0.14);
      color: #fff;
      span {
        width: 54px;
        height: 18px;
      }
      .icon-search {
        width: 18px;
        height: 18px;
        display: block;
        background: url("../assets/images/icon_search@3x.png") no-repeat;
        background-size: 18px 18px;
        margin-left: 15px;
      }
      .icon-search-close {
        background: url("../assets/images/icon_close@3x.png") no-repeat;
        background-size: 18px 18px;
        float: right;
        margin-right: 0.15rem;
      }
    }
  }
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:rgba(255,255,255,1);
    opacity:0.18;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:rgba(255,255,255,1);
   opacity:0.18;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:rgba(255,255,255,1);
    opacity:0.18;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:rgba(255,255,255,1);
    opacity:0.18;
  }
}
</style>
