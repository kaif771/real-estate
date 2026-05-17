# Detailed Project Report: FlexoSpaces

## 1. Project Title
**FlexoSpaces**: Smart Co-Working Space Management Web Application

## 2. Project Overview
FlexoSpaces is a comprehensive, full-stack web platform designed to seamlessly connect workspace seekers with space owners. The platform allows freelancers, startups, and enterprise teams to discover, evaluate, and book co-working spaces based on their specific requirements (capacity, budget, amenities, and location). Concurrently, it empowers property owners to list and monetize their underutilized real estate.

## 3. Objectives
* Provide a centralized platform for discovering and booking flexible workspaces.
* Enable role-based access control to separate the experience of Workspace Seekers and Space Owners.
* Provide space owners with a dashboard to list properties and manage booking requests.
* Deliver an intuitive, premium, and responsive user interface.
* Automate email notifications for booking confirmations.

## 4. Technology Stack
* **Frontend:** React.js, Vite, Tailwind CSS v4, Lucide React (Icons), React Router.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB Atlas (Mongoose ODM).
* **Authentication:** JSON Web Tokens (JWT).
* **Email Service:** Resend API.
* **Deployment:** Vercel (Configured as a Monorepo handling both Frontend and Backend).

## 5. Core Features & Modules
### 5.1. User Roles & Authentication
* **Workspace Seekers (Users):** Can browse spaces, apply filters, and request bookings.
* **Space Owners:** Can list new workspaces, define pricing, and manage incoming bookings.
* **Authentication:** Secure login and registration flows utilizing JWT for session management.

### 5.2. Search & Discovery
* Real-time search functionality allowing users to filter workspaces by city, space type (e.g., Shared Desk, Private Cabin, Meeting Room), capacity, and budget.
* Detailed workspace pages showcasing image galleries, amenities, and pricing.

### 5.3. Booking Management
* Users can select check-in and check-out dates to request a booking.
* The system calculates the total price and stores the booking request in the database.
* Integrated with the **Resend API** to trigger automated confirmation emails upon successful booking requests.

### 5.4. Role-Based Dashboards
* **User Dashboard:** Displays a history of active and past bookings.
* **Owner Dashboard:** Displays listed properties and provides a comprehensive form to add new workspace listings to the platform.

### 5.5. Business & Marketing Pages
* Premium, interactive landing pages designed for B2B conversions:
  * **Enterprise Solutions:** Tailored offerings for large teams.
  * **List Your Space:** A marketing funnel to acquire new Space Owners.
  * **About Us & Contact Us.**

## 6. System Architecture
The application follows a standard Client-Server architecture:
1. **Client Tier:** A React Single Page Application (SPA) that manages the UI state and communicates with the backend via Axios interceptors.
2. **Application Tier:** An Express.js REST API that handles business logic, authentication validation, and external API integrations (Resend).
3. **Data Tier:** MongoDB Atlas providing a scalable, cloud-based NoSQL database solution.

## 7. Deployment Strategy
The project utilizes **Vercel** for hosting. Using a custom `vercel.json` configuration, the repository is deployed as a Monorepo where:
* The `frontend` directory is built and served using Vite.
* The `backend` directory is deployed as Serverless Functions, accessible via the `/_/backend` routing prefix, completely eliminating CORS issues and infrastructure overhead.

## 8. Conclusion
FlexoSpaces successfully bridges the gap in the flexible real estate market by providing a highly scalable, secure, and user-friendly platform. The usage of modern web technologies ensures the platform is fast, responsive, and ready for production-level traffic.
