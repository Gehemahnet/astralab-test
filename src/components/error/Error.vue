<template>
  <div class="error">
    <p class="error__text">
      {{ error }}
    </p>
    <button class="error__button">
      <IconClose
          width="12"
          height="12"
          :fill="'white'"
      />
    </button>
  </div>
</template>

<script>
import IconClose from "@/components/icons/IconClose.vue";

export default {
  name: "Error",
  props: {
    error: {
      type: String,
      required: true
    }
  },
  components: {IconClose}
}
</script>

<style lang="scss" scoped>
@import "Error.scss";
</style>