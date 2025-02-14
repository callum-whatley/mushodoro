<template>
  <div>
    <h1 id="timer">
      {{ getMinutes }}:<span v-if="getSeconds < 10">0</span>{{ getSeconds }}
    </h1>
  </div>
  <div id="round">
    <span v-for="n in parseInt(getRounds)" :key="n" class="dot mx-1"></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Timer",
  computed: {
    ...mapGetters(["getMinutes", "getBreak", "getRounds", "getSeconds"]),
  },
  methods: {
    startTimer() {
      setInterval(() => {
        this.$store.dispatch("secondHandler");
      }, 1000);
    },
  },
  created() {
    this.startTimer();
  },
};
</script>

<style>
h1 {
  color: white;
}

#timer {
  float: right;
  color: var(--bg-colour);
}

#round {
  display: flex;
  position: absolute;
  top: 415px;
}

.dot {
  height: 25px;
  width: 25px;
  background-color: var(--main-colour);
  border-radius: 50%;
}
</style>
