# M.Dev Portfolio

## Live Deployment Link
[Visit the Live Site](https://next-portfolio-client-phi.vercel.app) 

## Project Overview & Features
This portfolio project showcases a modern, full-stack web application designed to highlight personal projects, blogs, and professional details. It features a sleek and responsive user interface with a dashboard for managing content.

### Key Features:
- **Responsive Design**: Optimized for all devices, including mobile, tablet, and desktop.
- **Amazing UI**: A visually appealing and intuitive interface built with modern design principles.
- **Dashboard**: Centralized hub for managing blogs and projects.
- **Blog Management**: Full CRUD (Create, Read, Update, Delete) functionality for blog posts.
- **Project Management**: Full CRUD functionality for showcasing and managing projects.
- **Secure Authentication**: JWT-based authentication system using NextAuth for secure user access.

## Technology Stack
- **Frontend**:
  - React
  - Next.js
  - Shadcn (UI components)
  - Tailwind CSS (styling)
  - Redux (state management)
- **Backend**:
  - Node.js
  - NextAuth (authentication)
- **Other**:
  - JWT (JSON Web Tokens) for secure authentication

## Setup Instructions
Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mohibbullah272/rep.git
   cd your-repo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   JWT_SECRET=your-jwt-secret
   ```
   Replace `your-nextauth-secret` and `your-jwt-secret` with secure random strings.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

