import app from "./src/app.js";
import "dotenv/config"
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
