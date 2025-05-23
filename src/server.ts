// Import app
import app from "./app";

// Define port
const PORT = Number(process.env.PORT) || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
