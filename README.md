# Lidor Pahima — Portfolio Website
<div align="center">
  <pre>
    _____           _    __      _ _       
   |  __ \         | |  / _|    | (_)      
   | |__) |__  _ __| |_| |_ ___ | |_  ___  
   |  ___/ _ \| '__| __|  _/ _ \| | |/ _ \ 
   | |  | (_) | |  | |_| || (_) | | | (_) |
   |_|   \___/|_|   \__|_| \___/|_|_|\___/ 
  </pre>
</div>

Welcome to my **personal portfolio website**! Here you can explore my skills, projects, education, and contact me directly. Built with **React**, **Vite**, and modern web technologies for a fast, beautiful experience.

---

## Demo

![Portfolio Demo](https://i.ibb.co/TqRPKqt1/image.png)

---

## Live Preview

Check out the live preview of my portfolio website here:  
[**Live Demo**](https://lidorpahima.com)

---
### 🎯 Project Structure
```bash
portfolio/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── index.css
│   │   │   └── tomorrow.css
│   │   └── images/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Reusable Components/
│   │   │   │   ├── badge.jsx
│   │   │   │   ├── button.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   ├── EducationLoader.jsx
│   │   │   │   ├── evervault-card.jsx
│   │   │   │   ├── flip-words.jsx
│   │   │   │   ├── icon-cloud.jsx
│   │   │   │   ├── meteors.jsx
│   │   │   │   ├── sparkles-text.jsx
│   │   │   │   └── tooltip.jsx
│   │   │   │
│   │   │   ├── Main Components/
│   │   │   │   ├── AnimatedGrid.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── Education.jsx
│   │   │   │   ├── enhanced-portfolio-card.jsx
│   │   │   │   ├── Experience.jsx
│   │   │   │   ├── global.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── PortfolioPage.jsx
│   │   │   │   ├── Projects.jsx
│   │   │   │   └── Skills.jsx
│   │   └── lib/
│   │       └── utils.js
│   ├── pages/
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   ├── Experience/
│   │   │   └── Experience.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Hero/
│   │   │   └── Hero.jsx
│   │   ├── Projects/
│   │   │   └── Projects.jsx
│   │   └── Skills/
│   │       └── Skills.jsx
│   ├── App.jsx
│   └── main.jsx
├── Configuration Files/
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── components.json
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js

```
---

## Sections of the Portfolio

The portfolio website consists of the following sections:

- **Home**: Introduction and a brief overview.
- **Skills**: My technical skills and strengths.
- **Experience**: My professional journey and work experience.
- **Education**: Academic background and certifications.
- **Projects**: A showcase of the projects I've worked on.
- **Contact**: Information on how to reach out to me.

---

## 💻 Technologies Used
- **Frontend:** React.js with Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **AI Chat:** LLM Integration (OpenAI/Anthropic)
- **Deployment:** Vercel

---

## Installation ⬇️

You will need to download **Git** and **Node** to run this project.

### Git

- Download and install Git from the official website: [Git Downloads](https://git-scm.com/)
- Verify the installation:
  ```bash
  git --version
  ```

### Node

- Download and install Node.js from the official website: [Node.js Downloads](https://nodejs.org/)
- Make sure you have the latest version of both Git and Node on your computer.
- Verify the installation:
  ```bash
  node --version
  ```

# Getting Started 🎯

### Fork and Clone the Repository 🚀
1. Click the **Fork** button at the top-right corner of the page to create your own copy of the repository.
2. After forking, open your terminal and run the following commands to clone the repo:

  ```bash
  git clone https://github.com/Lidorpahima/My-Portfolio-website.git
  ```
Navigate to the Project Directory 📂
Once the repository is cloned, change your directory to the project folder:
```bash
cd portfolio
```

Install Dependencies ⚙️
From the root directory of your project, install the necessary packages:
```bash
npm install
```

Run the Development Server 🚀
Start the development server to see your project live:
```bash
npm run dev
```

View the Project 🌐
Open your browser and visit http://localhost:5173/ to see the result! 🎉

---

## 🤖 AI Chat Widget Setup

The portfolio includes an AI-powered chat widget with RAG (Retrieval Augmented Generation) that appears on all pages. The chat uses Google Gemini and has built-in knowledge about Lidor's background, experience, and projects.

### 1. Get a Gemini API Key
Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 2. Configure Environment Variables
Create a `.env` file in the root directory:

```bash
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Ntfy.sh topic for receiving contact messages (optional)
# If not set, defaults to "mysite"
NTFY_TOPIC=mysite
```

**Important:** Make sure the `.env` file is in the root directory (same level as `package.json`).

**Ntfy.sh Setup (Optional):**
If you want to receive contact messages via ntfy.sh:
1. Go to [ntfy.sh](https://ntfy.sh) and create a topic (or use an existing one)
2. Set `NTFY_TOPIC` to your topic name
3. When users want to contact you through the chat, the AI will collect their name, phone, and message
4. You'll receive a notification on your ntfy.sh topic

### 3. Local Development

**✅ Good News:** The chat widget now works in local development! A Vite plugin handles API routes automatically.

**To run locally:**
```bash
# Make sure you have GEMINI_API_KEY in your .env file
npm run dev
```

The API route `/api/chat` will be automatically handled by the Vite plugin.

**Note:** If you prefer using Vercel CLI:
```bash
# Install Vercel CLI globally
npm i -g vercel

# Run Vercel dev server
vercel dev
```

### 4. Deploy to Vercel
When deploying to Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your API key as `GEMINI_API_KEY`
4. (Optional) Add `NTFY_TOPIC` if you want to receive contact messages
5. Redeploy your application

The chat widget will automatically appear as a floating button in the bottom-right corner of all pages.

**Features:**
- ✅ Responsive design (mobile-friendly)
- ✅ RAG (Retrieval Augmented Generation) with knowledge base about Lidor
- ✅ Conversation history saved in localStorage
- ✅ Powered by Google Gemini
- ✅ Professional and helpful responses
- ✅ Rate limiting to prevent abuse (10 requests per minute per IP)
- ✅ Contact form integration - AI can collect contact details and send to ntfy.sh

**Rate Limiting:**
The chat API includes rate limiting to prevent abuse:
- **Default**: 10 requests per minute per IP address
- **Configurable**: Set `RATE_LIMIT_MAX_REQUESTS` and `RATE_LIMIT_WINDOW_MS` in environment variables
- **Response**: Returns 429 status with `Retry-After` header when limit is exceeded

**Note**: The API route is located at `/api/chat.js` and uses Vercel Serverless Functions. The knowledge base includes information about Lidor's experience, projects, skills, and achievements.

---

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

### 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center"> Made with ❤️ by Lidor Pahima </div>

