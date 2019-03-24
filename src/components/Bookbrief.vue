<template>
<!-- 书籍简介组件 -->
 <li class="list" @click="goBooks(book._id)">
          <div class="cover">
            <img class="auto-img" :src="lianjie+book.cover" alt="">
          </div>
          <div class="detail">
            <h3 class="bookname">{{book.title}}</h3>
            <div class="writer">
                <span class=""> {{book.author}} </span>
                <span class="split"> | </span>
                <span class=""> {{book.minorCate}} </span>
                </div>
            <div class="desc">{{book.shortIntro}}</div>
            <div class="desc">
        <span class="c-rq"> {{latelyFollower}}万</span>人气
        <span class="split"> | </span>
        <span class="c-rq">{{book.retentionRatio}}%</span>读者收藏
            </div>
      
          </div>
        
      </li>
</template>
<script type="text/javascript">
  export default {
    name: "Bookbrief",
    props: {
      book:{},
    },
    data() {
        return {
       lianjie: "http://statics.zhuishushenqi.com"
        }
    },
    created() {
      
    },
    computed:{
      latelyFollower () {
        return (this.book.latelyFollower / 10000).toFixed(2)
      },
    },
    methods: {
      goBooks(_id){
        // if (this.isLoadMore) {
        //   return
        // }
        // if (this.isBookList) {
        //   this.$router.push({
        //     path: `/bookLists/${id}`
        //   });
        // } else {
          
          this.$router.push({
            path: `/book/${_id}`,
             query: {id: _id}
          });
        // }
      },
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.list {
  //  height: 6rem;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  padding: 1rem 1rem 1rem 0;
  // border-bottom: 1px solid rgb(206, 206, 206);
      border-bottom: 0.013333rem solid #f5f5f5;
  .cover {
    float: left;
    width: 3.6rem;
    height: 4.8rem;
    margin-right: 1rem;
  }
  .detail{
    height: 100%;
    div{
      font-size: 13px;
      line-height: 1.2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #666;

    }
    .bookname{
        font-weight: 800;
          font-size: 14px; /* no*/
          line-height: 1.2rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
    }
    .desc{
      font-size: 12px;
      .c-rq{
        color: #f00;
      }
    }
  }
}


</style>