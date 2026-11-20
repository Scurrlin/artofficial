import mongoose from 'mongoose';

const DailyLimitSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  total: { type: Number, default: 0 },
  models: { type: Map, of: Number, default: () => new Map() },
  // Each day's record is created during that UTC day, so 24h later the day is over
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 },
});

const DailyLimit = mongoose.model('DailyLimit', DailyLimitSchema);

export default DailyLimit;
