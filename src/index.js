import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import mahasiswaRoutes from "./routes/mahasiswa.routes.js";
import dosenRoutes from "./routes/dosen.routes.js";
import userRoutes from "./routes/user.routes.js";
import penelitianRoutes from "./routes/penelitian.routes.js";

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
}));
// Middleware untuk mem-parsing body dengan format JSON
app.use(express.json());

// Middleware untuk mem-parsing body dengan format URL-encoded
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
	res.send("SIP-JUDIKA API");
});

app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dosen", dosenRoutes);
app.use("/api/penelitian", penelitianRoutes);



app.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});
