import mongoose from "mongoose";


export const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => {
            console.log(`DB Connected.`.bgCyan)
        })

        await mongoose.connect(`${process.env.MONGO_URI}/quickshow`)
    } catch (error) {
        console.log(error.message)
    }
}