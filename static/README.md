# 📚 ReadEase AI

ReadEase AI is a simple web-based document reader that converts PDF documents into readable text and uses Text-to-Speech technology to read the content aloud.

It is designed to make digital documents easier to consume, especially for students and users who prefer listening instead of reading.

---

## ✨ Features

- 📄 Upload PDF documents
- 📝 Extract text from PDFs
- ✍️ Enter or paste custom text
- 🔊 Convert text into speech
- ▶️ Start reading
- ⏸️ Pause speech
- ▶️ Resume speech
- ⏹️ Stop speech
- 🎚️ Adjust speech speed
- 📋 Copy extracted text
- 🧹 Clear content
- 🔢 Word counter
- 📱 Responsive interface
- 🖥️ Simple and beginner-friendly architecture

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask

### PDF Processing
- PyMuPDF

### Text-to-Speech
- Browser Web Speech API (`SpeechSynthesis`)

---

## 📁 Project Structure

```text
ReadEase-AI/
│
├── app.py
├── requirements.txt
├── .env
├── .gitignore
├── README.md
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── uploads/
```

---

## ⚙️ Requirements

Make sure you have:

- Python 3.10 or higher
- VS Code
- A modern web browser such as Chrome, Edge, or Firefox

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/ReadEase-AI.git
```

Go into the project folder:

```bash
cd ReadEase-AI
```

---

### 2. Create a virtual environment

Windows:

```powershell
python -m venv venv
```

Activate it:

```powershell
venv\Scripts\activate
```

---

### 3. Install dependencies

```powershell
pip install -r requirements.txt
```

---

### 4. Run the application

```powershell
python app.py
```

The application will run at:

```text
http://127.0.0.1:5000
```

Open the address in your browser.

---

## 🔄 How It Works

```text
        User
          ↓
    Upload PDF / Enter Text
          ↓
       Flask Backend
          ↓
      PDF Extraction
          ↓
       Extracted Text
          ↓
     Web Application
          ↓
      SpeechSynthesis
          ↓
        🔊 Audio
```

### PDF Workflow

1. User selects a PDF.
2. The PDF is sent to the Flask backend.
3. PyMuPDF extracts the text.
4. Extracted text is returned to the frontend.
5. JavaScript displays the text.
6. The browser SpeechSynthesis API reads the text aloud.

---

## 🔊 Text-to-Speech

ReadEase AI uses the browser's built-in Web Speech API.

This means:

- No external TTS API is required.
- No API key is required.
- No paid AI service is required.
- Speech generation happens through the user's browser.

Speech speed can be adjusted between `0.5x` and `2x`.

---

## 📄 Supported PDFs

ReadEase AI works best with **text-based PDFs**.

For example:

- Study notes
- Digital textbooks
- Lecture notes
- Articles
- Reports
- Assignments
- Documentation

Scanned/image-only PDFs may not contain extractable text and therefore may require OCR in a future version.

---

## 🔐 Environment Variables

The current version does not require external API keys.

A `.env` file is included for future configuration:

```env
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=change-this-to-a-random-secret
```

Do not store real passwords, API keys, or other secrets in GitHub.

---

## 🔒 Security Notes

For a production version, additional security should be added, including:

- File size restrictions
- File type validation
- Secure filename handling
- Authentication
- User-specific document storage
- Automatic file cleanup
- HTTPS
- Production secret keys
- Rate limiting

---

## 🚀 Future Improvements

Possible future versions can include:

- 🤖 AI document summarization
- 💬 Ask questions about a PDF
- 🎤 Speech-to-Text
- 🌐 Multi-language support
- 👤 User authentication
- 📚 Personal document library
- 🔖 Bookmarks
- 📊 Reading progress
- 🧠 AI-generated summaries
- 🔎 PDF search
- 🌙 Dark mode
- 📱 Progressive Web App support
- ☁️ Cloud document storage

---

## 🎯 Project Purpose

ReadEase AI demonstrates how a simple full-stack application can combine:

**Frontend + Backend + PDF Processing + Text-to-Speech**

The project is especially useful for learning Flask, JavaScript, file uploads, PDF processing, and browser speech technologies.


---

## 📜 License

This project is open-source and available for educational and personal use.