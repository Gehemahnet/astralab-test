<template>
<h1 class="main__title">Hello {{user.name}}</h1>
</template>

<script>
export default {
  name: "Main",
  setup() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    return {user}
  }
}
</script>

<style scoped>

</style>