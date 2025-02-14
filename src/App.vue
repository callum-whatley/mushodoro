<template>
  <div class="container-fluid">
    <div class="row">
      <h2>Mushodoro</h2>
      <div
        id="mushodoro"
        class="col-sm-2"
        :style="{ background: `url(${getBackgroundUrl}) no-repeat center` }"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters(["getBackgroundUrl"]),
  },
};
</script>


<style>
:root {
  --main-colour: #e39564;
  --bg-colour: #e7d8c3;
}
html {
  background-color: var(--bg-colour);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  min-width: 100%;
  background-color: var(--bg-colour);
}

h2 {
  color: var(--main-colour);
}

#mushodoro {
  height: 350px;
  max-width: 350px;
  min-width: 350px;
  padding: 1rem;
  margin: auto;
  border: var(--main-colour) solid thick;
}
</style>
