const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");


const app = express();

require("dotenv").config();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true 
}));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const port = process.env.PORT || 0;

app.use('/api/',require("./routes/auth.route"));
app.use('/api/destinations', require("./routes/destination.route"));
app.use("/api/packages", require("./routes/package.route"));
app.use("/api/bookings", require("./routes/booking.route"));
app.use("/api/payments", require("./routes/payment.route"));
app.use("/api/admin", require("./routes/admin.route"));


app.listen(port, () => {
    require("./db/connectDB").connectDb();
    console.log(`server is runnig at ${port}`);
})

