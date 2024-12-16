// api/sign-search.js
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const expression = req.query.expression || '';

    // Generate signature for Cloudinary Search API
    const signature = cloudinary.utils.api_sign_request(
      { expression, timestamp },
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({
      signature,
      timestamp,
      expression,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}