<template>
  <div class="looking">
    <div class="ml" @scroll="mu()" ref="liu" v-show="mulus">
      <ul class="" ref="nh">
        <li v-for="(look, index) in directory" :key="index">{{look}}</li>
      </ul>
    </div>
    <div class="reading" @click="tiaoshi">
      <div class="seeing" @scroll="gun()" ref="liu" :style="{color:fontColor,background:background}">
        <div class="txt" ref="nh">
          <h1 class="book-title" >{{bookContent.title}}</h1>
          <div class="book-inner" v-html="bookChaptersBody(bookContent.cpContent)"></div>
        </div>
      </div>
      <div class="setting" v-show="shezhi">
        <div class="readSet-item">
          <span v-for="(item,index) in pattern" :key="index" 
          :class="{active:readePattern===index}"
          @click.stop="setPattern(item,index)">{{item.item}}
          </span>
        </div>
        <div class="readSet-btn">
          <div class="moshi"> 
            <span class="btn" v-for="(item,index) in pattern" :key="index" 
            :class="{active:readePattern===index}"
            @click.stop="setPattern(item,index)">{{item.item}}
            </span>
          </div>
          <div class="xuanze">
            <span>上一章</span>
            <span @click="mulu">目录</span>
            <span>下一章</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  // name: "ImgWrapper",
  props: {},
  data() {
    return {
      bookid: "",//书源ID
      directory: [],//目录名字
      booklinks: [],//目录链接
       bookContent:'',//章节内容
      chapter:0,//章节内容下标
      pattern: [{//阅读模式
          item: '默认',
          color: '#5c5d58',
          background: '#eee6dd'
        }, {
          item: '夜间',
          // color: '#666',
          color: '#fff',
          background: '#000'
        }, {
          item: '护眼',
          color: '#5c5d58',
          background: '#c8e8c8'
        }],
        readePattern: 0,
        fontColor: '#5c5d58',
        background: '#eee6dd',
        mulus:false,//目录
        shezhi:false,//设置页
    };
  },
  created() {
    this.attach();
   
  },
  computed: {},
  methods: {
    bookChaptersBody(books){//字符串解析
      if (books) {
        let c = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
        let _book = JSON.stringify(books).replace(/^"|"$/g, '');
        this.loading = false;
        if (c.test(_book)) {
          _book = '<p>' + _book.replace(/\s*/g, '').replace(/\\n/g, '</p><p>') + '</p>';
          return _book
        } else {
          return 'vip章节，请购买或者换源阅读！' //换源功能已经实现
        }
      }
    },
    gun() {
      let h = this.$refs.liu.offsetHeight; //可视高度
      let g = this.$refs.liu.scrollTop; //滚动条高度
      let nh = this.$refs.nh.clientHeight; //内容高度
      
      if (g + h == nh) {
          this.loadMore()
      // console.log('2333');
      }
    },
    attach(){      ///api/atoc?view=summary&book=548d9c17eb0337ee6df738f5
      let id = this.$route.query.id;
        const url= `/api/atoc/?view=summary&book=${id}`//查询书源根据id找章节   
        this.axios.get(url).then(
          res => {
            this.bookid=res.data[0]._id//默认获取第一书源的书
            console.log('QAQ');
            this.get()
          },
          err => {
            alert(err);
          }
        );   
    },
    get() {
      let arr = [];
      let t = this.directory.length;
      var q = [];
      // let q=50;
      let i;
      if (t == 0) {
        t = 50;
      } else {
        t = t + 50;
      }                    
      const url=`/api/btoc/${this.bookid}?view=chapters&channel=mweb`//根据书源id找章节
      // const url = `/api/mix-atoc/${this.id}?view=chapters`;//迫不得已才用的api
      this.axios.get(url).then(
        response => {
          for (i = 0; i < t; i++) {
            arr.push(response.data.chapters[i].title);
            q.push(encodeURIComponent(response.data.chapters[i].link)); //进行解码
          }
          this.directory = arr;
          this.booklinks.push(...q);
          this.see()
            console.log('QvQ');
        },
        err => {
          alert(err);
        }
      );
    },
    see(){
       const url =`/content/chapter/${this.booklinks[this.chapter]}`
      this.axios.get(url).then(
        res => {
              this.bookContent =res.data.chapter
              // console.log(this.bookContent,2333);
              
        },
        err => {
          alert(err);
        }
      );
    },
     loadMore(){//滚动模式懒加载章节,到时候搞一个翻页模式
       if (this.chapter === this.booklinks.length) {
         console.log('没有了');
         
          return
        }
        console.log(this.pattern[0],'QAQ');
        
      this.chapter++
       const url =`/content/chapter/${this.booklinks[this.chapter]}`
      this.axios.get(url).then(
        res => {
              this.bookContent =res.data.chapter
          this.$refs.liu.scrollTop=0

        },
        err => {
          alert(err);
        }
      );
    },
    setPattern(item, index){ //阅读模式设置
      this.option = true;
      this.readePattern = index;
      this.fontColor = item.color;
      this.background = item.background;
      this.$refs.liu.style.color=this.fontColor
      this.$refs.liu.style.background=this.background
      // console.log(,'6666');
      
    },
    tiaoshi(){
      if (this.shezhi==true) {
        this.shezhi=false
      }else{
        this.shezhi=true
      }
console.log(this.shezhi,'触发了');
    },
    mu(){
      this.get()
console.log('触发了');

    },
    mulu(){
console.log('6666');
      this.mulus=true
    },

  },
  components: {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.looking {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  .ml {
    position: absolute;
    top: 0rem;
    left: 0;
    z-index: 22;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: auto;
  }
  .reading{
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
    .txt{
      padding: 0 0.5rem;
    }
    .book-inner{
      line-height: 2rem; /*no*/
      text-indent: 2em;
    }            
    .book-title{
      line-height: 50px;
      font-weight: 400;
      margin-bottom: 25px;
    }
              
  }
  .setting{
    width: 100%;
    .readSet-item{
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      z-index: 100;
      background: #000;
      text-align: center;
      color: #fff;
      span{
        flex: 1;
        line-height: 2rem;
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
  }
  
}
// .l{
//   position: fixed;
//   top: 30px;active
//   left: 30px;
//   background: #fff;
//   &active{
//     background: #000;
//   }
// }
</style>