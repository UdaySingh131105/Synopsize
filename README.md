
# 📘 Synopsize - PDF Summarizer

A web application built with **Next.js** that allows users to upload PDF documents and generate concise summaries using **OpenAI**. The app supports both text extraction and OCR for scanned PDFs.

#### Live Link - [Synopsize - AI-Powered Text & PDF Summarizer](https://synopsize-six.vercel.app/)
---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Run the Development Server](#run-the-development-server)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Scripts](#-scripts)
- [API Reference](#-api-reference)
- [Components](#-components)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features
- 📂 Upload **PDF and image files** for summarization  
- 📖 Extract text from PDFs using **pdf-parse**  
- 🔎 OCR support for scanned PDFs/images via **tesseract.js** or external **OCR API**  
- 🤖 Summarize extracted text using **OpenAI API**  
- ⚙️ Customizable summary options (**length, tone, focus**)  
- 📱 Responsive UI with **Tailwind CSS**  
- 📝 Markdown rendering for summaries  
- ☁️ Cloud upload support via **Cloudinary**  

---

## 🛠 Tech Stack
- **Frontend:** React, Next.js (App Router)  
- **Styling:** Tailwind CSS  
- **PDF Parsing:** pdf-parse  
- **OCR:** tesseract.js, external OCR API  
- **AI Summarization:** OpenAI API  
- **Markdown Rendering:** marked  
- **UI Components:** shadcn/ui  
- **Icons:** lucide-react  
- **Cloud Storage:** Cloudinary  

---

## 📂 Project Structure
```bash
├── .env                  # Environment variables
├── components.json       # shadcn/ui config
├── next.config.mjs       # Next.js config
├── package.json
├── postcss.config.mjs
├── public/               # Static assets (SVGs, etc.)
├── src/
│   ├── app/
│   │   ├── actions/      # Server actions (extract, summarize, upload)
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── summarize/route.js    # Summarization API
│   │   │       ├── upload/route.js       # File upload API
│   │   │       └── upload/cloud/route.js # Cloud upload API
│   │   ├── components/   # React UI components
│   │   ├── lib/          # Utility functions (cloudinary, file helpers)
│   ├── summary/          # Summary page
├── README.md
└── ...
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js >= 18
- npm, yarn, pnpm, or bun

---

### Installation

Clone the repository:
```bash
git clone git@github.com:UdaySingh131105/Synopsize.git
cd synposize
```

---

### Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
---

### Environment Configuration
```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_SUMMARY_MODEL=gpt-4o-mini
OCR_SPACE_API_KEY=your_ocr_api_key
BACKEND_OCR_ENDPOINT=https://api.ocr.space/parse/image
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
---
### Run the Development Server
```bash
npm run dev
```
---

## 💻 Usage

1. Open the app in your browser → http://localhost:3000
2. Upload a PDF or image file
3. Choose summary options (length, tone, focus)
4. Click Generate to get a Markdown summary
5. Copy or download the summary as needed

---

## ⚙️ Configuration
- Environment Variables: See .env section above
- Cloudinary: Used for cloud file storage
- OCR: Uses external API for image text extraction
---

## 📜 Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
```
---

## 📡 API Reference

### 1. **Upload File**
**Endpoint:** `POST /api/v1/upload`  

- **Description:** Uploads a PDF or image file to the server.  
- **Request:** `multipart/form-data` with field `file`  
- **Response:**
```json
{
  "ok": true,
  "url": "<file_url>"
}
```
---

### 2. **Upload File to Cloudinary**

**Endpoint:**  `POST /api/v1/upload/cloud`

**Description:**  Uploads a file to **Cloudinary**.

**Request:**  
- Content-Type: `multipart/form-data`  
- Field: `file`

**Example cURL Request:**
```bash
curl -X POST http://localhost:3000/api/v1/upload/cloud \
  -F "file=@/path/to/your/file.pdf"
```

- **Response:**
```json
{
  "url": "<cloudinary_url>"
}
```
---

### 3. **Summarize File**

**Endpoint:**  `POST /api/v1/summarize`

**Description:**  Summarizes the text content of a file using AI.

**Request Body:**
```json
{
  "fileUrl": "string",
  "options": { 
    "length": "short|medium|long", 
    "tone": "neutral|formal|casual", 
    "focusOn": "optional focus"
  }
}
```
**Example cURL Request:**
```bash
curl -X POST http://localhost:3000/api/v1/summarize \
  -H "Content-Type: application/json" \
  -d '{
        "fileUrl": "https://example.com/sample.pdf",
        "options": {
          "length": "medium",
          "tone": "neutral",
          "focusOn": "introduction"
        }
      }'

```
- **Response:**
```json
{
  "ok": true,
  "summary": "<markdown_html>"
}
```
---

## 🧩 Components

- navbar.jsx → Top navigation bar
- footer.jsx → Footer section
- uploadFiles.jsx → File upload UI
- summarize.jsx → Summary generation UI
- summaryOptions.jsx → Options for summary customization
- ui/button.jsx → Reusable button component

---

## 🤝 Contributing

1. Fork the repository

2. Create your feature branch:
```bash
git checkout -b feature/fooBar
```
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
---

## 📬 Contact / Author

**Author:** Uday Singh  

- **GitHub:** [UdaySingh131105](https://github.com/UdaySingh131105)  
- **Email:** [udaysingh131105@gmail.com](mailto:udaysingh131105@gmail.com)  

If you’d like to report issues or request features, please open an issue on the GitHub repository:  
👉 [Synopsize Issues](https://github.com/UdaySingh131105/Synopsize/issues)

---

© 2025 **Synposize**. All rights reserved.
