const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  try {
    const { expression } = req.query;
    const result = await cloudinary.search
      .expression(expression || 'resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};
