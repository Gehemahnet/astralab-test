<template>
  <h2 class="auth__title">
    Sign Up
  </h2>
  <form class="auth__form">
    <auth-field
        label="Full name"
        type="text"
        :triggered="form.name.triggered"
        :error="nameValidation"
        v-model:input="form.name.value"
        @start-validation="startValidation(form.name)"
    />
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
        :help="form.password.help"
        v-model:input="form.password.value"
        @show-value="showValue"
        @show-help="showPasswordHelp"
        @start-validation="startValidation(form.password)"
        show-hide
        has-help
    />
    <auth-field
        label="Repeat password"
        to-show="checkPassword"
        :type="form.checkPassword.inputType"
        :triggered="form.checkPassword.triggered"
        :show-state="form.checkPassword.shown"
        :error="passwordMatching"
        v-model:input="form.checkPassword.value"
        @show-value="showValue"
        @start-validation="startValidation(form.checkPassword)"
        show-hide

    />
    <button
        class="auth__button"
        type="button"
        :disabled="!formReadiness"
        @click="signUp"
    >
      Sign Up
    </button>
  </form>
  <h4 class="auth__text-to-another">
    Already have an account?
  </h4>
  <button
      class="auth__button-to-another"
      @click="$emit('setStage', 'signIn')"
  >
    Sign In
  </button>
</template>

<script>
import {reactive} from "vue";
import IconPasswordHide from "@/components/icons/IconPasswordHide.vue";
import IconPasswordShow from "@/components/icons/IconPasswordShow.vue";
import IconHelper from "@/components/icons/IconHelper.vue";
import AuthField from "@/components/auth/AuthField.vue";
import {useFormValidation} from "@/hooks/useFormValidation";

export default {
  components: {AuthField, IconHelper, IconPasswordShow, IconPasswordHide},
  setup(props, context) {
    const form = reactive({
      name: {
        value: "",
        triggered: false,
        error: ""
      },
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
        help: ""
      },
      checkPassword: {
        value: "",
        triggered: false,
        error: "",
        shown: false,
        inputType: "password"
      },
      error: ""
    })
    const showValue = (name) => {
      form[name].shown = !form[name].shown
      form[name].inputType === "password"
          ? form[name].inputType = "text"
          : form[name].inputType = "password"
    }
    const showPasswordHelp = () => {
      form.password.help === ""
          ? form.password.help = "Password must contain 8+ symbols, 1 special and 2 capital letters"
          : form.password.help = ""
    }
    const startValidation = (payload) => {
      payload.triggered = true
    }
    const signUp = () => {
      const localData = localStorage.getItem("users")
      if (localData) {
        let parsedData = JSON.parse(localData)
        if (!parsedData.find(user => user.email === form.email.value)) {
          parsedData.push({
            id: parsedData.length,
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
          })
          localStorage.setItem("users", JSON.stringify(parsedData))
        } else {
          ``
          form.error = "Wrong email or password"
        }
      } else {
        let users = []
        users.push({
          id: 0,
          name: form.name.value,
          email: form.email.value,
          password: form.password.value
        })
        localStorage.setItem("users", JSON.stringify(users))
      }
      let currentUser = JSON.parse(localStorage.getItem("users")).find(user => user.email === form.email.value)
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
      context.emit('setStage', 'main')

    }
    const {
      nameValidation,
      emailValidation,
      passwordValidation,
      passwordMatching,
      formReadiness
    } = useFormValidation(form)
    return {
      form,
      showValue,
      showPasswordHelp,
      startValidation,
      nameValidation,
      emailValidation,
      passwordValidation,
      passwordMatching,
      formReadiness,
      signUp
    }
  }
}
</script>

<style lang="scss">
</style>