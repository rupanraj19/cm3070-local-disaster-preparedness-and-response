//generateFloodBotResponse.js
export function generateFloodBotResponse(message) {
  const lower = message.toLowerCase();

  if (lower.includes("evacuation") || lower.includes("evacuate")) {
    return "During an evacuation, follow official alerts, take your emergency bag, and move to the nearest safe shelter.";
  } else if (lower.includes("emergency bag") || lower.includes("pack")) {
    return "Your emergency bag should include water, food, flashlight, first-aid kit, important documents, and phone charger.";
  } else if (lower.includes("shelter")) {
    return "You can find the nearest shelter listed in the 'Emergency Contacts' or 'Flood Guide' section of the app.";
  } else if (lower.includes("alert") || lower.includes("warning")) {
    return "Flood alerts are issued by PUB and SCDF. Turn on real-time notifications in your app settings.";
  } else if (lower.includes("first aid")) {
    return "Basic first aid includes treating minor cuts, staying warm, and calling 995 if there's an emergency.";
  } else if (lower.includes("contact") || lower.includes("help")) {
    return "In case of emergency, dial 995. You can also use the Contact tab in the app to find assistance.";
  } else if (lower.includes("app") || lower.includes("feature")) {
    return "FloodSafe SG helps you prepare for floods with guides, games, and rewards for learning. Explore the Home tab to get started!";
  } else {
    return "I'm here to help with flood preparedness. Try asking about evacuation, emergency bags, or shelters.";
  }
}
