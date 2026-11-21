import express from 'express';
import DailyLimit from '../mongodb/models/dailyLimit.js';
import GeneratedImage, { hashImage } from '../mongodb/models/generatedImage.js';
import { generateImage, isValidModel } from '../services/imageService.js';

const router = express.Router();

// Provider errors can be long and technical (Gemini returns its full JSON body),
// so the user gets a short message and the raw error stays in the server logs.
const BLOCKED_PATTERN = /safety|moderation|flagged|sensitive|blocked|blocklist|prohibited|content.?polic|E005/i;

const userFacingError = (error) => (
  error?.code === 'moderation_blocked' || BLOCKED_PATTERN.test(error?.message || '')
    ? 'This prompt was blocked by the image provider. Try rewording it.'
    : 'Image generation failed. Please try again.'
);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Artofficial Image API!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt, model, jsonMode } = req.body;

    if (!model) {
      return res.status(400).json({
        success: false,
        message: 'Model is required',
      });
    }

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required and must be a string',
      });
    }

    const trimmedPrompt = prompt.trim();

    if (trimmedPrompt.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Prompt cannot be empty',
      });
    }

    if (trimmedPrompt.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Prompt must be less than 2000 characters',
      });
    }

    if (!isValidModel(model)) {
      return res.status(400).json({
        success: false,
        message: `Unsupported model: ${model}`,
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const result = await DailyLimit.findOneAndUpdate(
      { date: today },
      { $inc: { total: 1, [`models.${model}`]: 1 } },
      { upsert: true, new: true },
    );

    const refundQuota = () => DailyLimit.updateOne(
      { date: today },
      { $inc: { total: -1, [`models.${model}`]: -1 } },
    );

    if (result.total > 50) {
      await refundQuota();
      return res.status(429).json({
        success: false,
        message: 'Daily image limit reached (50/day). Please try again tomorrow!',
      });
    }

    let base64;
    try {
      ({ base64 } = await generateImage(trimmedPrompt, model, !!jsonMode));
    } catch (error) {
      await refundQuota().catch((refundError) => console.error('Quota refund failed:', refundError));
      throw error;
    }

    await GeneratedImage.updateOne(
      { hash: hashImage(base64) },
      { $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );

    res.status(200).json({ photo: base64 });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: userFacingError(error) });
  }
});

export default router;
