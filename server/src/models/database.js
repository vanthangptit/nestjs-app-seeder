import mongoose from 'mongoose';
import conf from '../services/config';

const { dbName, dbUsername, dbPassword } = conf;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@app-mern-stack.yzeyp.mongodb.net/${dbName}?retryWrites=true&w=majority`);

    console.log('MongoDB connected!');
  } catch (err) {
    console.log('Error: ' + err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB
};