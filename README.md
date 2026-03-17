# NGO Community App

A comprehensive web application built with React.js and Bootstrap for connecting NGOs with communities and managing requirements.

## 🚀 Features

### Core Functionality
- **User Authentication**: Login/Register for regular users and NGOs
- **NGO Management**: Registration, approval system, and profile management
- **Requirements System**: Post and search for NGO requirements
- **Search & Discovery**: Find NGOs by location, category, or name
- **Messaging System**: Direct communication between users and NGOs
- **Admin Dashboard**: Comprehensive administration panel

### Technical Features
- **React.js 19**: Modern React with hooks and functional components
- **Redux Toolkit**: State management with async thunks
- **React Router**: Client-side routing with protected routes
- **Bootstrap 5**: Responsive UI components and styling
- **Axios**: HTTP client for API communication
- **Custom Hooks**: Reusable authentication and data management hooks

## 🛠️ Tech Stack

- **Frontend**: React.js 19, Bootstrap 5, Redux Toolkit
- **Backend**: Node.js + Express with Firebase Admin
- **Database**: Firestore (via Firebase Admin SDK)
- **Authentication**: Custom auth system with localStorage
- **Deployment**: Vite build system

## 📁 Project Structure

```
src/
├── api/                       # API client helpers
│   ├── auth.js               # Auth-related calls
│   ├── ngo.js                # NGO management calls
│   ├── community.js          # Community / testimonials / misc
│   ├── requirements.js       # Requirement CRUD + search
│   ├── messages.js           # Messaging + broadcasts
│   └── index.js              # API exports
├── components/               # Reusable UI components
│   ├── Navbar.jsx            # Top navigation bar
│   ├── Footer.jsx            # Footer
│   ├── ProtectedRoute.jsx    # Route/role protection
│   ├── CustomLink.jsx        # Reusable nav links
│   └── GoogleTranslate.jsx   # Language switcher widget
├── context/
│   └── AuthContext.jsx       # Auth/session context
├── hooks/
│   └── useAuth.js            # Custom auth hook
├── pages/                    # Major pages / views
│   ├── Home.jsx              # Landing page
│   ├── AboutUs.jsx           # About the platform
│   ├── Contact.jsx           # Contact form
│   ├── Events.jsx            # Event listing
│   ├── AddEvent.jsx          # NGO event creation
│   ├── Login.jsx             # User login
│   ├── Register.jsx          # User registration
│   ├── NgoRegister.jsx       # NGO registration
│   ├── NgoDashboard.jsx      # NGO dashboard
│   ├── NgoRequirementsManage.jsx   # NGO requirements management
│   ├── Search.jsx            # NGO & requirement search
│   ├── Requirements.jsx      # Public requirements listing
│   ├── Messages.jsx          # Conversations UI
│   ├── AdminDashboard.jsx    # Admin overview
│   ├── AdminPendingRequirements.jsx # Approve/reject requirements
│   ├── Pendingngos.jsx       # Approve/reject NGOs
│   ├── AdminCommunity.jsx    # Manage testimonials, contacts, etc.
│   ├── ProfilePage.jsx       # User profile
│   ├── ConversationsList.jsx # Messages sidebar (internal)
│   ├── ChatWindow.jsx        # Chat area (internal)
│   ├── BroadcastModal.jsx    # Admin broadcast modal (internal)
│   └── TestMessaging.jsx     # Dev/test view for messaging
├── redux/
│   ├── store.js              # Redux store configuration
│   ├── authSlice.js          # Auth state
│   ├── ngoSlice.js           # NGO data
│   ├── requirementSlice.js   # Requirements state
│   └── languageSlice.js      # i18n / language selection
├── styles/
│   └── custom.css            # Custom theme overrides
├── App.jsx                   # Route layout + shells
├── main.jsx                  # React entry point
└── config.js                 # API base URL & enums
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- A **Google Firebase project** with Firestore enabled

### 1. Install dependencies

**Root (frontend):**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 2. Configure Firebase (backend)

The backend uses Firebase Admin with a **Service Account** and reads credentials from environment variables.

1. In [Firebase Console](https://console.firebase.google.com/) → your project → **Project settings** (gear) → **Service accounts** → **Generate new private key**.
2. In the project root, copy the example env file and fill it with values from the downloaded JSON:
   ```bash
   cd backend
   copy .env.example .env
   ```
3. Open `backend/.env` and set:
   - `FIREBASE_PROJECT_ID` → from the JSON `project_id`
   - `FIREBASE_PRIVATE_KEY_ID` → from `private_key_id`
   - `FIREBASE_PRIVATE_KEY` → from `private_key` (keep the key in quotes and use `\n` for newlines)
   - `FIREBASE_CLIENT_EMAIL` → from `client_email`
   - `FIREBASE_CLIENT_ID` → from `client_id`
   - `FIREBASE_CLIENT_CERT_URL` → from `client_x509_cert_url`

### 3. Run the project

**Option A – Two terminals (recommended)**

- **Terminal 1 – Frontend:** from project root  
  `npm run dev`  
  Then open **http://localhost:5173** (or the port Vite shows).

- **Terminal 2 – Backend:** from project root  
  `cd backend` then `node src/index.js`  
  Backend runs at **http://localhost:3000**.

**Option B – One command (if `concurrently` works)**  
From project root:  
`npm run dev:all`

### 4. Open the app

Navigate to **http://localhost:5173** (or the port printed by Vite). The frontend is already configured to call the backend at `http://localhost:3000` in `src/config.js`.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### API Configuration
Update `src/config.js` with your backend API URL:

