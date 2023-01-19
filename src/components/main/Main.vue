<template>
  <h1 class="main__title">Hello, {{ user.name }}</h1>
  <img src="@/assets/main-bg.svg" alt=""/>
</template>

<script>
export default {
  name: "Main",
  setup() {
    const user =
        localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : {name: "Guest"}
    return {user}
  }
}
</script>

<style lang="scss" scoped>
@import "Main.scss";
</style>