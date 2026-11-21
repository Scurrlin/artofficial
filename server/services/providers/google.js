import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;
const ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent';

export async function generate(prompt) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: '1:1',
        },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Google Gemini API error (${response.status}): ${err}`);
  }

  const data = await response.json();
  const base64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!base64) {
    const reason = data.promptFeedback?.blockReason || data.candidates?.[0]?.finishReason || 'unknown';
    throw new Error(`Google Gemini returned no image data (reason: ${reason})`);
  }

  return { base64 };
}
