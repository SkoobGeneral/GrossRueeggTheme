<template>
    <header class="has-text-right">
    	<router-link to="/">
        <b-img class="logo mt-3" style="position: absolute; right: 0; height: 120px; z-index: 200;" src="/wp-content/uploads/2018/10/logo.png" />
      </router-link>
    </header>    
</template>

<style lang="scss">
	@media only screen and (max-width: 768px) {
	    header .logo {
	    	position: relative !important;
	    }
	}
</style>