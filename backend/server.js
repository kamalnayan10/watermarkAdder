const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors()); // Enable CORS
app.use(express.static(path.join(__dirname, 'public')));

// Ensure output directory exists
const outputDir = path.join(__dirname, 'output');
if (!fsSync.existsSync(outputDir)) {
  fsSync.mkdirSync(outputDir);
}

app.post('/upload', upload.single('image'), async (req, res) => {
  const { file } = req;
  const watermarkText = 'kamalanayan';
  const outputPath = path.join(outputDir, `${file.filename}-watermarked.png`);

  try {
    const image = await Jimp.read(file.path);
    const watermark = new Jimp(image.bitmap.width, image.bitmap.height, 0x00000000);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK); // Increase font size

    const textWidth = Jimp.measureText(font, watermarkText);
    const textHeight = Jimp.measureTextHeight(font, watermarkText, image.bitmap.width);

    for (let y = -textHeight; y < image.bitmap.height; y += textHeight + 50) {
      for (let x = -textWidth; x < image.bitmap.width; x += textWidth + 50) {
        watermark.print(font, x, y, {
          text: watermarkText,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP
        }, textWidth, textHeight);
      }
    }

    watermark.rotate(45); // Rotate the watermark text by 45 degrees

    const watermarkedImageBuffer = await image.composite(watermark, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.2,
      opacityDest: 1.0
    }).getBufferAsync(Jimp.MIME_PNG);

    await sharp(watermarkedImageBuffer).toFile(outputPath);

    res.download(outputPath, `${file.filename}-watermarked.png`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      } else {
        console.log('File sent successfully');
      }
    });
  } catch (error) {
    console.error('Error processing image:', error.message);
    res.status(500).send(`Error processing image: ${error.message}`);
  } finally {
    try {
      await fs.unlink(file.path);
    } catch (unlinkError) {
      console.error('Error deleting uploaded file:', unlinkError.message);
    }
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
