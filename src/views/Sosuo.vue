<template>
  <div class="s">
    <Logo :logo="major"></Logo>
    <div class="search">
      <div class="search-con">
        <div class="ic"></div>
        <input type="text" placeholder="QAQ" class="input" @input="suo" v-model="search">
        <div class="ca"></div>        
      </div>
      <div class="search-btn" @click="gorun(search)">
        /确定/
      </div>

    </div>
    <div class="tag">
      <div @click="huan">换一批</div>
      <ul>
        <li v-for="(item, index) in label" :key="index">
          {{item.word}}
        </li>
      </ul>
    </div>
    <div class="letters">
      <ul>
        <li v-for="(le, index) in letter" :key="index">
          {{le}}
        </li>
      </ul>
    </div>
  </div>
  
</template>
<script type="text/javascript">
  import {getSearchHotwords,getSupplement} from '../api/api'
  import Logo from "../components/Logo";
  export default {
    name: "",
    props: {
    },
    data() {
      return {
        label:"",  
        h:10,   
        search:"" ,
        letter:"",
        major:"搜索"
      }
    },
    created() {
      this. sou()
    },
    computed:{
      
    },
    methods: {
      sou(){
        getSearchHotwords().then(res => {
          this.label=res.data.searchHotWords.slice(0,10)
          }, 
            err => {
            alert(err);
            }
        );
      },
      huan(){
        getSearchHotwords().then(res => {
           this.label=res.data.searchHotWords.slice(this.h,(this.h+10))
            this.h+=10
            if (this.h==res.data.searchHotWords.length) {
              this.h=0
            }
          }, 
            err => {
            alert(err);
            }
        );
      },
      suo(){
          if (this.search==""||this.search==undefined) {
          console.log('没有');
            return
          }
          // console.log(this.search,'!!!');book/auto-complete?query=斗
          // const url=`/api/book/auto-complete?query=${this.search}`
          // this.axios.get(url).then(res => {
           getSupplement({query:this.search}).then(res => {
             this.letter=res.data.keywords
          }, 
            err => {
            alert(err);
            }
        );
      },
      gorun(search){        
        let o=search
        console.log(o,'ale');
       this.$router.push({
         
            path: `/gorun`,
             query: {txt: o}
          });
      },
    },
    components:{
      Logo
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.s{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  // .readSet-item{
  //     position: relative;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 2.5rem;
  //     box-sizing: border-box;
  //     padding: 0.6rem 0.6rem;
  //     overflow: hidden;
  //     display: flex;
  //   background-color: rgba(50,51,52,.9);
  //     color: #fff;
  //     div{
  //       display: inline-block;
  //       flex: 1;
  //     }
  //     div:nth-child(2) {
  //       padding: 0;
  //       font-size: 15px;
  //       font-weight: 700;
  //       text-align: center;
  //       line-height: 1.3rem;
  //     }
      

  // }
  .search{
    position: relative;
    display: flex;
    margin-bottom: 1rem;
    padding: 1rem 1rem 0rem 1rem;
    .search-con{
      flex: 5;
        border: 1px solid #d6d6d6;
        padding: 0 1rem;
        overflow: hidden;
        border-radius: 3rem;
        background-color: #ebebf0;
        display: flex;
        align-items: center;
        .ic{
          width: 1.5rem;
          height: 1.5rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAvCAMAAACWqWnGAAAAZlBMVEXs6/GJiI7o5+3i4eeMi5Hq6e/W1dve3eOSkZeQj5WenaOamZ/OzdO9vMK2tbutrLKWlZvGxcvCwce/vsS4t72zsridnKKOjZPk4+nR0NbIx83b2uDLytC7usCysbeqqa+ko6mhoKaCxcZ5AAABR0lEQVRIx+2U3XqDIAyGCaBoUay/1daqvf+b3IJ77DoTNnfc75D4EvLzKd76Lpm1XQpwsUXZ/wnomxQ26cL8TpQr8ISaKAxEBex0UkFiAVTiBiOlGVwCqHOImfGLtJZbI2r/TCtZotq/Q53wrOAIpZH4caP0zMAgLZahdhdhQR0zQUxS7s9HTBOTyBULpYZgPwMTieBIciqQY6NJxHL5Y3wZ2WcsRZGdRORGRdi7IrZ+YLOwSBKshTTBI9QxTVqgwV5yc1kEm7+kRwyVIGX5HdNKMBvDbvLEedJHu1e/dN517J/GXHy8erqySgFVC1aZXr3fZuj9rE1g1SUOMoTCTHzefe1P9MAz0r0mmo2ynskEL3XfMqUT7nzfeWYUIZkxd66+3qKvzA9gNoOXXDxTHWGiOTCf8P/9Lo6oPY6gnxpxULkTb/1XH5t/C5iviG3nAAAAAElFTkSuQmCC)no-repeat;
          background-size: contain;
        }
        .input{
          line-height: 2.5rem;
          font-size: 0.6rem;
          padding: 0 0 0 10px;
          width: 100%;
          box-sizing: border-box;
        background-color: #ebebf0;
          border: 0px;outline:none;cursor: pointer;
        }  
        .ca{
          width: 1.5rem;
          height: 1.5rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAb1BMVEUAAACEg4mAgIuEg4mEg4mGhoaEg4mDgoqFhYuFg4mDg4mEg4mEg4mEg4mEg4mFg4mEgoqEg4mEhImEg4mEg4mEg4mEhImFgYmCgoyEg4mEg4mEg4mFg4iFg4mEhImEhIqEhIiEg4qDg4iGhoaEg4m0/nsGAAAAJHRSTlMA6xX50gexHC3kifLn4c5eRPXbyKqBOCQM1KCYkXhyUDxsZyjKUJg7AAAA+klEQVQoz32SW7KCMAxAQ3kXKG8REVFv9r/Gq6SThgE8X52eJmmagqPqO5NlY6QX2PMIkGn661ZWDW7wSml73DE5e8cDouNY5kb2iSdQ/RzP+N7/bZvRBVp83dLi/tF2dwaVWptAhUTIlZsYVGFt2HJ1zS8Rr/H+BcLANdeh9D4mwmIABqVPntKiJ9paE8NQoKMGDwUVwF+90Wsq7kgNoHKZPJKpw9SPIU55awTNlu7sfeLZR/xAOVnqb0TizROZyZK/uJnMtDIvwxd6RWLiGZ6hvno5sw/+aj8/W3dkW2Cm41im9PZ1JUqLA/U0gIW5Lre2yLLUdKXizX8DsVTrf3yRBwAAAABJRU5ErkJggg==);
          background-size: contain;
        }
    }
    .search-btn{
        flex: 1;
        color: #000;
        line-height: 2.5rem;
        text-align: center;
    }
        
  }
  .tag{
    width: 100%;
    box-sizing: border-box;
  padding: 1rem 1rem 0rem 1rem;
    ul{
      display: flex;
      flex-wrap: wrap;
      padding-top: 1rem;
      li{
        // width:6rem;
        height: 1.6rem;
        margin: 0 0.5rem;
        padding: 0 1rem;
        border-radius: 1.6rem;
        font-size: 15px;
        line-height: 1.6rem;
        border: 1px solid #ebebeb;
      }
    }
  }
  .letters{
    position: relative;
    top: -8rem;
    left: 0;
    width: 100%;
    // height: 100%;
    box-sizing: border-box;
    padding-left: 2rem;
    background: #fff;
    ul{
      list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWBAMAAADdrcoLAAAAJFBMVEX///++vr7y8vLu7u7Dw8Pk5OTe3t719fXa2trs7OzPz8/Hx8dTXNRiAAAAP0lEQVQY02MgHXAIAoEYhM0YACRWQNmCIOAAYQcbGxubCkDYCkCCCcpWd3HxZsIq7smAJE42OxlhLxvCPYQBAECeCDq7BiEBAAAAAElFTkSuQmCC);
      li{
        max-width: 90%;
        height: 3.6rem;
        line-height: 3.6rem;
        font-size: 1.2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
    
// .s{
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
//   position: relative;
//   padding: 1rem 1rem 0rem 1rem;
//   .sou{
//     width: 100%;
//     height: 3rem;
//     padding: 0 1rem;
//     display: flex;
//         align-items: center;
//             border-radius: 3rem;
//       background: #ECEBF1;
//     .ic{
//       width: 1.5rem;
//       height: 1.5rem;
//       background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAvCAMAAACWqWnGAAAAZlBMVEXs6/GJiI7o5+3i4eeMi5Hq6e/W1dve3eOSkZeQj5WenaOamZ/OzdO9vMK2tbutrLKWlZvGxcvCwce/vsS4t72zsridnKKOjZPk4+nR0NbIx83b2uDLytC7usCysbeqqa+ko6mhoKaCxcZ5AAABR0lEQVRIx+2U3XqDIAyGCaBoUay/1daqvf+b3IJ77DoTNnfc75D4EvLzKd76Lpm1XQpwsUXZ/wnomxQ26cL8TpQr8ISaKAxEBex0UkFiAVTiBiOlGVwCqHOImfGLtJZbI2r/TCtZotq/Q53wrOAIpZH4caP0zMAgLZahdhdhQR0zQUxS7s9HTBOTyBULpYZgPwMTieBIciqQY6NJxHL5Y3wZ2WcsRZGdRORGRdi7IrZ+YLOwSBKshTTBI9QxTVqgwV5yc1kEm7+kRwyVIGX5HdNKMBvDbvLEedJHu1e/dN517J/GXHy8erqySgFVC1aZXr3fZuj9rE1g1SUOMoTCTHzefe1P9MAz0r0mmo2ynskEL3XfMqUT7nzfeWYUIZkxd66+3qKvzA9gNoOXXDxTHWGiOTCf8P/9Lo6oPY6gnxpxULkTb/1XH5t/C5iviG3nAAAAAElFTkSuQmCC) no-repeat;
//       background-size: contain;
//     }
//     .sear{
//       position: absolute;
//       left: 1.5rem;
//       flex: 3;
//       // width: 16rem;
//       padding-left: 2rem;
//       input{
//         // width: 100%;
//         font-size: 1.1em;
//       background: #ECEBF1;
//       }
//     }
//     .s-txt{
//       flex: 1;
//     }
//   }
// }
//  input{font-size: 30px;}
</style>