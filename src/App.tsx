import React, { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';

const App = () => {
  const [images, setImages] = useState([]);
  const cloudName = 'your_cloud_name'; // Replace with your Cloudinary cloud name

  const fetchImages = async () => {
    try {
      // Call the Vercel serverless function
      const signatureResponse = await fetch(
        '/api/sign-search?expression=resource_type:image'
      );
      const { signature, timestamp, apiKey, expression } =
        await signatureResponse.json();

      // Use the signed params to call Cloudinary Search API
      const searchResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            expression,
            api_key: apiKey,
            signature,
            timestamp,
          }),
        }
      );

      const data = await searchResponse.json();
      setImages(data.resources);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const cld = new Cloudinary({ cloud: { cloudName: cloudName } });

  return (
    <div>
      <h1>Dynamic Cloudinary Images</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image: any) => {
          const img = cld.image(image.public_id);
          img.resize(auto().width(300).height(300));

          return (
            <AdvancedImage
              key={image.public_id}
              cldImg={img}
              style={{ margin: '10px' }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;