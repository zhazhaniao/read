<template>
  <!-- 书籍列表组件-->
  <div class="case" @scroll="scrollclass()" ref="liu">
    <ul class ref="nh">
      <Bookbrief :book="look" v-for="(look, index) in booklist" :key="index"></Bookbrief>
    </ul>
  </div>
</template>
<script type="text/javascript">
import Bookbrief from "./Bookbrief";
export default {
  name: "Booklist",
  props: {
    booklist: {}
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    scrollclass() {
      let h = this.$refs.liu.offsetHeight; //可视高度
      let g = this.$refs.liu.scrollTop; //滚动条高度
      let nh = this.$refs.nh.clientHeight; //内容高度
      if (g + h == nh) {
        this.$emit("jiazai", "");
      }
    }
  },
  components: {
    Bookbrief
  }
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
.case {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.case > ul {
  // padding-left: 1rem;
  margin-left: 1rem;
}
</style>