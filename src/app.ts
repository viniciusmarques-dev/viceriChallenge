import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
})

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`);
    res.send('Login successful!');
})   

app.post('/user', (req, res) => {
    const {name, email, password} = req.body;
    res.send('User created successfully!');
})

app.post('/user/tasks', (req, res) => {
    const {title, description, priority} = req.body;
    res.send('Task created successfully!');
})

app.get('/user/tasks', (req, res) => {

})

app.get('/user/tasks/:taskId', (req, res) => {
    const {taskId} = req.params;
    console.log(`Task ID: ${taskId}`);
    res.send();
})


app.listen(3000, () => {
  console.log('HTTP server running...');
})