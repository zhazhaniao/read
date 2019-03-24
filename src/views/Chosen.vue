<template>
  <div>
    <div class="banner">
      <ul
        ref="ul"
        @transitionend="w"
        @touchstart="ontouchstart"
        @touchmove="ontouchmove"
        @touchend="ontouchend"
      >
        <li v-for="(item,index) in showPicPath" :key="index" ref="tu">
          <img class="auto-img" :src="item" alt>
        </li>
      </ul>
      <!-- <button class="btn" @click="nextPic">next</button>
      <button class="q" @click="prevPic">shang</button>-->
    </div>
    <div class="books">
      <div class="title">
        男生最爱
        <i class="tip"></i>
      </div>
      <div class="book-list">
        <ul>
          <Bookbrief :book="look" v-for="(look, index) in maleList" :key="index"></Bookbrief>
          <!-- <li v-for="(book, index) in femaleList" :key="index"></li> -->
        </ul>
      </div>
      <div class="see-more">查看更多></div>
    </div>
    <div class="books">
      <div class="title">
        女生最爱
        <i class="tip"></i>
      </div>
      <div class="book-list">
        <ul>
          <Bookbrief :book="look" v-for="(look, index) in femaleList" :key="index"></Bookbrief>
          <!-- <li v-for="(book, index) in femaleList" :key="index"></li> -->
        </ul>
      </div>
      <div class="see-more">查看更多></div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {getRank} from '../api/api.js'
import Bookbrief from "../components/Bookbrief";
export default {
  // name: "ImgWrapper",
  props: {},
  data() {
    return {
      banner: [
          'http://statics.zhuishushenqi.com/recommendPage/15313940968984',
          'http://statics.zhuishushenqi.com/recommendPage/153139416791777',
          'http://statics.zhuishushenqi.com/recommendPage/153139401503529',
          'http://statics.zhuishushenqi.com/recommendPage/153139406636473'],
      currentIndex: 0,
       startX:0,//开始触摸的位置
        moveX:0,//滑动时的位置
        endX:0,//结束触摸的位置
        width:0,//移动距离
         maleList: [],
        femaleList: [],
        a: ""
    };
  },
  created() {
    this.rink()
    this.go()
    
  },
  computed: {
    showPicPath() {
      let arr = this.banner;
      return [arr[arr.length - 1], ...arr, arr[0]];
    }
  },
  methods: {
      rink(){
          //排行请求，id去这找http://api.zhuishushenqi.com/ranking/gender
        getRank('54d42d92321052167dfb75e3').then(res => {
            if (res.data.ok) {
                this.maleList =res.data.ranking.books.slice(0, 5)
                // Indicator.close()
            }
          }, 
            err => {
            alert(err);
            }
        );
        getRank('54d43437d47d13ff21cad58b').then(res => {
            if (res.data.ok) {
                this.femaleList =res.data.ranking.books.slice(0, 5)
                // Indicator.close()
            }
          }, 
            err => {
            alert(err);
            }
        );
      },
      
    w() {
                let ul = this.$refs.ul
   if (this.currentIndex>= this.banner.length) {
                        ul.style.transition = 'none'
                        this.currentIndex = 0
                        let offsetX = -(this.currentIndex + 1) * this.width
                        ul.style.transform = `translateX(${offsetX}px)`
                    }
    },
    nextPic(evt) {
                this.currentIndex++
                let ul = this.$refs.ul
                this.width=this.$refs.ul.clientWidth/10
                ul.style.transition = 'all .6s linear'
                let offsetX = -(this.currentIndex + 1) * this.width
                ul.style.transform = `translateX(${offsetX}px)`
            },
    prevPic() {
      this.currentIndex--;
      let ul = this.$refs.ul;
      let width = this.$refs.tu[0].offsetWidth;
      ul.style.transition = "all .6s linear";
      let offsetX = -(this.currentIndex + 1) * width;
      ul.style.transform = `translateX(${offsetX}px)`;
    },
    ontouchstart(e){
  this.startX = e.touches[0].pageX;
    },
    ontouchmove(e){
      let ul = this.$refs.ul;
       this.moveX = e.touches[0].pageX - this.startX;
          //实时的滑动的距离-起始位置=实时移动的位置
        // this.disX = this.moveX-this.startX;
         if(this.moveX<0 || this.moveX == 0) {
            ul.style.transform = `translateX(${this.moveX+this.endX}px)`;
        }else if(this.moveX>0){
            ul.style.transform = `translateX(${this.moveX+this.endX}px)`;
        }
    },
    ontouchend(){
      let ul = this.$refs.ul;
      let q=ul.style.transform
      let s=q.match(/translateX\((.*)\)/)[1]
      this.endX=parseInt(s)
        // console.log(q.match(/\(\[0]\p/),'ok');
    },
    go(){
        this.a = setInterval(()=>{
            this.nextPic()
        },3000)
    }
  },
   beforeRouteLeave(to, from, next){
        console.log("1",to)
        console.log("2",from)
        next(
            clearInterval(this.a)
        )
    },
  components: {Bookbrief}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 10rem;
  overflow: hidden;
  ul {
    position: absolute;
    width: 1000%;
    height: 10rem;
    transform: translateX(-10%);
    li {
      display: inline-block;
      width: 10%;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid #233;
    }
  }
}

.title {
  display: block;
  position: relative;
  padding: 0 0.6rem;
  font-size: 15px; /* no*/
  line-height: 2.2rem; /* no*/
  font-weight: 700;
  .tip {
    position: absolute;
    width: 2px; /* no*/
    height: 30px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #409eff;
  }
}
.book-list {
  padding-left: 0.6rem;
}
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
.btn {
  position: fixed;
  top: 24rem;
  left: 3rem;
  z-index: 30;
}

.q {
  position: fixed;
  top: 24rem;
  left: 6rem;
  z-index: 30;
}
</style>