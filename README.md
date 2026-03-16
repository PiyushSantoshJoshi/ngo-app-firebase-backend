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
- **Backend**: Firebase Functions (Node.js/Express)
- **Database**: Firestore
- **Authentication**: Custom auth system with localStorage
- **Deployment**: Vite build system

## 📁 Project Structure

```
src/
├── api/                    # API service files
│   ├── auth.js            # Authentication APIs
│   ├── ngo.js             # NGO management APIs
│   ├── requirements.js     # Requirements APIs
│   ├── messages.js        # Messaging APIs
│   └── index.js           # API exports
├── components/            # Reusable UI components
│   ├── Navbar.jsx         # Navigation component
│   ├── Footer.jsx         # Footer component
│   ├── ProtectedRoute.jsx # Route protection
│   └── CustomLink.jsx     # Custom navigation links
├── context/               # React Context
│   └── AuthContext.jsx    # Authentication context
├── hooks/                 # Custom hooks
│   └── useAuth.js         # Authentication hook
├── pages/                 # Page components
│   ├── Home.jsx           # Landing page
│   ├── Login.jsx          # User login
│   ├── Register.jsx       # User registration
│   ├── NgoRegister.jsx    # NGO registration
│   ├── Search.jsx         # NGO search
│   ├── Requirements.jsx   # Requirements management
│   ├── Messages.jsx       # Messaging system
│   └── AdminDashboard.jsx # Admin panel
├── redux/                 # Redux store and slices
│   ├── store.js           # Redux store configuration
│   ├── authSlice.js       # Authentication state
│   ├── ngoSlice.js        # NGO state management
│   └── requirementSlice.js # Requirements state
├── styles/                # Custom CSS
│   └── custom.css         # Enhanced styling
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── config.js              # Configuration constants
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ngo-community-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update `src/config.js` with your API endpoints
   - Ensure your backend is running and accessible

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

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
FIREBASE_PROJECT_ID=piyush-techno
FIREBASE_PRIVATE_KEY_ID= 7eba37b125483e03dcde171caa60002bc794521d
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBmyC3NFsDkbNV\nRVENZUqEpqz7GIuOtLYiYVjxfC1ypl39bmC3EZuowIPPhckCREXMCuwJnDvPqHB2\nLpAWMsOC2HqeaPVDp/sfYgUR4IY4+YnI9n9k36J8HsLIbcOf0C7mRfs91/NXWouz\ndwpSuQAXxj3upaBYxjMietU6vcW5cFIoBgukCM+gy6GV2hkoDsuRvtonecbfaVBP\nYJ51gz8vEIqDd81fZMxcrvgxaixuT2rXcf/Vuc9vBDl/1GEHl2kZeu8I2T9GZxjt\nqbeKSVb3B3fR+2TDwo8Ez5nwlAL73GEq9hACHRG8IncPflO+vew21L5VmktyCe20\niN4ViVZhAgMBAAECggEALneemwoYXBtwuOMZqIbqozrj4qJKAJbT7h2CPPdqaw2O\nGoEO+nFh9Fc8a6b3DzG2tNncPBRA8L7DO0JCt+k4LqPpjjKvxyy+o5IhmGBUpsER\ntmefPOVF+NdjNbrOjIFpeEBMpFO75nfndsv38NHROWONwsUC3ru3Uyu7GM2qcq6c\nwHSdzqPfaa3gGogfk2WptCEyxoakDvD7HTzx6vOHu16Z1/Wsgf392Zce9vLmrBNr\ntw2ZnmL4rHew26LXPko3PMr5Nahc1g96MgkveT+Pz0V0g6L5/NQ8t3n/9bNIQY3D\n9yjnjwQcJMJeZ16e0iN5NFfqhjDyiY0w0+Ra5aXKyQKBgQD27LboC/IbZK+Pi9M/\nuBaMTd0a2L7pT6ZOgobRR1+1o8jPyjtstXruqhClqnZ39eZSgugwQnmqJGvVg7CG\n8W0ZhKBimCn2R66TVknsFG80l6Ex7JfyFpvxjcYur5kCGc2qv7OlmBSvYj0IQeU9\nlJ8M5jGbboVRcb2I4jRAhlZCPQKBgQDIuL5usQ1FkBvxnMjEG8QuaFC6pjGoDCsa\nHJka77uLUdb61JYBYM45qL1qR5Qmzb1YxalqFWSy3J4+i/ftXtnMGCh/lrweQfkG\nNJosb9qndRDIfIL0YmU5kIto3cNiQotbAsRWL3rq/9ykPzClVTRLAKSWRG/JxyT+\nYFYdwCTa9QKBgF6CY8+VIumRNBEBN63fy+GPu90WsJukPMc39loLs3pWYfoGMZB+\nNbs7pHuELyvjFnDmYfB2wRJ6NjvW164Ooe9ub+TM0OLOtOb30/tkJtw+XRg6sj2a\nob1mwkAEPdAsCCgej6gF+YTXWPzcG93iEK5jPQF839I4co795Xn88O8RAoGBAJ1U\nOWf3/UgeOdj7JF6ayP37I/P5Goj26L3x1oxHhoAgaNp40Q9Jeru1KKrqahS0RQsU\n+8K7/A86YAr0mSOEqkCQWwYO92rcGT4k8weLsR564unStq6phWBGjQ9oa6JUOHjg\nxVYspzMV1DMlmJKvI2r6mQdzow/MuZFtn3J4TisVAoGBAMIcQTjzyMX/kNGbAtoN\n5Ptx9jxBCUat1DdwQb4xzygzA4gmuoSnit2oezUIEC2tRJDh8FDZWk9O95w+Euv4\nQ41HJBtcnGHxqN7Hz/EZHkotAr250j2CBdnTVf5VI4OrT1OpgzxnNvBvsAH/cDkH\nivzoDMiQKmRw8CcvVED6qmo1\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@piyush-techno.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=109561263202776812284
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40piyush-techno.iam.gserviceaccount.com
PORT=3000
