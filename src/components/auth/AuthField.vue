<template>
  <div class="auth__field">
    <div class="auth__header">
      <label class="auth__label">
        {{ label }}
      </label>
      <div class="auth__help" v-if="hasHelp">
        <div class="auth__help-popup" v-if="help">
          {{ help }}
        </div>
        <button
            class="auth__help-button"
            type="button"
            @click="$emit('showHelp')"
        >
          <icon-helper/>
        </button>
      </div>
    </div>
    <div class="auth__input-container">
      <input
          class="auth__input"
          :class="{error: error, success: !error && triggered}"
          :type="type"
          :value="input"
          @input="$emit('update:input', $event.target.value)"
          @blur="$emit('startValidation')"
      />
      <button
          v-if="showHide"
          class="auth__password-toggle"
          type="button"
          @click="$emit('showValue',toShow)"
      >
        <icon-password-hide v-if="showState"/>
        <icon-password-show v-else/>
      </button>
    </div>
    <p class="auth__error" v-if="error">{{error}}</p>
  </div>

</template>

<script>
import IconHelper from "@/components/icons/IconHelper.vue";
import IconPasswordHide from "@/components/icons/IconPasswordHide.vue";
import IconPasswordShow from "@/components/icons/IconPasswordShow.vue";

export default {
  name: "AuthField",
  components: {IconPasswordShow, IconPasswordHide, IconHelper},
  props: {
    label: {
      type: String,
      default: ""
    },
    input: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    triggered: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    },
    hasHelp: {
      type: Boolean,
    },
    help: {
      type: String,
      default: ""
    },
    showHide: {
      type: Boolean
    },
    showState: {
      type: Boolean
    },
    toShow: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>

</style>