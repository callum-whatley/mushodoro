<template>
	<div>
		<h2 id="timer">
			{{ getMinutes }}:<span v-if="getSeconds < 10">0</span>{{ getSeconds }}
		</h2>
	</div>
	<div id="ctrl-buttons">
		<button id="play-pause-btn" class="btn btn-primary" @click="pauseHandler()">
			<span v-if="getActiveState">Pause</span>
			<span v-else>Play</span>
		</button>
		<button id="reset-btn" class="btn btn-primary" @click="resetHandler()">
			Reset
		</button>
	</div>
	<div id="round">
		<span v-for="n in parseInt(getRounds)" :key="n" class="dot mx-1"></span>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'Timer',
		data() {
			return {
				interval: null,
			};
		},
		computed: {
			...mapGetters([
				'getMinutes',
				'getBreak',
				'getRounds',
				'getSeconds',
				'getActiveState',
			]),
		},
		methods: {
			startTimer() {
				this.interval = setInterval(() => {
					this.$store.dispatch('secondHandler');
				}, 1000);
			},
			pauseHandler() {
				if (this.getActiveState) clearInterval(this.interval);
				else this.startTimer();
				this.$store.commit('setIsActive', !this.getActiveState);
			},
			resetHandler() {
				clearInterval(this.interval);
				this.$store.dispatch('resetHandler').then(() => {
					this.$router.push('/');
				});
			},
		},
		created() {
			this.startTimer();
		},
		unmounted() {
			clearInterval(this.interval);
		},
	};
</script>

<style>
	#timer {
		position: absolute;
		right: 0rem;
		top: 0;
		color: var(--bg-colour);
		width: 140px;
		font-size: 3.5rem;
	}

	#ctrl-buttons {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 6rem;
		right: -0.75rem;
	}

	#ctrl-buttons button {
		width: 4.5rem !important;
		text-shadow: none !important;
	}

	#play-pause-btn {
		border: 3px solid var(--bg-colour) !important;
	}

	#reset-btn {
		border: 3px solid var(--main-colour) !important;
		background-color: var(--bg-colour) !important;
		color: var(--main-colour) !important;
	}

	#round {
		display: flex;
		position: absolute;
		top: 310px;
	}

	.dot {
		height: 25px;
		width: 25px;
		background-color: var(--main-colour);
		border-radius: 50%;
	}
</style>
