<template>
    <div>
        <div class="books">
            <div class="title">
                VIP精选
                <i class="tip"></i>
            </div>
            <div class="book-list">
                <ul>
                <Bookbrief :book="look" v-for="(look, index) in vipbooks" :key="index"></Bookbrief>
                <!-- <li v-for="(book, index) in femaleList" :key="index"></li> -->
                </ul>
            </div>
            <div class="see-more" @click="gengduo">查看更多></div>
        </div>
    </div>
</template>
<script type="text/javascript">
  import {getRankCategory,getRank} from '../api/api'
  import Bookbrief from "../components/Bookbrief";
  export default {
    name: "",
    props: {
      
    },
    data() {
        return {
           epub:"",
          //  vipId:"",
        vipbooks:"",
        jia:10,
        }
    },
    created() {
      this.vipbook()
    },
    computed:{
      
    },
    methods: {
      vipbook(){
        getRankCategory().then((res) => {
            if (res.data.ok) {
                this.vipId = res.data.epub[2]._id
               console.log(this.vipId,'2333');
               this.vbookrank()
                }
        }, 
        err => {
            alert(err);
        }
        );
      },
      vbookrank(){
          getRank(this.vipId).then(res => {
            if (res.data.ok) {
                this.vipbooks =res.data.ranking.books.slice(0, this.jia)
               console.log(this.vipbooks,'QAQ');
                // Indicator.close()
            }
          }, 
            err => {
            alert(err);
            }
        );
      },
      gengduo(){
        getRank(this.vipId).then(res => {

            if (res.data.ok) {
                this.vipbooks.push(...res.data.ranking.books.slice(this.jia,(this.jia+10)))
               console.log(this.jia+10,'QAQ');
                // Indicator.close()
            }
            this.jia+=10
          }, 
            err => {
            alert(err);
            }
        );
      }
    },
    components:{
      Bookbrief
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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