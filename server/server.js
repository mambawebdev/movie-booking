import express from "express";
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import colors from 'colors'
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from "../server/inngest/index.js"

const app = express();

const PORT = 4000;

await connectDB();
// Middleware

app.use(express.json())
app.use(cors());
app.use(clerkMiddleware())

// API Routes
app.get(('/'), (req, res) => {
   res.send('Homepage') 
})
app.use("/api/inngest", serve({ client: inngest, functions }));


app.listen(PORT, (req, res) => {
    console.log(`Server is listening on port: ` + PORT)
})
