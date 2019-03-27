<template>
  <div>
    <div class="banner">
      <mt-swipe :auto="4000" :speed="1000">
        <mt-swipe-item v-for="(item, index) in banner" :key="index">
          <img class="auto-img" :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe>
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
      <div class="see-more" @click="gengduonan">查看更多></div>
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
      <div class="see-more" @click="gengduonv">查看更多></div>
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
     jianan:10,
     jianv:10,
         maleList: [],
        femaleList: [],
        a: ""
    };
  },
  created() {
    this.rink()
    // this.go()
    
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
                this.maleList =res.data.ranking.books.slice(0, 10)
                // Indicator.close()
            }
          }, 
            err => {
            alert(err);
            }
        );
        getRank('54d43437d47d13ff21cad58b').then(res => {
            if (res.data.ok) {
                this.femaleList =res.data.ranking.books.slice(0, 10)
                // Indicator.close()
            }
          }, 
            err => {
            alert(err);
            }
        );
      },
       gengduonan(){
         
        getRank('54d42d92321052167dfb75e3').then(res => {

            if (res.data.ok) {
                this.maleList.push(...res.data.ranking.books.slice(this.jia,(this.jianan+10)))
               console.log(this.maleList,'QAQ');
                // Indicator.close()
            }
            this.jianan+=10
          }, 
            err => {
            alert(err);
            }
        );
      },
       gengduonv(){
         
        getRank('54d43437d47d13ff21cad58b').then(res => {

            if (res.data.ok) {
                this.femaleList.push(...res.data.ranking.books.slice(this.jianv,(this.jianv+10)))
               console.log(this.femaleList,'QAQ');
                // Indicator.close()
            }
            this.jianv+=10
          }, 
            err => {
            alert(err);
            }
        );
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

</style>