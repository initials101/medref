import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import patientRoutes from "./routes/patient.routes.js"
import doctorRoutes from "./routes/doctor.routes.js"
import hospitalRoutes from "./routes/hospital.routes.js"
import appointmentRoutes from "./routes/appointment.routes.js"
import referralRoutes from "./routes/referral.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import medicalRecordRoutes from "./routes/medicalRecord.routes.js"
import { notFound, errorHandler } from "./middleware/error.middleware.js"
import path from "path"
import { fileURLToPath } from "url"
import userRoutes from "./routes/user.routes.js"
import messageRoutes from "./routes/message.routes.js"

dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/patients", patientRoutes)
app.use("/api/doctors", doctorRoutes)
app.use("/api/hospitals", hospitalRoutes)
app.use("/api/appointments", appointmentRoutes)
app.use("/api/referrals", referralRoutes)
app.use("/api/admins", adminRoutes)
app.use("/api/medical-records", medicalRecordRoutes)
app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
