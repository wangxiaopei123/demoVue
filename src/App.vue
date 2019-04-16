<template>
  <div id="app">
		<router-view v-if="isActive"></router-view>
		<v-footer></v-footer>
  </div>

</template>

<script>
import Footer from './views/frame/Footer'
export default {
    provide(){
        return{
            reload:this.reload
        }

    },
	components: {
        'v-footer':Footer
  },
    data(){
        return{
            isActive:true
        }

    },
  methods: {
      reload(){
          this.isActive = false;
          this.$nextTick(function () {
              this.isActive = true;
          })
      },
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style>
	@import "styles/common.css";
</style>
