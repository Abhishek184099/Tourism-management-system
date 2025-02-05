const mongoose = require('mongoose')
 
const connectDb = async() =>{
     try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongoDB")
     } catch (err) {
        console.error('error connecting to mongodb :',err.message)
     }
}

module.exports = {connectDb};