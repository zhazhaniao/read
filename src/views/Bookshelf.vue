<template>
<!-- 书类列表页 -->
  <div class="bookbox">
    <div class="nav">
      <Logo :logo="major"></Logo>
      <div v-show="zhan">
        <div>
          <ul class="tybar">
            <li class="tybarlis" v-for="(ty, t) in largeTypes" :key="t"
              @click="typ(ty,t)"
              :class="{'active':t===largeTypeIndex}">
              {{ty.name}}
              </li>
          </ul>
        </div>
        <div class="filter-item">
          <div class="inner">
            <ul>
              <li
                v-for="(minor, f) in leilist"
                :key="f" :class="{'active':f===smallTypeIndex}"
               @click="setSmallType(minor,f)">{{minor}}
                </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="booklis" ref="wu"></div>
    </div>
    <div class="bookcase">
      <Booklist :booklist="looklist" @jiazai="load"></Booklist>
    </div>
  </div>
</template>
<script type="text/javascript">
import Logo from "../components/Logo";
import Booklist from "../components/Booklist";
export default {
  // name: "ImgWrapper",
  props: {},
  data() {
    return {
      suo: false, //默认的导航收缩
      zhan: true, //默认展示的导航
      wu: false, //没请求到信息
      smallTypeIndex: 0, //小类数组下标
      largeTypeIndex: 0, //large数组的下标
      largeTypes: [
        { type: "hot", name: "热门" },
        { type: "new", name: "新书", duration: "all" },
        { type: "reputation", name: "好评" },
        { type: "over", name: "完结" },
        { type: "monthly", name: "包月" }
      ],
      looklist: "",
      topname: "",
      lianjie:"",
      go: "",
      // to:40,
      gender: "", //喜好（男女漫画出版）
      type: "", //情况(热门，完结..)
      major: "", //大类别 从接口1获取
      minor: "", // 小类别 从接口4获取 (非必填)
      // start: "", //分页开始页
      // limit: "", //分页条数
      i: "", //从大类(玄幻..)传过来的下标id
      leilist: ["全部"] //小分类
    };
  },
  created() {
    this.i = this.$route.query.id;
    this.gender = this.$route.query.gender;
    this.type = this.$route.query.type;
    this.major = this.$route.query.major;
    // this.start = this.$route.query.start;
    // this.limit = this.$route.query.limit;
     const url = `/api/book/by-categories?gender=${this.gender}&type=${
        this.type
      }&major=${this.major}&minor=${this.minor}&start=0&limit=20`;

    this.axios.get(url).then(
      response => {
        this.looklist = response.data.books;
        console.log(this.looklist);
      },
      err => {
        alert(err);
      }
    );
    const p = `/api/cats/lv2`;
    let q;
    this.axios.get(p).then(
      res => {
        this.malemins = res.data.male;
        this.femalemins = res.data.female;
        if (this.major == this.malemins[this.i].major) {
          q = this.malemins[this.i].mins;
          this.leilist.push(...q);
        }

        if (this.major == this.femalemins[this.i].major) {
          this.leilist = this.femalemins[this.i].mins;
        }
      },
      err => {
        alert(err);
      }
    );
  },
  computed: {},
  methods: {
    load() {
      setTimeout(() => {
        this.go = this.looklist.length-1;
        let to;
        for (let i = 1; i <= 10; i++) {
          to=this.go + i;
        }
          
         const url = `/api/book/by-categories?gender=${this.gender}&type=${
          this.type
        }&major=${this.major}&minor=&start=${this.go}&limit=${to}`;
        this.axios.get(url).then(
          response => {
            if (response.data.books == '') { 
              this.wu = true;
              return;
            }
            // console.log(response.data.books,'233333');
           
            this.looklist.push(...response.data.books);
          console.log(this.looklist,'QAQ');
            // this.tu+=20
          },
          err => {
            alert(err, "没有啊");
          }
        );
        // this.loading = false;
      }, 100);
    },
   setSmallType(minor, f){

        this.smallTypeIndex = f
      this.minor = minor
    },
    typ(ty, t) {
      this.type = ty.type

      this.largeTypeIndex = t
      const url = `/api/book/by-categories?gender=${this.gender}&type=${
        this.type
      }&major=${this.major}&minor=${this.minor}&start=0&limit=20`;

      this.axios.get(url).then(
        response => {
          // if (response.data.books.length == 0) {
          //   this.wu = true;
          //   return;
          // }

          this.looklist = response.data.books;
        },
        err => {
          alert(err, "没有啊");
        }
      );
    }
  },
  components: {
    Logo,
    Booklist
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.bookbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.nav {
  position: relative;
  top: 0;
  left: 0;
  height: 9rem;
  background: #fff;
}
.tybar {
  height: 3rem;
  color: #666666;
  line-height: 3rem;

  .tybarlis {
    display: inline-block;
    height: 100%;
    padding: 0 0.8rem;
    font-size: 13px;
  }
}
.booklis {
  width: 100%;
  background: #999;
}
.filter-item {
  position: relative;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  overflow: hidden;
  .inner {
    overflow-x: auto;
  }
  .inner ul {
    width: auto;
    height: 100%;
    color: #666;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .inner ul li {
    display: inline-block;
    height: 100%;
    padding: 0 0.26667rem;
    font-size: 13px;
  }
}
.bookcase {
  position: relative;
  bottom: 0;
  left: 0;
  height: 80%;
  // background: rgb(150, 148, 148);
}
.active {
  color: #b93321;
}
</style>