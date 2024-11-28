import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './db/datasource';
import router from './routes/routes';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Use routes
app.use('/api', router);

// EXAMPLE endpoint:
app.get('/', (req, res) => {
    res.send("Hello World, backend is running =)");
});



// Initialize the database connection
AppDataSource.initialize()
    .then(() => {
        // Start the server only after the database is initialized
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => console.log('Database connection error:', error));
