<template>
    <div class="ques-wrap">
      <button @click="test">Async Load Data</button>
      <div>
        <input v-model="val1"  class ='search-input' placeholder="请输入" />
      </div>
      
        <span>——</span>
        <div>
        <input v-model="val2"  class ='search-input' placeholder="请输入"  />
        </div>
    </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  name: "hello",
  data() {
    return {
      showToast2: null,
      val1: '',
      val2: '',
      showToast23: null
    };
  },
  created() {
  },
  mounted() {
    
    this.showToast2 = this.$createToast({
        time: 1000,
        txt: "txttxttxttxttxt",
        type: "warn",
        zIndex: 99999
      });
      this.showToast23 = this.$createToast({
        time: 1000,
        txt: "加载中...",
        mask: true,
        zIndex: 100000
      });
  },
  methods: {
    test() {
      if (Number(this.val1) > Number(this.val2)) {
        this.showToast2.show()
        setTimeout(()=>{
          this.showToast2.hide()
        })
        return
      }
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.ques-wrap {
  font-size: 16px;
}
</style>
