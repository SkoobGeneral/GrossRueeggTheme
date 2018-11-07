<template>
    <footer class="footer" style="position: relative;">
        <b-img class="mt-3" style="position: absolute; top:40px; right: 0; height: 120px; z-index: 1;" src="/wp-content/uploads/2018/10/bar.png" />
    	<div class="columns container is-mobile">
    		<div class="column ">
    			<p class="title is-6">FIRMENSITZ</p>
    			<p>
    				Marcus Gross & Werner Rüegg<br>Dipl. Architekten FH/SIA AG<br>Promenada 1<br>CH-7018 Flims Waldhaus
    			</p>
    		</div>
    		<div class="column">
    			<p class="title is-6">FILIALE</p>
    			<p>
    				Marcus Gross & Werner Rüegg<br>Dipl. Architekten FH/SIA AG<br>Salisstrasse 14<br>7000 Chur
    			</p>
    		</div>
    		<div class="column">
    			<p style="margin-top: 18px;">
    				<br>Telefon +41 (0)81 635 16 18<br>E-Mail info@gross-rueegg.ch
    			</p>
    		</div>
    	</div>
    </footer>
</template>

<style lang="scss">
  footer {
  	font-weight: 100;
		color: #dadada !important;
		background: #2b2e34 !important;
		& .title {
			color: #ee6c40 !important;
		}
  }
  @media only screen and (max-width: 425px) {
    footer .columns {
    	display: block !important;
    }
}
</style>