<template>
    <div class="navbar">
        <h3 @click.prevent="$router.push('/')">Log In Page</h3>
        <h3 @click.prevent="$router.push('/chat')">Chat Page</h3>
        <h3 @click.prevent="$router.push('/store')">HomePageStore</h3>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
.navbar {
    display: flex;
    justify-content: center;
}

h3 {
    margin-right: 15px;
    cursor: pointer;

    &:hover {
        color: darkred;
    }
}
</style>