import mongoose from 'mongoose';
async function connectMongo() {
	mongoose.connect(process.env.MONGO_URI);
}

export default connectMongo;
