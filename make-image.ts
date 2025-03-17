import sharp from 'sharp';

export const makeImage = async (svgString: string) => {
  // Create a buffer from the SVG string
  const svgBuffer = Buffer.from(svgString);

  // Use Sharp to convert the SVG to PNG with better quality settings
  const imageBuffer = await sharp(svgBuffer, {
    density: 300,
  })
    .png({
      quality: 100,
      compressionLevel: 9,
    })
    .toBuffer();

  return imageBuffer;
};
