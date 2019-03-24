<template>
  
     <div class="rank-wrapper">
      <div class="rank-section">
        <div class="txt">男生</div>
        <div class="rank-item" v-for="(item, index) in maleRank" :key="index" @click="goRankDetail(item)">
          <div class="cover">
            <img class="auto-img" :src="lj+item.cover" alt="">
          </div>
          <span>{{item.title}}</span>
        </div>

      </div>
      <div class="rank-section">
        <div class="txt">女生</div>
        <div class="rank-item" v-for="(item, index) in femaleRank" :key="index" @click="goRankDetail(item)">
         <div class="cover">
            <img class="auto-img" :src="lj+item.cover" alt="">
          </div>
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
  
</template>
<script type="text/javascript">
  import {getRankCategory} from '../api/api'
  export default {
    name: "",
    props: {
      
    },
    data() {
        return {
       lj: 'http://statics.zhuishushenqi.com/',
        femaleRank: [],
        maleRank: []
        }
    },
    created() {
      this.getRanking()
    },
    computed:{
      
    },
    methods: {
      getRanking(){
        //   const src=`/api/cats/lv2/statistics`
      getRankCategory().then((res) => {
          if (res.data.ok) {
            this.femaleRank = res.data.female.slice(0, 7);
            this.maleRank = res.data.male.slice(0, 7)
          }
          }, 
            err => {
            alert(err);
            }
        );
      },
      goRankDetail(item){
        this.$router.push({//传递周,月,总榜的id
          path: `/ranking/${item._id}`,
          query: {title: item.title,
                  weekid:item._id,//周榜
                  monthid:item.monthRank,//月榜
                  totalid:item.totalRank,//总榜
                  }
        });
        //  this.$router.push({
        //     path: `/Lookingbook/${title}`,
        //      query: {id:id}
        //   });
        // this.setRank(item)
        // console.log(item);
        
      },
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
 .txt{
     line-height: 3.6rem;
     padding: 0 0.6rem;
     color: #666;
     font-weight: normal;
     background: #e6e6e6;
 }
 .rank-item{
        display: flex;
        height: 4rem;
        align-items: center;
        padding-left: 0.5rem;
        .cover{
          width: 2rem;
          height: 2rem;
        }
        span{
          flex: 1;
          margin-left: 0.5rem;
          line-height: 3rem;
          font-size: 14px;
          border-bottom: 1px solid #f5f5f5;
          padding: 0.5rem 0;
          box-sizing: content-box;
          }
}
</style>