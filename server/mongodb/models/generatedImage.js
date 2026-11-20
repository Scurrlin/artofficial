import crypto from 'crypto';
import mongoose from 'mongoose';

// Fingerprints of images this server generated, so posts can only share those.
const GeneratedImageSchema = new mongoose.Schema({
  hash: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 },
});

export const hashImage = (base64) => crypto.createHash('sha256').update(base64).digest('hex');

const GeneratedImage = mongoose.model('GeneratedImage', GeneratedImageSchema);

export default GeneratedImage;
