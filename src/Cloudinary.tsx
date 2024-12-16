import React, { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const CloudinaryScreen = () => {
  const [images, setImages] = useState([]);
  const cloudName = 'dwijyrmoc'; // Replace with your cloud name
  const folderName = 'js_project/home'; // Target folder in Cloudinary

  // Cloudinary instance
  const cld = new Cloudinary({
    cloud: { cloudName: cloudName }
  });

  useEffect(() => {
    // Fetch all images from the folder using Cloudinary API
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://res.cloudinary.com/${cloudName}/image/list/${folderName}.json`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        setImages(data.resources); // Array of images
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Cloudinary Images</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image: any) => {
          const img = cld.image(image.public_id);
          img.resize(auto().gravity(autoGravity()).width(300).height(300));

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

export default CloudinaryScreen;