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
                await applyDiagonalWatermark(image, text, outputPath);
                break;
            case 3:
                // This case will apply the same logic as case 2 if required
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

    const watermark = new Jimp(textWidth, textHeight, 0x00000000);
    watermark.print(font, 0, 0, uppercaseText);
    watermark.opacity(0.5);

    const centerX = (image.bitmap.width - textWidth) / 2;
    const centerY = (image.bitmap.height - textHeight) / 2;

    await image.composite(watermark, centerX, centerY, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.5,
        opacityDest: 1.0
    });

    await image.writeAsync(outputPath);
}

async function applyDiagonalWatermark(image, text, outputPath) {
    const fontSize = 32; // Adjustable font size for the watermark
    const opacity = 0.5; // Increased opacity for better visibility

    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const uppercaseText = text.toUpperCase();

    const textWidth = Jimp.measureText(font, uppercaseText);
    const textHeight = Jimp.measureTextHeight(font, uppercaseText, textWidth);

    const diagonalLength = Math.sqrt(image.bitmap.width ** 2 + image.bitmap.height ** 2);
    const watermark = new Jimp(diagonalLength, diagonalLength, 0x00000000);

    for (let y = -diagonalLength; y < diagonalLength; y += textHeight + 100) {
        for (let x = -diagonalLength; x < diagonalLength; x += textWidth + 100) {
            watermark.print(font, x, y, uppercaseText);
        }
    }

    watermark.rotate(45, true);

    const xCenterShift = (watermark.bitmap.width - image.bitmap.width) / 2;
    const yCenterShift = (watermark.bitmap.height - image.bitmap.height) / 2;

    await image.composite(watermark, -xCenterShift, -yCenterShift, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: opacity,
        opacityDest: 1.0
    });

    await image.writeAsync(outputPath);
}

async function applyHorizontalWatermark(image, text, outputPath) {
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const uppercaseText = text.toUpperCase();
    const textWidth = Jimp.measureText(font, uppercaseText);
    const textHeight = Jimp.measureTextHeight(font, uppercaseText, textWidth);

    const watermark = new Jimp(image.bitmap.width, image.bitmap.height + textHeight, 0x00000000);

    for (let y = -textHeight; y < image.bitmap.height + textHeight; y += textHeight + 50) {
        for (let x = -textWidth; x < image.bitmap.width + textWidth; x += textWidth + 50) {
            watermark.print(font, x, y, uppercaseText);
        }
    }

    await image.composite(watermark, 0, -textHeight / 2, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.5,  // Increased opacity
        opacityDest: 1.0
    });

    await image.writeAsync(outputPath);
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
