// -------------------------------- BOT RESPONSE ---------------------------------
export function generateFloodBotResponse(message) {
  const lower = message.toLowerCase();

  // Greetings
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
    return "Hi there! 👋 Welcome to FloodSafe SG. I'm your FloodSafe assistant. How can I help you prepare for floods today?";
  }

  if (lower.includes("welcome")) {
    return "Welcome! Explore the guides, play quizzes, and earn badges to stay prepared for floods.";
  }

  // Evacuation
  if (lower.includes("evacuation") || lower.includes("evacuate")) {
    return "During an evacuation, follow official alerts, take your emergency bag, and move to the nearest safe shelter. You can check the 'Emergency Contacts' or 'Flood Guide' section for shelter locations.";
  }

  // Emergency bag
  if (lower.includes("emergency bag") || lower.includes("pack")) {
    return "Your emergency bag should include water, non-perishable food, flashlight, first-aid kit, important documents, phone charger, and any essential medications.";
  }

  // Shelters
  if (lower.includes("shelter")) {
    return "You can find the nearest shelters in the 'Emergency Contacts' or 'Flood Guide' section. Always follow official alerts before heading there.";
  }

  // Alerts & warnings
  if (lower.includes("alert") || lower.includes("warning") || lower.includes("notification")) {
    return "Flood alerts are issued by PUB and SCDF. Make sure real-time notifications are turned on in your app settings. You can also check the 'Alerts' page for past and current alerts.";
  }

  // First aid
  if (lower.includes("first aid") || lower.includes("aid")) {
    return "Basic first aid includes treating minor cuts, staying warm, and calling 995 if there’s an emergency. Always keep your first-aid kit accessible in your emergency bag.";
  }

  // Contact info
  if (lower.includes("contact") || lower.includes("help") || lower.includes("assistance")) {
    return "In case of emergency, dial 995. You can also visit the 'Contact' page in the app to find relevant hotlines and support resources.";
  }

  // App navigation
  if (lower.includes("app") || lower.includes("feature") || lower.includes("function")) {
    return "FloodSafe SG helps you prepare for floods with interactive guides, quizzes, and rewards. Check the 'Home' tab for your daily quiz, 'Guides' tab for information, and 'Profile' to track your progress.";
  }

  // Games / quizzes
  if (lower.includes("quiz") || lower.includes("game") || lower.includes("gamification")) {
    return "Want to test your flood preparedness? Try our daily quizzes and games! You can find them in the 'Games' section or on the Home tab.";
  }

  // Badges / progress
  if (lower.includes("badge") || lower.includes("reward") || lower.includes("streak")) {
    return "Earn badges and track your progress in the 'Profile' tab. Completing guides and quizzes will help you climb the leaderboard!";
  }

  // Guides / reading
  if (lower.includes("guide") || lower.includes("read") || lower.includes("learn")) {
    return "Check out our 'Disaster Guides' section for detailed instructions on how to prepare for floods, including safety measures and emergency steps.";
  }

  // Weather / flooding
  if (lower.includes("flood") || lower.includes("rain") || lower.includes("weather")) {
    return "Stay updated with flood warnings and weather info via the 'Alerts' section or enable real-time notifications. Always follow official advice from NEA and SCDF.";
  }

  // Safety tips
  if (lower.includes("safe") || lower.includes("safety") || lower.includes("danger")) {
    return "Your safety is our priority. Follow official alerts, avoid floodwaters, keep emergency supplies ready, and know the location of nearby shelters.";
  }

  // Fun / casual responses
  if (lower.includes("thanks") || lower.includes("thank you")) {
    return "You're welcome! 😊 Stay safe and check back often for more guides and quizzes!";
  }

  if (lower.includes("bye") || lower.includes("goodbye") || lower.includes("see you")) {
    return "Goodbye! Stay safe and prepared. Remember, knowledge is your best protection against floods!";
  }

  // Default fallback
  return "I'm here to help with flood preparedness. Try asking about evacuation, emergency bags, shelters, alerts, or the app features!";
}
