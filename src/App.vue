<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import AppHeader from "@/layout/AppHeader.vue";
import AppLoading from "@/components/loading/AppLoading.vue";

const store = useStore();
const loading = computed(() => store.state.loading);
</script>

<template>
  <div>
    <AppHeader />
    <main class="w-full min-h-screen">
      <router-view />
    </main>
    <AppLoading v-if="loading" />
  </div>
</template>

<style scoped>
#app-body {
}
</style>
