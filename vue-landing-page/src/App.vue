<template>
  <div class="container mx-auto px-4">
    <Menu @open-modal="openModal" />
    <router-view />
    <SignUpModal v-if="showModal" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menu from './components/MenuNav.vue'
import SignUpModal from './components/SignUpModal.vue'

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>
