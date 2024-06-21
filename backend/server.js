const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 
const cors = require('cors');


const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());

app.post('/api/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

const dbURI = 'mongodb+srv://sarvesh02:19Aj6whlLyayctYn@task.g1kd0yq.mongodb.net/?retryWrites=true&w=majority&appName=task';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

app.listen(5000, () => console.log('Server running on port 5000'));

const authRoutes = require('./routes/Auth');
app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/Posts');
app.use('/api/posts', postRoutes);

