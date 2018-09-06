<template>
  <div class="relation-wrap">
      <div class="com-back-bg">
        <CommonBack :backTitle = "backTitle"></CommonBack>
      </div>  
      <div class="relation-top ">
        <div class="com-bgcolor-fff" v-for = "(item, index) in linkInfo" :key = 'index'>
          <div class="com-pad-lr12">
              <div class="com-pad-item">
                <i class="com-left-border"></i>第{{item.relationTop}}联系人     
              </div>
          </div>
          <div class="border-bot-1px"></div>
          <ul class="ul-wrap">
            <li>
              <span>关系</span>
              <p>{{item.relation}}</p>
            </li>
            <li>
              <span>姓名</span>
              <p>{{item.name}}</p>
            </li>
            <li v-if = 'item.relation == "配偶"'>
              <span>身份证号码</span>
              <p>配偶电话加个字段</p>
            </li>
            <li>
              <span>电话</span>
              <p>{{item.phone}}</p>
            </li> 
            <li>
              <span>是否允许知晓该比借款</span>
              <p>
                <span v-if = "item.linkmanIsKnow == 0">是</span>
                <span v-else-if = "item.linkmanIsKnow == 1">否</span>
                <span v-else></span>
              </p>
            </li>       
          </ul>        
        </div>
      </div>
      
      <!-- <div class="com-bgcolor-fff">
        <div class="com-pad-lr12">
            <div class="com-pad-item">
              <i class="com-left-border"></i>第二联系人     
            </div>
        </div>
        <div class="border-bot-1px"></div>
        <ul class="ul-wrap">
          <li>
            <span>关系</span>
            <p>同事</p>
          </li>
          <li>
            <span>姓名</span>
            <p>大美美</p>
          </li>
          <li>
            <span>电话</span>
            <p>1222222222</p>
          </li>           
          <li>
            <span>是否允许知晓该比借款</span>
            <p>是</p>
          </li>       
        </ul>        
      </div>   -->
      <!-- <div class="com-bgcolor-fff">
        <div class="com-pad-lr12">
            <div class="com-pad-item">
              <i class="com-left-border"></i>第三联系人     
            </div>
        </div>
        <div class="border-bot-1px"></div>
        <ul class="ul-wrap">
          <li>
            <span>关系</span>
            <p>同事</p>
          </li>
          <li>
            <span>姓名</span>
            <p>大美美</p>
          </li>
          <li>
            <span>电话</span>
            <p>1222222222</p>
          </li>           
          <li>
            <span>是否允许知晓该比借款</span>
            <p>是</p>
          </li>       
        </ul>        
      </div>             -->
  </div>
</template> 

<script>
import CommonBack from "@/components/CommonBack";
import { mapActions } from "vuex";
import api from "@/api/index";
export default {
  name: "Baserelation",
  //   showCustFollow
  data() {
    return {
      backTitle: "联系人信息",
      linkInfo: []
    };
  },
  created() {
    this.getItemObj();
    this.custItem = this.$store.state.custItem;
    // console.log(this.$store.state.custItem);
  },
  mounted() {
    this.queryLinkManInfoFn()
  },
  methods: {
    queryLinkManInfoFn() {
      let params = {
        crmCustInfo: this.custItem.crmCustInfoId
      };
      this.linkInfo = []
      api.queryLinkManInfo(params).then(res => {
        if (res.data.code == 1) {
          this.linkInfo = res.data.data;
        }
      });
    },
    ...mapActions({
      getItemObj: "GET_ITEM_OBJ"
    })
  },
  components: {
    CommonBack
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.relation-wrap {
  font-size: 16px;
  color: #4d4d4d;
  .com-bgcolor-fff:last-child {
    margin-top: 9px;
  }
  .relation-top {
    margin: 59px 0 9px;
  }
  .com-pad-lr12 {
    .com-left-border {
      margin-right: 0.09rem;
      margin-left: -12px;
    }
  }
  .com-icon-link {
    margin-top: 0;
    margin-left: 10px;
  }
  .default {
    color: #c4c4c4;
  }
  .border-bot-1px {
    border-bottom: 0.01rem solid #e5e5e5;
    margin-left: 12px;
  }
  .com-require {
    // width: 72px;
  }
  .com-pad-item {
    padding: 14px 0;
    line-height: 15px;
  }
  .ul-wrap {
    li {
      display: flex;
      font-size: 13px;
      color: #a8a8a8;
      padding: 0 12px;
      z-index: 1212;
      &:nth-child(2n + 1) {
        height: 36px;
        line-height: 36px;
        background-color: #fff;
      }
      &:nth-child(2n) {
        height: 34px;
        line-height: 34px;
        background: rgba(248, 248, 248, 1);
      }
      span {
        width: 43%;
      }
      p {
        flex: 1;
        text-align: right;
        color: #595959;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .work-relation {
    padding-bottom: 1px;
    .com-doted {
      margin-top: -4px;
    }
    .work-tit {
      margin: 16px 0 17px;
      font-size: 13px;
      color: #595959;
    }
    .ul-wrap {
      li {
        line-height: 13px;
        height: 13px;
        margin-bottom: 23px;
        background-color: #fff;
      }
    }
  }
  .com-back-bg {
    position: fixed;
    width: 100%;
    top: 0;
  }
}
</style>
