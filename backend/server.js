const express = require('express');
const cors = require('cors');
const multer = require('multer');
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
  const { template, text } = req.body;
  const outputPath = path.join(outputDir, `${file.filename}-watermarked.png`);

  try {
    const image = await Jimp.read(file.path);

    switch (parseInt(template, 10)) {
      case 1:
        await applyCenteredWatermark(image, text, outputPath);
        break;
      case 2:
      case 3:
        await applyDiagonalWatermark(image, text, outputPath);
        break;
      case 4:
        await applyHorizontalWatermark(image, text, outputPath);
        break;
      default:
        res.status(400).send('Invalid template number.');
        return;
    }

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

async function applyCenteredWatermark(image, text, outputPath) {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
  const uppercaseText = text.toUpperCase();
  const textWidth = Jimp.measureText(font, uppercaseText);
  const textHeight = Jimp.measureTextHeight(font, uppercaseText, image.bitmap.width);

  // Create a watermark image with the text
  const watermark = new Jimp(textWidth, textHeight, 0x00000000);
  watermark.print(font, 0, 0, uppercaseText);

  // Set opacity
  watermark.opacity(0.5);

  // Calculate center position
  const centerX = (image.bitmap.width - textWidth) / 2;
  const centerY = (image.bitmap.height - textHeight) / 2;

  // Composite the watermark onto the original image
  await image.composite(watermark, centerX, centerY, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5,
    opacityDest: 1.0
  });

  await image.writeAsync(outputPath);
}

async function applyDiagonalWatermark(image, text, outputPath) {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const uppercaseText = text.toUpperCase();
  const textWidth = Jimp.measureText(font, uppercaseText);
  const textHeight = Jimp.measureTextHeight(font, uppercaseText, textWidth);

  // Extend the watermark canvas size to fully cover the diagonal path
  const watermark = new Jimp(image.bitmap.width + textWidth, image.bitmap.height + textHeight, 0x00000000);

  // Start placing text from top left to bottom right
  for (let y = 0; y < watermark.bitmap.height; y += textHeight + 50) {
    for (let x = 0; x < watermark.bitmap.width; x += textWidth + 50) {
      watermark.print(font, x, y, uppercaseText);
    }
  }

  watermark.rotate(45, false); // `false` ensures the image size is adjusted to fit the rotation

  // Composite the watermark over the original image
  await image.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.3,
    opacityDest: 1.0
  });

  await image.writeAsync(outputPath);
}

async function applyHorizontalWatermark(image, text, outputPath) {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const uppercaseText = text.toUpperCase();
  const textWidth = Jimp.measureText(font, uppercaseText);
  const textHeight = Jimp.measureTextHeight(font, uppercaseText, textWidth);

  const watermark = new Jimp(image.bitmap.width, image.bitmap.height, 0x00000000);

  for (let y = 0; y < image.bitmap.height; y += textHeight + 50) {
    for (let x = 0; x < image.bitmap.width; x += textWidth + 50) {
      watermark.print(font, x, y, uppercaseText);
    }
  }

  await image.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.3,
    opacityDest: 1.0
  });

  await image.writeAsync(outputPath);
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
