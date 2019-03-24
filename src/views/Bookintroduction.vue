<template>
  <!--  @click="goBooks(book._id)" -->
  <div class="book">
    <div class="navgation">
      <Logo :logo="shu"></Logo>
    </div>
    <div class="content">
      <div class="content-list">
        <div class="list">
          <div class="cover">
            <img class="auto-img" :src="_unEscape(fiction.cover)" alt="">
          </div>
          <div class="detail">
            <h3 class="bookname">{{fiction.title}}</h3>
            <div class="writer">
              <span class>{{fiction.author}}</span>
              <span class="split">|</span>
              <span class>{{fiction.minorCate}}</span>
            </div>
            <div class="desc">{{fiction.shortIntro}}</div>
            <div class="lastTime">{{isSerial? upDate <= 0 ? '刚刚更新' : `${upDate}小时前更新`:'完了'}}</div>
          </div>
        </div>
        <div class="reader-data">
          <p class="item">
            <span class="key">追人气</span>
            <span>{{latelyFollower(fiction.latelyFollower) || 0}}万</span>
          </p>
          <p class="item">
            <span class="key">读者存留率</span>
            <span>{{fiction.retentionRatio || 0}}%</span>
          </p>
          <p class="item">
            <span class="key">日更字数/天</span>
            <span>{{fiction.serializeWordCount || 0}}</span>
          </p>
        </div>
        <!-- <div class="read-link" v-show="fiction.title">
          <div class="sj" @click="setBookLocalStorage()">{{flag ? '不追了' : '追更新'}}</div>
          <div class="read" @click="goReadBooks(fiction)">开始阅读</div>
        </div> -->
        <div class="introduction" ref="wenzi">
          {{fiction.longIntro}}
         <div class="btm" @click="txts()" :class="[t?'icon-point-down':'icon-point-up']"
         >更多</div> 
        </div> 
        <div class="comment">
          <p class="comment-title">热门评论</p>
          <ul>
            <li v-for="(item, index) in comments" :key="index" class="comment-list">
              <!-- <div class="inner"> -->
                <div class="cover">
                  <img class="auto-img" :src="img+item.author.avatar" alt="">
                </div>
                <div class="right">
                  <p class="name">{{item.author.nickname}}</p>
                  <p class="title">{{item.title}}</p>
                  <p class="content">{{item.content}}</p>
                  <p>
                    {{item.updated}}
                  </p>
                </div>
              <!-- </div> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
     
   
  </div>
