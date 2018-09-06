<template>
  <div class="title-cen">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'Title',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-cen {
  text-align: center;
  font-size: 18px;
  color: #fff;
}
</style>
