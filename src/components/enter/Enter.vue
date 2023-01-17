<template>
  <h1 class="enter__title">
    Ready for a great User experience?
  </h1>
  <h3 class="enter__subtitle">
    Bring your media to the next level!
  </h3>
  <div class="enter__actions">
    <button @click="$emit('setStage', 'signUp')" class="enter__sign-up">
      Sign Up
    </button>
    <button @click="$emit('setStage', 'signIn')" class="enter__sign-in">
      <IconArrowRight/>
    </button>
  </div>
  <img src="@/assets/enter-bg.png" alt="" class="enter__image">
</template>

<script>
import signUp from "@/components/auth/SignUp.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";

export default {
  name: "Enter",
  components: {IconArrowRight},
  emits: ['setStage'],
  methods: {
    signUp() {
      return signUp
    }
  }
}
</script>

<style lang="scss" scoped>
@import "Enter.scss";
</style>