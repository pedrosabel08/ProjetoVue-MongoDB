<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 class="text-2xl font-bold mb-4">Cadastre-se</h2>
            <form @submit.prevent="handleSubmit">
                <!-- Nome completo -->
                <div class="mb-4">
                    <label for="fullName" class="block mb-2">Nome completo</label>
                    <input v-model="fullName" id="fullName" type="text" class="w-full border p-2 rounded" required>
                </div>

                <!-- Endereço de e-mail -->
                <div class="mb-4">
                    <label for="email" class="block mb-2">Endereço de e-mail</label>
                    <input v-model="email" id="email" type="email" class="w-full border p-2 rounded" required>
                </div>

                <!-- Telefone -->
                <div class="mb-4">
                    <label for="phone" class="block mb-2">Telefone</label>
                    <input v-model="phone" id="phone" type="tel" class="w-full border p-2 rounded" required>
                </div>

                <!-- Endereço completo -->
                <div class="mb-4">
                    <label for="address" class="block mb-2">Endereço completo</label>
                    <input v-model="address" id="address" type="text" class="w-full border p-2 rounded" required>
                </div>

                <!-- Formação acadêmica -->
                <div class="mb-4">
                    <label for="education" class="block mb-2">Formação acadêmica</label>
                    <textarea v-model="education" id="education" rows="3" class="w-full border p-2 rounded"
                        required></textarea>
                </div>

                <!-- Experiência profissional -->
                <div class="mb-4">
                    <label for="experience" class="block mb-2">Experiência profissional</label>
                    <textarea v-model="experience" id="experience" rows="3" class="w-full border p-2 rounded"
                        required></textarea>
                </div>

                <!-- Habilidades -->
                <div class="mb-4">
                    <label for="skills" class="block mb-2">Habilidades</label>
                    <textarea v-model="skills" id="skills" rows="3" class="w-full border p-2 rounded" required></textarea>
                </div>

                <!-- Idiomas -->
                <div class="mb-4">
                    <label for="languages" class="block mb-2">Idiomas</label>
                    <textarea v-model="languages" id="languages" rows="2" class="w-full border p-2 rounded"
                        required></textarea>
                </div>

                <!-- Objetivo profissional -->
                <div class="mb-4">
                    <label for="objective" class="block mb-2">Objetivo profissional</label>
                    <textarea v-model="objective" id="objective" rows="2" class="w-full border p-2 rounded"
                        required></textarea>
                </div>

                <!-- Botões -->
                <div class="flex justify-between">
                    <button type="submit"
                        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Cadastrar</button>
                    <button @click="$emit('close')" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Fechar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Define os campos do formulário
const fullName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const education = ref('')
const experience = ref('')
const skills = ref('')
const languages = ref('')
const objective = ref('')

const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/users', {
            fullName: fullName.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            education: education.value,
            experience: experience.value,
            skills: skills.value,
            languages: languages.value,
            objective: objective.value,
        })
        console.log('Usuário cadastrado:', response.data)
        alert('Cadastro realizado com sucesso!')

        // Limpar os campos após o envio
        fullName.value = ''
        email.value = ''
        phone.value = ''
        address.value = ''
        education.value = ''
        experience.value = ''
        skills.value = ''
        languages.value = ''
        objective.value = ''
    } catch (error) {
        console.error('Erro ao cadastrar:', error)
        alert('Erro ao realizar o cadastro. Por favor, tente novamente.')
    }
}
</script>