</template>
<script type="text/javascript">
import Logo from "../components/Logo";
import { log } from 'util';
import {bookComments} from '../api/api.js'
export default {
  // name: "ImgWrapper",
  props: {},
  data() {
    return {
      shu: "书籍详情",
      img: 'http://statics.zhuishushenqi.com/',
      // lj: 'http://statics.zhuishushenqi.com/',
      bookid: "",
      fiction: "",
      upDate: "",
      isSerial:"",//是否完结
      flag: false,
      t:true,
      comments:"",//书评
      ping:""
    };
  },
  created() {
    this.bookid = this.$route.query.id;
    const url = `/api/book/${this.bookid}`;
    this.axios.get(url).then(
      response => {
        this.fiction = response.data;
        this.upDate = this._time(response.data.updated);
        this.isSerial=response.data.isSerial;
        console.log(response.data, "QAQ");
      },
      err => {
        alert(err);
      }
    );
    this.getbookComments()
  },
  computed: {

  },
  methods: {
    goReadBooks(fiction) {
      let title=fiction.title
      let id=fiction._id
      // console.log(title);
      
      this.$router.push({
            path: `/Lookingbook/${title}`,
             query: {id:id}
          });
    },
      _unEscape(str){
        str = unescape(str).replace("/agent/", "")
        return str
      },
    _time(time){
        let currentTime = Math.round(new Date() / 1000);
        this.upDate = time.replace("T", ' ').replace("Z", ' ');
        this.upDate = Date.parse(new Date(this.upDate)) / 1000;
        return Math.floor((currentTime - this.upDate) % 86400 / 3600)
      },
    latelyFollower(lately) {
      if (lately > 10000) {
        return (lately / 10000).toFixed(1);
      } else {
        return lately;
      }
    },
    latelyCount(count) {
      if (count > 10000) {
        return (count / 10000).toFixed() + "万字";
      } else {
        return count + "字";
      }
    },
    txts(){
      this.t=!this.t
      if (!this.t) {
        // this.$refs.wenzi.style
        this.$refs.wenzi.style.webkitLineClamp=999
        // this
        console.log(this.$refs.wenzi.innerText,'false了');
      }else{
        this.$refs.wenzi.style.webkitLineClamp=''
      }
    },
    getbookComments(){
      bookComments(this.bookid).then((res) => {
        if (res.data.ok) {
          this.comments = res.data.reviews
          this.ping=this.comments.updated
          console.log( res.data.reviews[0].updated,'2333');
          // .replace("T", '日 ').replace("Z", ' ');
        }
      });
    }
  },
  components: {
    Logo
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.book {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  .navgation{
    position: relative;
    top: 0;
    left: 0;  
    }
  .content{
    position: relative;
    // bottom: 0;
    // left: 0;
    width: 100%;
    height: 96vh;
   
    background: #fff;
    .content-list{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 0.5rem;
      overflow: auto;
      .list {
        width: 100%;
        display: inline-block;
        box-sizing: border-box;
        padding: 1rem 0;
        .cover {
          float: left;
          width: 4.1rem;
          height: 5.5rem;
          margin-right: 1rem;
        }
        .detail {
          height: 100%;
          div {
            font-size: 13px;
            line-height: 2rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #666;
          }
          .bookname {
            font-weight: 700;
            font-size: 15px; /* no*/
            line-height: 1.5rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
      .reader-data {
        padding: 1rem 0;
        border-bottom: 1px solid #ebebeb;
        box-sizing: border-box;
        font-size: 0;
        .item {
          display: inline-block;
          width: 33.33%;
          text-align: center;
          vertical-align: middle;
        }
        span {
          font-size: 16px;
          /* no*/
        }
        .key {
          display: block;
          font-size: 12px; /* no*/
          color: #999;
          margin-bottom: 20px;
        }
      }
      .introduction{
        width: 100%;
        padding: 0.5rem 0 1.5rem 0;
        box-sizing: border-box;
        font-size: 13px;
        color: #999;
        line-height: 40px;
        text-indent: 2em;
        overflow: hidden;
        text-align: justify;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        border-bottom: 1px solid #ebebeb; 
        position: relative;
        .btm{
          position: absolute;
          right: 0;
          bottom: 0;
          line-height: 1.5rem;
          z-index: 20;
        }
      } 
      .comment{
        width: 100%;
        .comment-title{
          height: 3rem;
          line-height: 3rem;
        }
        .comment-list{
          display: flex;
        // align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #ebebeb;
          .cover{
            width: 3rem;
            height: 3rem;
            img{
              border-radius: 50%;
            }
          }
          .right{
            flex: 1;
            margin-left: 0.5rem;
            font-size: 14px;
            padding: 0 0.5rem 0 0;
            box-sizing: content-box;
            .name{
              font-size: 12px;
              color: #999;
              height: 1rem;
            }
            .title{
              font-size: 14px;
              font-weight: 600;
              height: 30px ; 
            }
            .content{
              height: 3rem;
              word-break: break-word;
              overflow: hidden;
              line-height: 1.5rem;
              text-align: justify;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp:2;
              -webkit-box-orient: vertical;
              color: #999;
            }
          }
        }
      }
    }
  }
}
.read-link {
  display: flex;
  padding: 0 30px 30px 30px;
  font-size: 18px;
  border-bottom: 1px solid #ebebeb;
  div {
    flex: 1;
    text-align: center;
    height: 3rem;
    line-height: 3rem;
  }
  .sj {
    border: 1px solid #000;
    color: #000;
    box-sizing: border-box;
    margin-right: 10px;
  }
  .read {
    background: #000;
    color: #fff;
    margin-left: 10px;
  }
}
</style>
<div class="list">
.inner{
            display: flex;
            position: relative;
            .cover{
              // flex: 1;
              position: absolute;
              width: 3rem;
              height: 3rem;
              // margin-right: 1rem;
              // background: #000;
              img{
                border-radius: 50%;
              }
            }
            .right{
              padding: 0 30px 0 80px;
            .name{
              font-size:12px;
              color: #999;
              height: 1rem;
            }
              
            .title{
              font-size: 14px;
              font-weight: 600;
              height: 1rem;
            }
              
            .content{
              height: 1.06667rem;
              overflow: hidden;
              line-height: .53333rem;
              text-align: justify;
              color: #999;
            }
             
            }
          }
        <div class="cover">
          <img class="auto-img" :src="_unEscape(fiction.cover)" alt="">
        </div>
        <div class="detail">
          <h3 class="bookname">{{fiction.title}}</h3>
          <div class="writer">
            <span class>{{fiction.author}}</span>
            <span class="split">|</span>
            <span class>{{fiction.minorCate}}</span>
          </div>
          <div class="desc">{{fiction.shortIntro}}</div>
          <div class="lastTime">{{upDate <= 0 ? '刚刚更新' : `${upDate}小时前更新`}}</div>
        </div>
      </div>
      <div class="read-link" v-show="fiction.title">
        <div class="sj" @click="setBookLocalStorage()">{{flag ? '不追了' : '追更新'}}</div>
        <div class="read" @click="goReadBooks(fiction)">开始阅读</div>
      </div>
      <div class="reader-data">
        <p class="item">
          <span class="key">追人气</span>
          <span>{{latelyFollower(fiction.latelyFollower) || 0}}万</span>
        </p>
        <p class="item">
          <span class="key">读者存留率</span>
          <span>{{fiction.retentionRatio || 0}}%</span>
        </p>
        <p class="item">
          <span class="key">日更字数/天</span>
          <span>{{fiction.serializeWordCount || 0}}</span>
        </p>
      </div>