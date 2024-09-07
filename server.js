import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Create an Express application
const app = express();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Define a route
app.get('/admin', (req, res) => {
    console.log(req.body);
    res.render('adminLogin'); // Render the adminLogin.ejs template
});

app.get('/patient', (req, res) => {
    res.render('patientLogin'); // Renders the 'another-page.ejs' file
});

app.post('/admin', (req, res) => {
    const { email, password } = req.body; // Extract data from the form
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    if(email == 'doctor@hospital.com' && password == 12345){
        res.render('dashboard');
    }
    res.render('adminLogin');
});

app.post('/patient', (req, res) => {
    const { email, password } = req.body; // Extract data from the form
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    if(email == 'patient@hospital.com' && password == 12345){
        res.render('patient');
    }
    res.render('patientLogin');
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});