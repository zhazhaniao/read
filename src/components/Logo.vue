<template>
 <div class="name">
        <div class="icon-arrow-left2" @click="fanhui">返回</div>
        <div class="logo">{{logo}}</div>
        <div class>
          <span class="icon"></span>
        </div>
      </div>
</template>
<script type="text/javascript">
  export default {
    name: "Logo",
    props: {
      logo:'',
      // brief:{},
    },
    data() {
        return {
      
        }
    },
    created() {
    },
    computed:{
      
    },
    methods: {
      fanhui() {
      this.$router.go(-1);
    }
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.name {
  // position: relative;
  // width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  overflow: hidden;
  display: flex;
  background: #000;
  color: #fff;
}
.name > div {
  display: inline-block;
  flex: 1;
  // float: left;
}
.name > div:nth-child(1) {
  margin: 0.6rem 0rem 0.6rem 0;
}
.name > div:nth-child(2) {
  padding: 0;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}
.icon {
  width: 1.3rem;
  height: 1.3rem;
  float: right;
  margin: 0.6rem 0.6rem 0.6rem 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC5UlEQVR4Xu2a0XHbMAyGgcp3vd6llnlnv3cEd4ImG8QT1J4gyQbZoO4EUSZINkg6QT1C3q0eLbePdtCTnaSuI8UkRFK6E/xMUMBH8AcEC6HlP2x5/CAAJANaTkCuQMsTQESw1iuQZtlVnoH9OJ7UlYm1ANCaemvMg8fTbeB0G1E8UQoXoUEEB5AHv8LsDgGHu8ES0KxD8UloCEEBaP1nuMbVHQD2ik+aFhF1TpQ6moXKhGAAUr08BXzM074k+OeQaUEUjQbq430ICEEApHo5BqSN4Bn/CCd91U2M1zMXegewUXqCMcc/QpgO4viCY2tq4w3ARunfLb9xg38JACGJHrsXvsTRC4AypTc9lf11PiuEcwBPSn8DgJ+4AZdUiIeIOiPXFcIpAHOl56JxXyGcAWApPZuDuwrhBEAVpeczcFMhKgF43dNzw2HaOagQbACulZ6JAKpWCBaAwz09NxyuHbErhDUA/0rPhsB6h7AC8CvLzohgynUxiJ3lO4QxgDqUng0MITGdMh0E8KT0eWd3zHaoFkOzKdObAHKxW+Hqan96U0s8jIduK8T7kVIfHsrMSwHM9e9jxHV+8gcGGAzPgpq8PWUqBNC8MleVWDmEQgCpzqaAcFb1sY2yJ/jeV/H5vk8CoOiUtldg/bNRJ1jRmYiiz0WzhFIR3ECA9ZiA/pvf534gwBAQ44o+uTUnygjg1TgdAWcRREnZIOVgH1Dk5Vwv7hHxi9sIqu1GRD8GqmfdqwgADnfJALkCogEiglIFbMtgSZ0uEmFOn9H4MmjjIKfK2Oy/Cz1YH2DjoABglFkbwJIBOwTkCoRqhW1SVDRANMC+1bbJMBFBEcF/BFhVINVZAghfrQSU4LqvYqPP5XzvX/kKsD6HIRz1VffWBNr2H2i6MVn7ssZi/8oA8g3mOrtEoPODw9HNSxBOByq+tAnI9/7PvrCugE0gTV8rAJp+Qr79kwzwTbjp+0sGNP2EfPvX+gz4C7tCBl+8koA6AAAAAElFTkSuQmCC)
    no-repeat;
  background-size: 100%;
}
</style>