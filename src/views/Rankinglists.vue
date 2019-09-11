<template>
  <div class="ranklist">
    <div class="navgation">
      <div class="name">
        <div class="icon-arrow-left2" @click="fanhui">返回</div>
        <div class="logo">{{rankName}}</div>
        <div class>
          <span class="icon"></span>
        </div>
      </div>
      <div class="select">
        <ul class="select-bar">
          <li
            v-for="(item,index) in largeTypes"
            :key="index"
            :class="{'active':index===largeTypeIndex}"
            @click="setLargeType(item.type,index)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="lists" ref="list">
      <div class="lists-bao" @scroll="huaclass()" ref="hua">
        <div ref="nr">
          <Bookbrief :book="look" v-for="(look, index) in looklist" :key="index"></Bookbrief>
        </div>
      </div>
      <div class="loding" v-show="ovo">骚等······</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getRank } from "../api/api.js";
import Bookbrief from "../components/Bookbrief";
import { setTimeout } from "timers";
export default {
  name: "",
  props: {},
  data() {
    return {
      rankName: "",
      weekid: "", //周榜
      monthid: "", //月榜
      totalid: "", //总榜
      largeTypes: [
        {
          name: "周榜",
          type: "week"
        },
        {
          name: "月榜",
          type: "month"
        },
        {
          name: "总榜",
          type: "total"
        }
      ],
      looklist: [],
      largeTypeIndex: 0,
      // currentLoadPage: 1,
      linkid: "",
      jiazai: 20,
      ovo: false //加载中
    };
  },
  created() {
    this.sao();
  },
  mounted() {},
  computed: {},
  methods: {
    setLargeType(type, index) {
      //点击后重置滚动距离
      this.looklist = [];
      this.$refs.hua.scrollTop = 0;
      // this.jiazai=this.looklist.length
      this.largeTypeIndex = index;
      if (type == "week") {
        this.linkid = this.weekid;
        console.log(this.linkid, "1");
      }
      if (type == "month") {
        this.linkid = this.monthid;
        console.log(this.monthid, "3");
      }
      if (type == "total") {
        this.linkid = this.totalid;
        console.log(this.totalid, "2");
      }
      this.switch();
    },
    sao() {
      this.rankName = this.$route.query.title;
      this.weekid = this.$route.query.weekid;
      this.monthid = this.$route.query.monthid;
      this.totalid = this.$route.query.totalid;
      this.linkid = this.weekid;
      console.log(this.weekid, "QAQ");
      console.log(this.monthid, "QvQ");
      console.log(this.totalid, "Q3Q");
      getRank(this.linkid).then(
        res => {
          if (res.data.ok) {
            this.looklist = res.data.ranking.books.slice(0, this.jiazai);
          }
          console.log(this.looklist, "QAQ");
        },
        err => {
          alert(err);
        }
      );
    },
    switch() {
      getRank(this.linkid).then(
        res => {
          if (res.data.ok) {
            this.looklist = res.data.ranking.books.slice(0, this.jiazai);
            console.log(this.looklist, "<==2333");
          }
        },
        err => {
          alert(err);
        }
      );
    },
    load() {
      this.ovo = true;
      console.log("骚等");
      setTimeout(() => {
        this.jiazai = this.looklist.length;
        getRank(this.linkid).then(
          res => {
            if (res.data.ok) {
              this.looklist.push(
                ...res.data.ranking.books.slice(this.jiazai, this.jiazai + 20)
              );
              console.log(this.looklist, "QAQ");
              this.ovo = false;
            }
          },
          err => {
            alert(err);
          }
        );
      }, 2000);
      console.log("ok");
    },
    huaclass() {
      let h = this.$refs.hua.offsetHeight; //可视高度
      let g = this.$refs.hua.scrollTop; //滚动条高度
      let nr = this.$refs.nr.clientHeight; //内容高度
      if (g + h == nr) {
        this.load();
      }
    },
    fanhui() {
      this.$router.go(-1);
    }
  },
  components: {
    Bookbrief
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.ranklist {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #999;

  .navgation {
    position: relative;
    top: 0;
    left: 0;

    .name {
      width: 100%;
      height: 2.5rem;
      box-sizing: border-box;
      padding: 0.6rem 0.6rem;
      overflow: hidden;
      display: flex;
      font-size: 14px;
      background: #000;
      color: #fff;
      // display: none;

      div {
        display: inline-block;
        flex: 1;
      }

      div:nth-child(1) {
        line-height: 1.3rem;
      }

      div:nth-child(2) {
        flex: 3;
        line-height: 1.3rem;
        text-align: center;
      }
    }

    .select {
      width: 100%;
      z-index: 10;
      background: #fff;

      .select-bar {
        display: flex;
        // flex-direction: row;
        // justify-content: flex-start;
        flex-wrap: nowrap;
        width: 100%;
        height: 3.5rem;
        color: #999;
        overflow-x: auto;
        overflow-y: hidden;
        border-bottom: 1px solid #f2f2f2;

        li {
          text-align: center;
          flex: 1;
          line-height: 3.5rem;
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }

  .lists {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 96vh;
    background: #fff;
    //   box-sizing: border-box;

    .lists-bao {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
    }

    .loding {
      position: fixed;
      top: 50%;
      left: calc(50% - 75px);
      // right: 0;
      // bottom: 0;
      // margin: auto;
      width: 150px;
      height: 3rem;
      color: #fff;
      background: rgba(50, 51, 52, 0.6);
      font-size: 30px;
      text-align: center;
      line-height: 3rem;
    }
  }

  .active {
    color: #409eff;
    border-bottom: 1px solid #409eff; /* no*/
  }
}
</style>