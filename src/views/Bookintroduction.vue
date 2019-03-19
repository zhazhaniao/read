<template>
  <!--  @click="goBooks(book._id)" -->
  <div class="book">
    <Logo :logo="shu"></Logo>
    <div>
      <div class="list">
        <div class="cover">
          <img class="auto-img" :src="lianjie+fiction.cover" alt>
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
      <div class="introduction">
        <div class="txt">{{fiction.longIntro}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Logo from "../components/Logo";
import { log } from 'util';
export default {
  // name: "ImgWrapper",
  props: {},
  data() {
    return {
      shu: "书籍详情",
      lianjie: "http://statics.zhuishushenqi.com",
      bookid: "",
      fiction: "",
      upDate: "",
      flag: false
    };
  },
  created() {
    this.bookid = this.$route.query.id;
    const url = `/api/book/${this.bookid}`;
    this.axios.get(url).then(
      response => {
        this.fiction = response.data;
        this.upDate = this._time(response.data.updated);
        // console.log(response.data.updated, "QAQ");
      },
      err => {
        alert(err);
      }
    );
  },
  computed: {},
  methods: {
    goReadBooks(fiction) {
      let title=fiction.title
      let id=fiction._id
      // console.log(title);
      
      this.$router.push({
            path: `/looking/${title}`,
             query: {id:id}
          });
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
}
.list {
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  padding: 1rem;
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
  height: 7rem;
  border-bottom: 1px solid #ebebeb;
  position: relative;
  overflow: auto;
  .txt{
    position: absolute;
  padding: 1rem;
    box-sizing: border-box;
  font-size: 13px;
  color: #999;
  line-height: 1.8rem;
  text-align: justify;
  }
}
</style>