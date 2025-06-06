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

## ✨ Features

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
- Firebase Hosting / Firestore (if used)
- Apollo Client + GraphQL
- AsyncStorage
- i18next for internationalization
- Axios (for backend calls)

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/DamianIanni/76Packing.git

	2.	Navigate to the project folder:

cd 76Packing

	3.	Install dependencies:

# npm
npm install

# or yarn
yarn install


⸻

🚀 Running the Project

Start Metro bundler:

npm start
# or
yarn start

Run on Android:

npm run android

Run on iOS:

npm run ios

Make sure your emulator is running or a physical device is connected.

⸻

🔐 Environment Variables

Create a .env file in the root and include:

FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
GRAPHQL_ENDPOINT=https://your-server-url.com/graphql


⸻

📁 Project Structure

src/
│
├── components/        # Reusable UI components
├── screens/           # App screens
├── navigation/        # Navigation setup
├── store/             # Redux slices & config
├── services/          # Firebase, GraphQL services
├── i18n/              # Translations
└── utils/             # Helper functions


⸻

🧪 Testing (Optional)

Coming soon – or describe here how to run unit tests or E2E tests.

⸻

📄 License

MIT License. See LICENSE for details.

⸻

📬 Contact

Damian Ianni
📧 damiangussi@gmail.com
🔗 LinkedIn

⸻

🧩 FAQ (Optional)

Q: Do I need a Google account to use the app?
A: No, you can register using email and password. Google Sign-In is optional.

Q: Does the app work offline?
A: Some functionalities do, but a connection is recommended for full sync.

---
```
