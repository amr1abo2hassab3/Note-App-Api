# 📦 React Notes Manager App

A clean React + TypeScript application to manage a list of personal notes.  
You can **add**, **edit**, **delete**, and **view** notes — each with **title**, **content**, **created date**, and **updated date**.

✅ Display authenticated user notes  
✅ Add new note via modal form  
✅ Edit existing notes via modal form  
✅ Delete notes with confirmation dialog  
✅ Form validation using Formik & Yup  
✅ Protected routes for authenticated users  
✅ Real-time notes count update  
✅ Error handling with user-friendly UI  
✅ Toast notifications with react-hot-toast  

Built With: React 19, TypeScript, Vite, React Router DOM, Formik & Yup, Tailwind CSS, Axios, React Query (TanStack), jwt-decode, react-hot-toast  

Install & Run:  
1. `npm install`  
2. `npm run dev`  
3. `npm run build`  

State Management:  
Handled with React useState hooks and React Query including modal states, notes list from API, forms states, validation errors, loading and error states.  

Project Structure:

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

Main Files:  
`HomePage.tsx` — main notes CRUD logic and UI  
`Login.tsx` — login page with validation and auth  
`Register.tsx` — user registration page  
`router/index.tsx` — routing with protected routes  
`Components/ui/Modal.tsx` — reusable modal component  
`Components/NoteCard.tsx` — single note card render  
`validation/index.ts` — validation schemas and functions  
`config/axios.config.ts` — axios instance with interceptors  

Future Improvements:  
Offline support with localStorage caching, search/filter notes, pagination or infinite scroll, dark mode toggle, categories or tags, animations with Framer Motion, multi-language support.  

Demo: [https://your-demo-link.vercel.app/](https://note-app-api-red.vercel.app/)
