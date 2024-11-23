import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables')
    process.exit(1)
}

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB:')
        console.error('Error name:', err.name)
        console.error('Error message:', err.message)
        if (err.reason) console.error('Error reason:', err.reason)
        if (err.code) console.error('Error code:', err.code)
        if (err.stack) console.error('Error stack:', err.stack)
        process.exit(1)
    })

// Atualização do esquema do usuário
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    address: String,
    education: String, // Pode ser uma string JSON com informações formatadas
    experience: String, // Pode ser uma string JSON com informações formatadas
    skills: [String], // Lista de habilidades
    languages: [String], // Lista de idiomas
    objective: String
})

const User = mongoose.model('User', userSchema)

// Atualização do endpoint para lidar com os novos campos
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Rota para obter todos os currículos
app.get('/api/resumes', async (req, res) => {
    try {
        const resumes = await User.find(); // Supondo que `User` seja o modelo de currículo
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter um currículo específico
app.get('/api/resumes/:id', async (req, res) => {
    try {
        const resume = await User.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Currículo não encontrado' });
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para atualizar um currículo
app.put('/api/resumes/:id', async (req, res) => {
    try {
        const updatedResume = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResume) return res.status(404).json({ message: 'Currículo não encontrado' });
        res.json(updatedResume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para excluir um currículo
app.delete('/api/resumes/:id', async (req, res) => {
    try {
        const deletedResume = await User.findByIdAndDelete(req.params.id);
        if (!deletedResume) return res.status(404).json({ message: 'Currículo não encontrado' });
        res.json({ message: 'Currículo excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
