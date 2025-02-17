<template>
	<div class="container-fluid">
		<div class="row">
			<h1>Mushodoro</h1>
			<transition name="bg-fade">
				<div
					id="mushodoro"
					class="col-sm-2"
					:style="{ background: `url(${getBackgroundUrl}) no-repeat center` }"
					:key="`${getBackgroundUrl}`"
				>
					<router-view></router-view>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'App',
		computed: {
			...mapGetters(['getBackgroundUrl']),
		},
	};
</script>

<style>
	:root {
		--main-colour: #e39564;
		--bg-colour: #e7d8c3;
		--default-font: 'Lilita One';
	}
	html {
		background-color: var(--bg-colour);
	}
	#app {
		font-family: Lilita One, Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		margin-top: 60px;
		min-width: 100%;
		background-color: var(--bg-colour);
	}

	h1 {
		color: var(--main-colour) !important;
	}

	#mushodoro {
		height: 350px;
		max-width: 350px;
		min-width: 350px;
		padding: 1rem;
		margin: auto;
		position: absolute;
		top: 7rem;
		left: 0;
		right: 0;
		border: var(--main-colour) solid thick;
		-webkit-transition: all 0.5s ease;
		transition: all 0.5s ease;
	}

	.bg-fade-enter-active {
		opacity: 1;
		z-index: 10;
	}

	.bg-fade-leave-active {
		opacity: 1;
	}

	.bg-fade-enter-active,
	.bg-fade-leave-active {
		opacity: 0;
	}
</style>
