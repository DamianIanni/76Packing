# 🎒 Packing76

Packing76 is a mobile application that helps users organize and manage their luggage when preparing for trips. It includes travel planning, packing list customization, and storage of travel preferences.

![Platform](https://img.shields.io/badge/platform-React%20Native-blue)
![License](https://img.shields.io/github/license/DamianIanni/76Packing)
![Firebase](https://img.shields.io/badge/backend-Firebase-orange)

## 📚 Table of Contents

- [📱 Screenshots / Demo](#-screenshots--demo)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#-technologies-used)
- [⚙️ Installation](#️-installation)
- [🚀 Running the Project](#-running-the-project)
- [🔐 Environment Variables](#-environment-variables)
- [📁 Project Structure](#-project-structure)
- [🧪 Testing (Optional)](#-testing-optional)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## 📱 Screenshots / Demo

<img src="screenshots/home.png" width="250" /> <img src="screenshots/luggage.png" width="250" />

### 🎥 YouTube Demo

[![Watch the video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

---

## 🌐 Backend & Database

This app is powered by a custom backend server and database, also designed and implemented by me:

- **Backend:** Node.js + TypeScript server deployed on Render
- **Database:** Normalized SQL database hosted on Railway
- **API:** GraphQL with Apollo Client integration in the app

👉 [View the backend repository](https://github.com/DamianIanni/76Packing_server)

The server handles AI-powered packing recommendations, user data storage, and synchronizes data with the app in real-time.

---

## ✨ Features

- 🤖 AI-powered packing recommendations using Mistral via OpenRouter
- 🔐 User authentication (Email/Password, Google Sign-In)
- 🔁 Password reset via email
- 🧳 Packing list management with custom luggage types
- 🌍 Travel planning: destination, number of days, seasons
- 🛌 Accommodation and activities tracking
- 🗣️ Multi-language support (English, Spanish, German)
- ⚙️ User profile and preference settings
- ☁️ Cloud sync using Firebase
- 🔎 GraphQL data fetching with Apollo Client

---

## 🛠️ Technologies Used

- React Native + TypeScript
- Redux Toolkit for state management
- React Navigation
- Firebase Authentication
- Apollo Client + GraphQL
- AsyncStorage
- i18next for internationalization
- Axios (for backend calls)

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DamianIanni/76Packing.git
   ```

2. Navigate to the project directory:

   ```bash
   cd 76Packing
   ```

3. Install dependencies:

   ### Using npm

   ```bash
   npm install
   ```

   ### or using Yarn

   ```bash
   yarn install
   ```

---

# 🚀 Running the Project

1. Start Metro Bundler:

   ### Using npm

   ```bash
   npm start
   ```

   ### or using Yarn

   ```bash
   yarn start
   ```

2. Run on Android:

   ### Using npm

   ```bash
   npm run android
   ```

   ### or using Yarn

   ```bash
   yarn android
   ```

3. Run on iOS (Mac only, with Xcode installed):

   ### Using npm

   ```bash
   npm run ios
   ```

   ### or using Yarn

   ```bash
   yarn ios
   ```

✅ Make sure you have an emulator running or a physical device connected before launching the app.

---

# 🔐 Environment Variables

Create a .env file in the root and include:

<pre>
API_KEY=your_firebase_web_api_key
PROJECT_ID=your_firebase_project_id
STORAGE_BUCKET=your_project_id.appspot.com
MESSAGING_SENDER_ID=your_messaging_sender_id
ANDROID_APP_ID=your_android_app_id
IOS_APP_ID=your_ios_app_id
WEB_CLIENT_ID=your_oauth_web_client_id
SERVER_URL=your_server_url
</pre>

These credentials correspond to a Firebase project.
To get them:

- 1 Create a Firebase project at https://console.firebase.google.com.
- 2 Enable Authentication (Email/Password and Google Sign-In).
- 3 Add Android and iOS apps to your Firebase project and copy the config.
- 4 Enable Firestore and/or other Firebase services as needed.

---

## 📁 Project Structure

<pre>
src/
│
├── api/            # API queries and mutations
├── assets/         # Assets (images, icons, fonts, etc.)
├── components/     # UI components
├── classes/        # Theme & styles
├── views/          # App screens
├── navigation/     # Navigation setup
├── store/          # Redux slices & config
├── i18n/           # Translations
└── utils/          # Helper functions
</pre>

---

## 🧪 Testing

Coming soon

---

## 📄 License

MIT License. See LICENSE for details.

---

## 📬 Contact

**Damian Ianni**

📧 damiangussi@gmail.com

[🔗 LinkedIn](https://www.linkedin.com/in/damian-ianni-b50555205/)

---

## 🧩 FAQ (Optional)

<pre>
Q: Do I need a Google account to use the app?
A: No, you can register using email and password. Google Sign-In is optional.
</pre>
