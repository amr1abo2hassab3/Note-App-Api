📦 React Notes Manager App
A clean React + TypeScript application to manage a list of personal notes.
You can add, edit, delete, and view notes — each with title, content, created date, and updated date.

📌 Features
✅ Display authenticated user notes
✅ Add new note via modal form
✅ Edit existing notes via modal form
✅ Delete notes with confirmation dialog
✅ Form validation using Formik & Yup
✅ Protected routes for authenticated users
✅ Real-time notes count update
✅ Error handling with user-friendly UI
✅ Toast notifications with react-hot-toast

📦 Built With
React 19

TypeScript

Vite

React Router DOM

Formik & Yup

Tailwind CSS

Axios

React Query (TanStack)

jwt-decode

react-hot-toast

📦 Install & Run
1️⃣ Install dependencies:
bash
نسخ
تحرير
npm install
2️⃣ Run development server:
bash
نسخ
تحرير
npm run dev
3️⃣ Build production version:
bash
نسخ
تحرير
npm run build
📌 State Management
App state is handled using React useState hooks and React Query:

Modal open/close states

Notes list state fetched from API

Add / edit note form states

Form validation errors

Loading and error states

📁 Project Structure
vbnet
نسخ
تحرير
src/
├── assets/
├── Components/
│   ├── auth/
│   ├── errors/
│   ├── ui/
├── config/
├── context/
├── data/
├── hooks/
│   ├── custom/
├── interface/
├── lib/
├── pages/
│   ├── Layout.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── HomePage.tsx
│   └── PageNotFound.tsx
├── router/
│   └── index.tsx
├── types/
├── validation/
└── main.tsx
📌 Main Files
HomePage.tsx — main logic for notes CRUD and UI

Login.tsx — login page with form validation and auth

Register.tsx — user registration page

router/index.tsx — app routing with protected routes

Components/ui/Modal.tsx — reusable modal component

Components/NoteCard.tsx — renders single note card

validation/index.ts — validation schemas & functions

config/axios.config.ts — axios instance with interceptors

📌 Future Improvements
Offline support with localStorage caching

Search and filter notes

Pagination or infinite scroll

Dark mode toggle

Add categories or tags to notes

Animations with Framer Motion

Multi-language support

📎 Demo
https://your-demo-link.vercel.app/

