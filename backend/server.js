import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API IS WOKRING!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}); 
export default app;



// Connect to the database
connectDB();