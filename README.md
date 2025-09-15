# FloodSafe SG 🌊📱
A gamified mobile application for **local disaster preparedness and response**, focused on flood awareness in Singapore.  
Built with **React Native** and **Expo**, the app educates users through interactive guides, quizzes, notifications, and gamification elements such as badges and leaderboards.

---

## ✨ Features
- 📖 **Disaster Guides** – Learn about floods, preparedness steps, and safety measures (available in English, Chinese, Malay, Tamil).  
- 🏆 **Gamification** – Earn badges, track progress, and climb the leaderboard.  
- 🔔 **Notifications** –  
  - Daily reminders  
  - Weekly tips  
  - Real-time alerts (via **Expo Notifications**)  
- 👤 **Profile Screen** – View your badges, progress, and ranking.  
- ⚙️ **Settings** –  
  - Theme switching (light/dark)  
  - Manage notifications  
  - Update password  
  - Sign out (Firebase)  
- 🌍 **APIs Integrated** –  
  - **NEA API** for Singapore weather & warnings  
  - **OpenWeather API** for real-time weather updates  

---

## 📦 Tech Stack
- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)  
- [Firebase Authentication](https://firebase.google.com/docs/auth) & Firestore  
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)  
- [react-native-tableview-simple](https://github.com/Purii/react-native-tableview-simple) (iOS-style settings)  
- [react-native-animatable](https://github.com/oblador/react-native-animatable)  (animations)
- [twrnc](https://github.com/jaredh159/tailwind-react-native-classnames) (Tailwind for RN)  
- [Jest](https://jestjs.io/) (unit testing)

---

## 🚀 Installation & Setup

Clone the repository:
```bash
git clone https://github.com/rupanraj19/cm3070-local-disaster-preparedness-and-response.git
cd cm3070-local-disaster-preparedness-and-response
```
Install dependencies:
```bash
  npm install 
```
Install Expo CLI (if not already installed):
```bash
  npm install -g expo-cli
```
Note: This project uses Expo SDK 53. Make sure your Expo Go app supports SDK 53 to run the project.
```
```
Run the project:
```bash
  npm start
  expo start
```
Open the app on your device:

- Install the Expo Go app from the App Store (iOS) or Google Play Store (Android).
- Scan the QR code shown in the terminal or browser after running expo start.
- Enjoy exploring FloodSafe SG
