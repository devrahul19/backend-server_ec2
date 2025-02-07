const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

// Middleware to parse JSON body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = { name, email, password };

  try {
    let users = [];
    if (fs.existsSync('user.json')) {
      const data = fs.readFileSync('user.json');
      users = JSON.parse(data);
    }
    users.push(user);
    fs.writeFileSync('user.json', JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`EA listening on EC2-Backend-Server`);
});
