<template>
  <div class="booklis">
    <Logo :logo="l"></Logo>
    <div class="content">
      <div class="lis">
        <ul>
          <Bookbrief :book="look" v-for="(look, index) in search" :key="index"></Bookbrief>
        </ul>
        <div class="see-more" @click="gengduo">查看更多></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getSearchResult } from "../api/api";
import Logo from "../components/Logo";
import Bookbrief from "../components/Bookbrief";
export default {
  name: "",
  props: {},
  data() {
    return {
      l: "",
      search: "",
      jia: 20
    };
  },
  created() {
    this.l = this.$route.query.txt;
    this.lists();
  },
  computed: {},
  methods: {
    lists() {
      getSearchResult({ query: this.l }).then(
        res => {
          this.search = res.data.books.slice(0, 20);
          console.log(this.search, "23333");
        },
        err => {
          alert(err);
        }
      );
    },
    gengduo() {
      getSearchResult({ query: this.l }).then(
        res => {
          this.search.push(...res.data.books.slice(this.jia, this.jia + 20));
          console.log(this.search, "23333");
          this.jia += 20;
        },
        err => {
          alert(err);
        }
      );
    }
  },
  components: {
    Logo,
    Bookbrief
  }
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
.booklis {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;

  .content {
    position: relative;
    width: 100%;
    height: 96vh;
    background: #fff;
    overflow: auto;

    .lis {
      padding-left: 0.6rem;
      padding-bottom: 1rem;

      .see-more {
        height: 2.5rem;
        border-bottom: 0.013333rem solid #f5f5f5;
        line-height: 2.5rem;
        font-size: 14px;
        text-align: center;
        color: red;
        margin: 0 0.5rem;
        // padding: 20px 0;
      }
    }
  }
}
</style>