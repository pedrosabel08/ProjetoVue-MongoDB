<template>
    <div class="p-8 bg-gray-100 min-h-screen">
        <div v-if="loading" class="text-center">Carregando...</div>
        <div v-else class="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-4">{{ resume.firstName }} {{ resume.lastName }}</h1>
            <p><strong>Email:</strong> {{ resume.email }}</p>
            <p><strong>Telefone:</strong> {{ resume.phone }}</p>
            <p><strong>Endereço:</strong> {{ resume.address }}</p>
            <h2 class="text-xl font-bold mt-6 mb-2">Formação Acadêmica</h2>
            <p>{{ resume.education }}</p>
            <h2 class="text-xl font-bold mt-6 mb-2">Experiência Profissional</h2>
            <p>{{ resume.experience }}</p>
            <button @click="$router.back()" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mt-4">
                Voltar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const resume = ref(null)
const loading = ref(true)

const fetchResume = async () => {
    try {
        const { data } = await axios.get(`/api/resumes/${route.params.id}`)
        resume.value = data
    } catch (error) {
        console.error('Erro ao buscar detalhes do currículo:', error)
    } finally {
        loading.value = false
    }
}

onMounted(fetchResume)
</script>
