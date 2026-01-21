🏠 AirNest – Property Listing Platform

AirNest is a full-stack property listing web application inspired by modern rental platforms. It allows users to explore, list, and manage properties with secure authentication, image uploads, and powerful search & filtering features.

Built using Node.js, Express, MongoDB, EJS, and Bootstrap, the project follows MVC architecture and clean modular design principles to ensure scalability, maintainability, and performance.

🚀 Features
👤 Authentication & Authorization

Secure user authentication using Passport.js

Role-based access control (Admin & User)

Protected routes and session management

Supports 200+ registered user accounts

🏘️ Property Management

Create, update, and delete property listings

Upload and manage property images using Cloudinary

Image validation and optimization

🔍 Search & Filtering

Dynamic property search

Filter listings by category, price, and location

Clean and intuitive browsing experience

🎨 User Interface

Responsive UI built with EJS and Bootstrap

Mobile-friendly design

Server-side rendering for faster page loads

⚙️ Performance & Scalability

Optimized backend APIs

Efficient MongoDB queries

Designed to handle 200+ concurrent users

🛠️ Tech Stack
Category	Technologies
Frontend	EJS, Bootstrap
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	Passport.js
Image Storage	Cloudinary
Architecture	MVC Pattern
📁 Project Structure
AirNest/
├── controllers/
├── models/
├── routes/
├── views/
│   ├── layouts/
│   ├── listings/
│   └── auth/
├── public/
│   ├── css/
│   └── js/
├── utils/
├── app.js
├── package.json
└── README.md

🔐 Environment Variables

Create a .env file in the root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret

▶️ Installation & Setup
# Clone the repository
git clone https://github.com/your-username/AirNest.git

# Navigate to the project folder
cd AirNest

# Install dependencies
npm install

# Start the server
npm start


Visit: http://localhost:3000

🧠 Key Learnings

Implemented MVC architecture in a real-world project

Hands-on experience with Passport.js authentication

Integrated Cloudinary for scalable media handling

Improved backend performance and database query optimization

Built a production-style application with clean folder structure

📌 Future Enhancements

Payment gateway integration

Reviews & ratings system

Advanced analytics dashboard for admins

Real-time notifications

👩‍💻 Author

Tannu Shri
Computer Science & Engineering Student
Aspiring Full-Stack Developer
