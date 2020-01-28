<template>
    <div class="layout">
        <app-header></app-header>
        <app-navbar></app-navbar>
        <app-main></app-main>
    </div>
</template>

<script>
import AppHeader from "../AppHeader";
import AppNavbar from "../AppNavBar";
import AppMain from "../AppMain";
export default {
    name: "layout",
    components: { AppHeader, AppNavbar, AppMain }
};
</script>

<style lang='scss' scoped>
</style>