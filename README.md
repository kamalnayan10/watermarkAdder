
## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (Ensure you have the latest version installed)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## 🚀 Setup Instructions

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Install the necessary packages:
    ```sh
    npm install
    ```

3. Run the backend server:
    ```sh
    node server.js
    ```

### Frontend

1. Navigate to the project root directory where `package.json` is located:
    ```sh
    cd ..
    ```

2. Install the necessary packages:
    ```sh
    npm install
    ```

3. Run the frontend server:
    ```sh
    npm run dev
    ```

## 📦 Packages Used

### Backend

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `cors`: Express middleware to enable CORS with various options
- `multer`: Middleware for handling `multipart/form-data`, which is primarily used for uploading files
- `sharp`: High-performance image processing in Node.js
- `jimp`: Image processing library for Node

### Frontend

- `react`: JavaScript library for building user interfaces
- `axios`: Promise based HTTP client for the browser and Node.js
- `prop-types`: Runtime type checking for React props
- `vite`: Next generation frontend tooling

## 📝 How to Use

1. **Upload an Image**: Use the frontend interface to upload your desired image.
2. **Enter Watermark Text**: Type in the text you want to appear as a watermark.
3. **Select Watermark Template**: Choose from the available watermark templates.
4. **Create Watermark**: Click the "Create" button to generate the watermarked image.
5. **Download Image**: Download the watermarked image directly from the interface.
