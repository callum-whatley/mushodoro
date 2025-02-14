<template>
  <div>
    <form ref="myForm">
      <div class="form-group row my-2">
        <label for="time" class="col-8">How Long For Each Mushodoro?</label>
        <div class="col-4">
          <input
            type="number"
            class="form-control text-center w-75"
            id="time"
            min="1"
            value="1"
          />
        </div>
      </div>
      <div class="form-group row my-2">
        <label for="break" class="col-8">How Long For Each Break?</label>
        <div class="col-4">
          <input
            type="number"
            class="form-control text-center w-75"
            id="break"
            min="1"
            value="1"
          />
        </div>
      </div>
      <div class="form-group row my-2">
        <label for="rounds" class="col-8">How Many Rounds?</label>
        <div class="col-4">
          <input
            type="number"
            class="form-control text-center w-75"
            id="rounds"
            min="1"
            value="1"
          />
        </div>
      </div>
      <button type="button" @click="addMushodoroTimer" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  methods: {
    addMushodoroTimer() {
      let formData = {
        minutes: this.$refs.myForm[0].value,
        break: this.$refs.myForm[1].value,
        rounds: this.$refs.myForm[2].value,
      };
      this.$store.dispatch("addMushodoro", formData);
      this.$store.dispatch("backgroundHandler");
      this.$router.push("/timer");
    },
  },
};
</script>

<style>
button {
  background-color: var(--main-colour) !important;
  border-color: var(--main-colour) !important;
  margin: 1rem;
}

label {
  color: white;
}
</style>
