<template>
  <div class="book">
    <div class="muli" v-show="mulus">
      <ul>
        <div @click="name">{{bookName}}</div>
        <li v-for="(look, index) in chapterList" :key="index" @click="gotosee(index)">{{look}}</li>
      </ul>
    </div>
    <div class="looking" @click="shezhi()"> 
      <div class="seeing" @scroll="rolling()" ref="liu" 
        :style="{color:fontColor,background:background}">
        <div class="txt" ref="nh">
          <h1 class="book-title">{{bookContent.title}}</h1>
          <div class="book-inner" v-html="bookChaptersBody(bookContent.cpContent)"></div>
        </div>
      </div>
      <div class="loding" v-show="sao">骚等······</div>
      <div class="setting" v-show="shezhis">
        <div class="readSet-item">
         <div class="icon-arrow-left2" @click="fanhui()">返回</div>
         <div class="logo">{{bookName}}</div>
         <div class>
         <p class="icon-menu float-right"></p>
         </div>
        </div>
        <div class="readSet-btn">
          <div class="moshi"> 
            <span class="btn" v-for="(item,index) in pattern" :key="index" 
            :class="{active:readePattern===index}"
            @click.stop="setPattern(item,index)">{{item.item}}
            </span>
          </div>
          <div class="xuanze">
            <span @click="previous">上一章</span>
            <span @click="lists">目录</span>
            <span @click="next">下一章</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "ImgWrapper",
  props: {},
  data() {
    return {
      bookid: "", //书源ID
      bookName: "", //书名
      directory: [], //目录
      chapterList: [], //目录名
      booklinks: [], //目录链接
      bookContent: "", //章节内容
      chapter: 0, //章节内容下标
      pattern: [
        {
          //阅读模式
          item: "默认",
          color: "#5c5d58",
          background: "#eee6dd"
        },
        {
          item: "夜间",
          // color: '#666',
          color: "#fff",
          background: "#000"
        },
        {
          item: "护眼",
          color: "#5c5d58",
          background: "#c8e8c8"
        }
      ],
      readePattern: 0,
      fontColor: "#5c5d58",
      background: "#eee6dd",
      mulus: false ,//目录
      shezhis:false,//设置
      sao:false,//加载中
    };
  },
  created() {
    this.attach();
  },
  computed: {},
  methods: {
    bookChaptersBody(books) {
      if (books) {
        let c = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
        let _book = JSON.stringify(books).replace(/^"|"$/g, "");
        this.loading = false;
        if (c.test(_book)) {
          _book =
            "<p>" +
            _book.replace(/\s*/g, "").replace(/\\n/g, "</p><p>") +
            "</p>";
          return _book;
        } else {
          return "vip章节，请购买或者换源阅读！";
        }
      }
    },
    rolling() {
      let visualheight = this.$refs.liu.offsetHeight; //可视高度
      let scrollTop = this.$refs.liu.scrollTop; //滚动条高度
      let contentheight = this.$refs.nh.clientHeight; //内容高度

      if (visualheight + scrollTop == contentheight) {
        this.loadMore();
        console.log("触发了");
      }
    },
    attach() {
      ///api/atoc?view=summary&book=548d9c17eb0337ee6df738f5
      let id = this.$route.query.id;
      const url = `/api/atoc/?view=summary&book=${id}`; //查询书源根据id找章节
      this.axios.get(url).then(
        res => {
          this.bookid = res.data[0]._id; //默认获取第一书源的书
          this.get();
        },
        err => {
          alert(err);
        }
      );
    },
    get() {
      let arr = [];
      const url = `/api/btoc/${this.bookid}?view=chapters&channel=mweb`; //根据书源id找章节
      // const url = `/api/mix-atoc/${this.id}?view=chapters`;//迫不得已才用的api
      this.axios.get(url).then(
        res => {
          this.bookName = res.data.bookName;
          this.directory = res.data.chapters.length;
          for (let i = 0; i < this.directory; i++) {
            arr.push(res.data.chapters[i].title);
            this.booklinks.push(encodeURIComponent(res.data.chapters[i].link));
          }
          this.chapterList = arr; //当书有番外篇的时候，追书神器api返回的内容是错乱的！
          //   this.booklinks(this.bookSourceLinks[this._chapterIndexCache()]);
          this.see();
        },
        err => {
          alert(err);
        }
      );
    },
    see() {//请求章节方法
      const url = `/content/chapter/${this.booklinks[this.chapter]}`;
      this.axios.get(url).then(
        res => {
          this.bookContent = res.data.chapter;
        },
        err => {
          alert(err);
        }
      );
    },
    loadMore() {
      //滚动模式懒加载章节,到时候搞一个翻页模式
      if (this.chapter === this.booklinks.length) {
        console.log("没有了");

        return;
      }
      this.sao=true
      this.chapter++;
      const url = `/content/chapter/${this.booklinks[this.chapter]}`;
      setTimeout(()=>{
          this.axios.get(url).then(
            res => {
            this.bookContent = res.data.chapter;
            this.$refs.liu.scrollTop = 0;
            this.sao=false
            },
            err => {
            alert(err);
            }
        );
      },1000)
      
    },
    shezhi(){//打开设置页面
        this.shezhis=!this.shezhis
    },
    fanhui() {//退出阅读
      this.$router.go(-1);
    },
    name() {//点击名字返回
      this.mulus = !this.mulus;
    },
    gotosee(index){//目录选择那一章
        this.chapter=index
        this.see()
        this.mulus=!this.mulus
        this.$refs.liu.scrollTop = 0;
    },
    setPattern(item, index) {
      //阅读模式设置
      this.option = true;
      this.readePattern = index;
      this.fontColor = item.color;
      this.background = item.background;
      this.$refs.liu.style.color = this.fontColor;
      this.$refs.liu.style.background = this.background;
    },
    previous(){//上一章
        this.chapter-=1
        this.see()
        this.$refs.liu.scrollTop = 0;
    },
    lists(){//去目录
          this.mulus=!this.mulus
    },
    next(){//下一章
        this.chapter+=1
        this.see()
        this.$refs.liu.scrollTop = 0;
    }
  },
  components: {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.book {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.muli {
    position: relative;
  width: 100%;
  height: 100%;
  z-index: 20;
  background: rgb(255, 255, 255);
  ul{
      position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  }
}
.looking {
  position: relative;
  width: 100%;
  height: 100%;
}
.seeing {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  .txt {
    padding: 0 0.5rem;
  }
  .book-inner {
    line-height: 2rem; /*no*/
    text-indent: 2em;
  }
  .book-title {
    line-height: 50px;
    font-weight: 400;
    margin-bottom: 25px;
  }
}
.readSet-item{
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 2.5rem;
      box-sizing: border-box;
      padding: 0.6rem 0.6rem;
      overflow: hidden;
      display: flex;
    background-color: rgba(50,51,52,.9);
      color: #fff;
      div{
        display: inline-block;
        flex: 1;
      }
      div:nth-child(2) {
        padding: 0;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
      line-height: 1.3rem;
      }
      

    }
.readSet-btn{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    z-index: 100;
    background-color: rgba(50,51,52,.9);
    transition: all .2s ease;
    .moshi{
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    .btn{
        color: #fff;
        border: 1px solid #535353;
        border-radius: 0.2rem;
    }
    span{
        // display: inline-block;
        flex: 1;
        height: 2rem;
        box-sizing: border-box;
        line-height: 2rem;
        text-align: center;
    }
    span:nth-child(2) {
        margin: 0 1rem;
    }
    .active{
        color: #b93221;
        border: 1px solid #b93221;
    }
    }
    .xuanze{
    width: 100%;
    display: flex;
    span{
        // display: inline-block;
        flex: 1;
        height: 2rem;
        line-height: 2rem;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
    }
    span:nth-child(2) {
        color: #a8a8a8;
        text-align: center;
        font-size: .4rem;
    }
    }
}
.loding{
    position: fixed;
    top: 50%;
    left: calc(50% - 75px);
    // right: 0;
    // bottom: 0;
    // margin: auto;
    width: 150px;
    height: 3rem;
    color: #fff;
    background: rgba(50,51,52,.6);
    font-size: 30px;
    text-align: center;
    line-height: 3rem;
}
</style>