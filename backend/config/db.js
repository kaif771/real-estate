const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      family: 4 // Use IPv4, skip trying IPv6
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`\n=========================================\n`);
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.error(`\n⚠️ CRITICAL: Your IP address is likely NOT whitelisted in MongoDB Atlas.`);
    console.error(`Please go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0).`);
    console.error(`\n=========================================\n`);
    // Removing process.exit(1) so the server can at least start and not throw ERR_CONNECTION_REFUSED
  }
};

module.exports = connectDB;
