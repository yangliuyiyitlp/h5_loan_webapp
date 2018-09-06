<template>
  <div class="det-wrap">
    <div class="det-top">
      <CommonBack :backTitle = "backTitle"></CommonBack>
    </div>
    <div class="pad12">
      <ul>
        <li><router-link to="/baseInformain">基本信息<i class="com-icon-link fr"></i></router-link></li>
        <li><router-link to="/relationInformain">联系人信息<i class="com-icon-link fr"></i></router-link></li>
        <li><router-link to="/accountInformain">账户信息<i class="com-icon-link fr"></i></router-link></li>
        <li v-if = 'showOreder'><router-link to="/customerDet">订单信息<i class="com-icon-link fr"></i></router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommonBack from "@/components/CommonBack";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CustDetail",
  props: {
    showOreder: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      backTitle: "客户详情"
    };
  },
  created() {
    this.getItemObj();
    console.log(this.$store.state.custItem);
  },
  methods: {
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
.det-wrap {
  .det-top {
    height: 50px;
    line-height: 50px;
    background-image: -webkit-linear-gradient(
      -52deg,
      #232c81 110px,
      #2858a0 200px
    );
  }
  .pad12 {
    padding: 0 12px;
    margin-top: 9px;
    background-color: #fff;
    ul {
      li {
        height: 62px;
        line-height: 62px;
        font-size: 16px;
        color: #4d4d4d;
        border-bottom: 1px solid #e5e5e5;
        &:last-child {
          border-bottom: none;
        }
        & > a {
          display: block;
        }
        .com-icon-link {
          display: inline-block;
          // width: 8px;
          // height: 14px;
          width: 10px;
          height: 18px;
          background: url("../../assets/images/icon_link@3x.png") no-repeat;
          background-size: 100%;
          margin-top: 24px;
          // icon_link@3x
        }
      }
    }
  }
}
</style>
