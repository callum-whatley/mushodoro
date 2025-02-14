<template>
	<div>
		<form ref="myForm">
			<div class="form-group row">
				<label for="time" class="col-9" style="align-content: center">
					How Long Per Mushodoro?
				</label>
				<div class="col-3">
					<input
						type="number"
						class="form-control text-center"
						id="time"
						min="1"
						value="25"
					/>
				</div>
			</div>
			<div class="form-group row my-2">
				<label for="break" class="col-9" style="align-content: center">
					How Long Per Break?
				</label>
				<div class="col-3">
					<input
						type="number"
						class="form-control text-center"
						id="break"
						min="1"
						value="5"
					/>
				</div>
			</div>
			<div class="form-group row">
				<label for="rounds" class="col-9" style="align-content: center">
					How Many Rounds?
				</label>
				<div class="col-3">
					<input
						type="number"
						class="form-control text-center"
						id="rounds"
						min="1"
						value="1"
					/>
				</div>
			</div>
			<button
				type="button"
				@click="addMushodoroTimer"
				class="btn btn-primary mt-4"
			>
				Submit
			</button>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'Form',
		methods: {
			addMushodoroTimer() {
				let formData = {
					minutes: this.$refs.myForm[0].value,
					break: this.$refs.myForm[1].value,
					rounds: this.$refs.myForm[2].value,
				};
				this.$store.dispatch('addMushodoro', formData);
				this.$store.dispatch('backgroundHandler');
				this.$router.push('/timer');
			},
		},
	};
</script>

<style>
	button {
		background-color: var(--main-colour) !important;
		border-color: var(--main-colour) !important;
		color: var(--bg-colour) !important;
		margin: 1rem;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
			1px 1px 0 #000;
	}

	label {
		color: var(--bg-colour);
		font-weight: 900;
		font-size: 1.18rem;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
			1px 1px 0 #000;
	}

	input {
		background-color: var(--main-colour) !important;
		border: 0.15rem solid var(--bg-colour) !important;
		color: var(--bg-colour) !important;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
			1px 1px 0 #000;
	}

	/* Chrome, Safari, Edge, Opera */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
