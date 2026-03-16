## NGO Backend (Express + Firestore via Firebase Admin)

### Prerequisites
- Node.js 18+
- A Firebase project with a Service Account key

### Setup
1. Copy `.env.example` to `.env` and fill values from your Firebase Service Account:
   - Keep `FIREBASE_PRIVATE_KEY` quoted and preserve `\n` newlines
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Add your server code
Paste your Express server code into `src/index.js` (no Firebase Functions needed). The server listens on `PORT` (default 3000) and uses Firebase Admin to access Firestore.


