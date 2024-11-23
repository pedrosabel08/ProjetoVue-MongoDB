<template>
    <nav class="bg-gray-800 text-white p-4">
        <ul class="flex justify-between">
            <li><router-link to="/" class="hover:text-gray-300">Início</router-link></li>
            <li><router-link to="/curriculos" class="hover:text-gray-300">Ver currículos</router-link></li>
            <li>
                <button @click="$emit('open-modal')"
                    class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Cadastre-se</button>
            </li>
        </ul>
    </nav>
</template>
  
<script setup>
</script>
  