<template>
  <div id="app">
    
    <Header></Header>
     <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    
  </div>
</template>
<script>
import Header from './components/Header'
export default {
  
    data() {
        return {
      
        }
    },
    created() {
      
    },
    computed:{
      
    },
    methods: {
      
    },
    components:{
      Header
    },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

</style>
