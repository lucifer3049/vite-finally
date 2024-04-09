<template>
  <RouterView />
</template>

<style lang="scss">
@import './assets/all.scss';
</style>

<script setup>
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
</script>
