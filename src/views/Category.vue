<template>
  <div class="category">
    <div class="fenlei">
      <h1 class="sex">男生</h1>
      <div class="list">
        <div
          class="category-list"
          v-for="(sortlist, id) in malelist"
          :key="id+'boy'"
          @click="boy(sortlist,id)"
        >
          <div class="name">
            <div class="ming">{{sortlist.name}}</div>
            <div class="text">{{sortlist.bookCount}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fenlei">
      <h1 class="sex">女生</h1>
      <div class="list">
        <div
          class="category-list"
          v-for="(sortlist, id) in femalelist"
          :key="id+'girl'"
          @click="girl(sortlist,id)"
        >
          <div class="name">
            <div class="ming">{{sortlist.name}}</div>
            <div class="text">{{sortlist.bookCount}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fenlei">
      <h1 class="sex">漫画</h1>
      <div class="list">
        <div
          class="category-list"
          v-for="(sortlist, id) in picturelist"
          :key="id+'comic'"
          @click="comic(sortlist,id)"
        >
          <div class="name">
            <div class="ming">{{sortlist.name}}</div>
            <div class="text">{{sortlist.bookCount}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fenlei">
      <h1 class="sex">出版</h1>
      <div class="list">
        <div
          class="category-list"
          v-for="(sortlist, id) in presslist"
          :key="id+'press'"
          @click="press(sortlist,id)"
        >
          <div class="name">
            <div class="ming">{{sortlist.name}}</div>
            <div class="text">{{sortlist.bookCount}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
// import {getCategoryInfo} from '../api/api'

export default {
  // name: "ImgWrapper",
  props: {},
  data() {
    return {
      malelist: {},
      femalelist: {},
      picturelist: {},
      presslist: {}
    };
  },
  created() {
    const url = "/api/cats/lv2/statistics";
    this.axios.get(url).then(
      response => {
        this.malelist = response.data.male;
        this.femalelist = response.data.female;
        this.picturelist = response.data.picture;
        this.presslist = response.data.press;
        // console.log(response.data);
      },
      err => {
        alert(err);
      }
    );
  },
  computed: {},
  methods: {
    boy(sortlist, id) {
      let name = sortlist.name;
      this.$router.push({
        path: `/bookshelf`,
        query: {
          major: name,
          id,
          gender: "male",
          type: "hot",
          start: "0",
          limit: "20"
        }
      });
    },
    girl(sortlist, id) {
      let name = sortlist.name;
      this.$router.push({
        path: `/bookshelf`,
        query: {
          id,
          gender: "female",
          type: "hot",
          major: name,
          start: "0",
          limit: "20"
        }
      });
    },
    comic(sortlist, id) {
      let name = sortlist.name;
      this.$router.push({
        path: `recommend`,
        query: {
          id,
          gender: "picture",
          type: "hot",
          major: name,
          start: "0",
          limit: "20"
        }
      });
    },
    press(sortlist, id) {
      let name = sortlist.name;
      this.$router.push({
        path: `recommend`,
        query: {
          id,
          gender: "press",
          type: "hot",
          major: name,
          start: "0",
          limit: "20"
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.sex {
  padding-left: 1rem;
  height: 3.6rem;
  font-size: 12px;
  line-height: 3.6rem;
  color: #999999;
  font-weight: 400;
}

.list {
  overflow: hidden;
}

.category-list {
  width: 33.33%;
  height: 3.7rem;
  padding: 0.6rem;
  box-sizing: border-box;
  border: 1px solid #f8f8f8;
  float: left;
  text-align: center;
}

.name > .ming {
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 15px;
  font-weight: 700;
}

.name > .text {
  line-height: 12px;
  font-size: 12px;
  color: #d6cccc;
}
</style>