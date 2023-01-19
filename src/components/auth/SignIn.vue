<template>
  <h2 class="auth__title">Sign In</h2>
  <form class="auth__form">
    <auth-field
        label="Email"
        type="text"
        :triggered="form.email.triggered"
        :error="emailValidation"
        v-model:input="form.email.value"
        @start-validation="startValidation(form.email)"
    />
    <auth-field
        label="Password"
        to-show="password"
        :type="form.password.inputType"
        :triggered="form.password.triggered"
        :show-state="form.password.shown"
        :error="passwordValidation"
        v-model:input="form.password.value"
        @show-value="showValue"
        @start-validation="startValidation(form.password)"
        show-hide
    />
    <button
        class="auth__button"
        type="button"
        :disabled="!formReadiness"
        @click="signIn"
    >
      Sign In
    </button>
  </form>
  <h4 class="auth__text-to-another">
    Don’t have an account yet?
  </h4>
  <button
      class="auth__button-to-another"
      @click="$emit('setStage', 'signUp')"
  >
    Sign Up
  </button>
  <Error
      v-if="form.error"
      :error="form.error"
      @closeError="() => form.error = ''"

  />
</template>

<script>
import AuthField from "@/components/auth/AuthField.vue";
import {reactive} from "vue";
import {useFormValidation} from "@/hooks/useFormValidation";
import Error from "@/components/error/Error.vue";

export default {
  name: "SignIn",
  components: {Error, AuthField},
  setup(props, context) {
    const form = reactive({
      email: {
        value: "",
        triggered: false,
        error: ""
      },
      password: {
        value: "",
        triggered: false,
        error: "",
        shown: false,
        inputType: "password",
      },
      error: ""
    })
    const showValue = (name) => {
      form[name].shown = !form[name].shown
      form[name].inputType === "password"
          ? form[name].inputType = "text"
          : form[name].inputType = "password"
    }
    const startValidation = (payload) => {
      payload.triggered = true
    }
    const signIn = () => {
      let localData = localStorage.getItem('users')
      if (localData) {
        let user = JSON.parse(localData).find(user => user.email === form.email.value)
        if (user) {
          if (user.password === form.password.value) {
            localStorage.setItem("currentUser", JSON.stringify(user))
            context.emit('setStage', 'main')
          } else {
            form.error = "Wrong email or password"
          }
        } else {
          form.error = "Wrong email or password"
        }
      } else {
        form.error = "Wrong email or password"
      }
    }
    const {emailValidation, passwordValidation, formReadiness} = useFormValidation(form)
    return {
      form,
      showValue,
      startValidation,
      emailValidation,
      passwordValidation,
      formReadiness,
      signIn
    }
  }
}
</script>

<style lang="scss">
@import "Auth.scss";
</style>