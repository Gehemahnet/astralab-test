import {computed, watchEffect} from "vue";

export const useFormValidation = (form) => {
    const emailValidation = computed(() => {
        if (form.email.triggered) {
            return (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g.test(form.email.value))
                ? "Enter valid email"
                : ""
        } else {
            return ""
        }
    })
    const passwordValidation = computed(() => {
        if (form.password.triggered) {
            return (!/^(?=.*\d)(?=(.*[A-Z]){2,})(?=.*[a-z])(?=.*[^\w\s:])(\S){8,20}$/gm.test(form.password.value))
                ?
                "Enter valid password"
                :
                ""
        } else {
            return ""
        }
    })
    const passwordMatching = computed(() => {
        let object = form.password
        let matchWith = form.checkPassword
        if (object.triggered && matchWith.triggered) {
            if (object.value !== "" && matchWith.value !== "") {
                return object.value !== matchWith.value ? "Passwords do not match" : ""
            }
            if (matchWith.value === "") {
                return "Password can't be empty"
            }
        }
        if (matchWith.triggered && !object.triggered) {
            return "Write password to field above before matching"
        }
        if (!matchWith.triggered) {
            return ""
        }
    })
    const formReadiness = computed(() => {
        let emailComplete = !form.email.error && form.email.triggered
        let passwordComplete = !form.password.error && form.password.triggered
        if (form.checkPassword) {
            let checkComplete = !form.checkPassword.error && form.checkPassword.triggered
            return (passwordComplete) && (emailComplete) && (checkComplete)
        } else {
            return (passwordComplete) && (emailComplete)
        }
    })
    watchEffect(() => form.email.error = emailValidation)
    watchEffect(() => form.password.error = passwordValidation)
    form.checkPassword && watchEffect(() => form.checkPassword.error = passwordMatching)
    return {emailValidation, passwordValidation, passwordMatching, formReadiness}
}