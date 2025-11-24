# MamaSafe Frontend

A production-grade React application for analyzing drug interactions in healthcare settings. Built with modern technologies and best practices for scalability, accessibility, and performance.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - Latest React with concurrent features
- **Vite** - Fast build tool and development server
- **TypeScript** - Type safety and better developer experience
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful, customizable icons
- **Axios** - HTTP client for API calls

## 🔧 Backend Integration

The frontend connects to the MamaSafe backend API:
- **Base URL**: `https://ahead-hackathon.onrender.com/api/v1`
- **Authentication**: JWT tokens with OAuth2 flow
- **Real-time**: Medication safety checking
- **Patient Management**: Full CRUD operations
- **Appointments**: Scheduling and management

## 📱 Features

- **Multi-Drug Analysis**: Real-time drug interaction checking
- **Patient Management**: Complete patient lifecycle
- **Appointment System**: Scheduling and calendar management
- **Authentication**: Secure login/registration
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System preference detection
- **Accessibility**: WCAG 2.1 AA compliant

## 🏗️ Project Structure

```
src/
├── components/           # Component library
│   ├── ui/              # Primitive components
│   ├── layouts/         # Page layouts
│   ├── screens/         # Full screen components
│   └── sections/        # Complex sections
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── types/               # TypeScript definitions
├── utils/               # Helper functions
├── constants/           # App constants
├── data/                # Mock data
└── styles/              # Global styles
```

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://ahead-hackathon.onrender.com/api/v1
VITE_APP_VERSION=1.0.0
```

## 🚀 Deployment

The app is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Any static hosting service**

## 📄 License

This project is licensed under the MIT License.