```javascript
export const API_BASE_URL = 'https://your-api-endpoint.com';
```

### Backend Integration
This frontend is designed to work with the provided Firebase Functions backend. Ensure your backend is deployed and accessible.

## 📱 Features Overview

### 1. User Authentication
- **Login/Register**: Secure user authentication system
- **Role-based Access**: Different permissions for users, NGOs, and admins
- **Session Management**: Persistent login state with localStorage

### 2. NGO Management
- **Registration**: Comprehensive NGO registration form
- **Approval System**: Admin approval workflow for new NGOs
- **Profile Management**: NGO information and status tracking

### 3. Requirements System
- **Post Requirements**: NGOs can post what they need
- **Search & Filter**: Find requirements by category or description
- **Status Tracking**: Monitor requirement fulfillment status

### 4. Search & Discovery
- **Advanced Search**: Filter NGOs by city, category, and name
- **Real-time Results**: Instant search results with filtering
- **Responsive Design**: Works on all device sizes

### 5. Messaging System
- **Direct Communication**: Private messaging between users
- **Conversation Management**: Organized chat interface
- **Real-time Updates**: Instant message delivery

### 6. Admin Dashboard
- **Overview Statistics**: Platform usage metrics
- **NGO Approval**: Review and approve NGO registrations
- **System Monitoring**: Platform health and status

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern Interface**: Clean, professional design
- **Accessibility**: WCAG compliant with proper focus management
- **Custom Styling**: Enhanced Bootstrap components with custom CSS
- **Smooth Animations**: CSS transitions and hover effects

## 🔒 Security Features

- **Protected Routes**: Role-based access control
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Comprehensive error management
- **Secure API Calls**: Proper authentication headers

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push

### Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder contents to your web server
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real-time Notifications**: Push notifications for updates
- **File Upload**: Support for document and image uploads
- **Advanced Analytics**: Detailed reporting and insights
- **Mobile App**: React Native mobile application
- **Multi-language Support**: Internationalization (i18n)
- **Advanced Search**: Elasticsearch integration
- **Payment Integration**: Donation and payment processing

---

**Built with ❤️ using React.js and Bootstrap**
