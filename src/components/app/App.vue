<script setup>
import {ref} from "vue";
import Enter from "@/components/enter/Enter.vue";
import SignUp from "@/components/auth/SignUp.vue";
import SignIn from "@/components/auth/SignIn.vue";
import Main from "@/components/main/Main.vue";

const stage = ref("main")
const setStage = (name) => stage.value = name


</script>

<template>
  <main class="main">
    <Enter v-if="stage === 'enter'" @setStage="setStage"/>
    <sign-up v-if="stage === 'signUp'" @setStage="setStage"/>
    <sign-in v-if="stage === 'signIn'" @setStage="setStage"/>
    <Main v-if="stage === 'main'"/>
  </main>

</template>

<style lang="scss">
@import "App";
</style>
