const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');  

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure express-session
app.use(session({
  secret: 'your_secret_key',  
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  
}));

app.get('/checkSession', (req, res) => {
  if (req.session.userId) {  
    res.json({ isLoggedIn: true, email: req.session.userEmail }); 
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admin'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

// Handle POST request for user registration
app.post('/signup', (req, res) => {
  const { fullname, contact, address, email, password } = req.body;
  const query = `INSERT INTO users (fullname, contact, address, email, password) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [fullname, contact, address, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(201).send('User registered successfully');
    }
  });
});

//  login route to create a session on successful login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Please provide email and password');
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    if (results.length > 0) {
      // Create a session for the logged-in user
      req.session.userId = results[0].id;  
      return res.status(200).json({email:email});
    } else {
      return res.status(401).send('Login failed');
    }
  });
});

app.get('/profile/:email', (req, res) => {
  const { email } = req.params;
  const query = 'SELECT fullname, contact, address, email, password FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching profile');
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Profile not found');
    }
  });
});

app.put('/profile/:email', (req, res) => {
  const { email } = req.params;
  const { fullName, contactNo, address, password } = req.body;

  const query = `UPDATE users SET fullname = ?, contact = ?, address = ?, password = ? WHERE email = ?`;

  db.query(query, [fullName, contactNo, address, password, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating profile');
    }
    if (result.affectedRows > 0) {
      res.send('Profile updated successfully');
    } else {
      res.status(404).send('Profile not found');
    }
  });
});

app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Server error during logout');
      }
      res.send('Logout successful');
    });
  } else {
    res.status(200).send('No session to clear');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
