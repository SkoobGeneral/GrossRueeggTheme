<template>
	<transition name="fade" v-if="state">
	  <!--<div class="overlay"></div>-->
	</transition>
</template>

<script>
export default {
  props: [ "state" ]
}
</script>
<style lang="scss" scoped>
	.overlay {
		position: absolute;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		background: white;
	}

</style>