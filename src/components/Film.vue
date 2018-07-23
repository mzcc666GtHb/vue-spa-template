<template>
  <div>
    <button @click="getFilm">正在热映</button>
    <div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "Film",
    methods: {
      getFilm() {
        this.$http['filmList/in_theaters']({
          name:123,
          age:12312
        },{
          headers:{
            'adfa':'123123'
          }
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
