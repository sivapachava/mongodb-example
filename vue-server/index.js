const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login-details', 
 { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });


const loginDetailsSchema = new mongoose.Schema({
  email: String,
  password: String,
});


const LoginDetails = mongoose.model('LoginDetails', loginDetailsSchema);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/api/login-details', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await LoginDetails.findOne(
      { email: email, 
        password: password 
      });
    if (existingUser) {
      res.json({ 
       message: 'Login successful',
       user: existingUser
       });
    } else {
      res.status(401).json({
       error: 'Invalid email or password'
       });
    }
  } catch (err) {
    console.error(`Error checking login details: ${err}`);
    res.status(500).json({ error: 'Error checking login details' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
