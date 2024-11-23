<template>
    <div class="p-8 bg-gray-100 min-h-screen">
        <h1 class="text-3xl font-bold mb-6">Lista de Currículos</h1>
        <div v-if="loading" class="text-center">Carregando...</div>
        <div v-else>
            <div v-for="resume in resumes" :key="resume._id" class="bg-white shadow-md rounded-lg p-4 mb-4">
                <h2 class="text-xl font-bold">{{ resume.firstName }} {{ resume.lastName }}</h2>
                <p><strong>Formação:</strong> {{ resume.education }}</p>
                <p><strong>Experiência:</strong> {{ resume.experience }}</p>
                <button @click="viewDetails(resume._id)" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                    Ver Detalhes
                </button>
                <button @click="editResume(resume._id)" class="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-2">
                    Editar
                </button>
                <button @click="deleteResume(resume._id)" class="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2">
                    Excluir
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const resumes = ref([])
const loading = ref(true)

const fetchResumes = async () => {
    try {
        const { data } = await axios.get('/api/resumes')
        resumes.value = data
    } catch (error) {
        console.error('Erro ao buscar currículos:', error)
    } finally {
        loading.value = false
    }
}

const viewDetails = (id) => {
    // Redireciona para a página de detalhes do currículo
    window.location.href = `/resume/${id}`
}

const editResume = (id) => {
    // Redireciona para a página de edição do currículo
    window.location.href = `/resume/edit/${id}`
}

const deleteResume = async (id) => {
    if (confirm('Tem certeza que deseja excluir este currículo?')) {
        try {
            await axios.delete(`/api/resumes/${id}`)
            resumes.value = resumes.value.filter((resume) => resume._id !== id)
        } catch (error) {
            console.error('Erro ao excluir currículo:', error)
        }
    }
}

onMounted(fetchResumes)
</script>