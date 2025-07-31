import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Alert, Platform, StyleSheet, ScrollView } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // your firebase config file
import { getAuth } from 'firebase/auth';
import * as Notifications from 'expo-notifications';
import tw from 'twrnc';
import { useTheme } from '../context/ThemeContext';


// permission
async function requestPermissionsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    if (newStatus !== 'granted') {
      console.warn('Notification permissions not granted!');
      return false;
    }
  }
  return true;
}

Notifications.setNotificationHandler({
  handleNotification: async()=>({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
})


// Daily reminder logic
async function scheduleDailyReminder() {
  const now = new Date();
  const sixPM = new Date();
  sixPM.setHours(19, 1, 0, 0);

  if (now > sixPM) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Stay Flood-Safe 💧',
      body: 'You haven’t checked FloodSafe SG today. Stay prepared!',
      data: { type: 'daily_reminder' },
    },
    trigger: sixPM,
  });
}

// Weekly tip logic
async function scheduleWeeklyTip() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Flood Preparedness Tip 🧠',
      body: 'Review your emergency kit and contacts today!',
      data: { type: 'weekly_tip' },
    },
    trigger: {
      weekday: 1, // Monday
      hour: 10,
      minute: 0,
      repeats: true,
    },
  });
}

// Cancel all scheduled notifications (can be improved for targeting specific ones)
async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

const NotificationSettingsScreen = () => {

    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const bgStyle = isDark ? 'bg-black' : 'bg-white';
    const textColor = isDark ? 'text-white' : 'text-black';

  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyTip, setWeeklyTip] = useState(true);
  const [realTimeAlerts, setRealTimeAlerts] = useState(true); // assume default true

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userDocRef = doc(db, 'users', currentUser.uid);


  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const settings = userDoc.data().notificationSettings || {};
          setDailyReminder(settings.dailyReminder ?? true);
          setWeeklyTip(settings.weeklyTip ?? true);
          setRealTimeAlerts(settings.realTimeAlerts ?? true);
        }
      } catch (error) {
        console.warn('Failed to load notification settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Save settings helper
  const saveSettings = async (newSettings) => {
    try {
      await updateDoc(userDocRef, { notificationSettings: newSettings });
    } catch (error) {
      console.warn('Failed to save notification settings:', error);
    }
  };

  const toggleDailyReminder = async (value) => {
    if (value) {
    const granted = await requestPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission Denied', 'Cannot enable notifications without permission.');
      return;
    }
    await scheduleDailyReminder();
    } else {
    await cancelAllNotifications();
    }

    setDailyReminder(value);
    await saveSettings({
      dailyReminder: value,
      weeklyTip,
      realTimeAlerts,
    });
    if (value) await scheduleDailyReminder();
    else await cancelAllNotifications();
  };

  const toggleWeeklyTip = async (value) => {
    if (value) {
    const granted = await requestPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission Denied', 'Cannot enable notifications without permission.');
      return;
    }
    await scheduleWeeklyTip();
    } else {
    await cancelAllNotifications();
    }
    setWeeklyTip(value);
    await saveSettings({
      dailyReminder,
      weeklyTip: value,
      realTimeAlerts,
    });
    if (value) await scheduleWeeklyTip();
    else await cancelAllNotifications();
  };

  const toggleRealTimeAlerts = async (value) => {
    setRealTimeAlerts(value);
    await saveSettings({
      dailyReminder,
      weeklyTip,
      realTimeAlerts: value,
    });
    Alert.alert("Note", "Real-time alerts are managed by our backend and may depend on your location.");
  };

   return (
    <ScrollView style={tw`flex-1 px-4 py-6 ${bgStyle}`}>
      <Text style={tw`text-2xl font-bold mb-6 ${textColor}` }>Notification Settings</Text>

      <View style={tw`flex-row justify-between items-center py-4 border-b border-gray-200`}>
        <Text style={tw`text-base ${textColor}`}>Daily Reminder at 6PM</Text>
        <Switch value={dailyReminder} onValueChange={toggleDailyReminder} />
      </View>

      <View style={tw`flex-row justify-between items-center py-4 border-b border-gray-200`}>
        <Text style={tw`text-base ${textColor}`}>Weekly Safety Tip</Text>
        <Switch value={weeklyTip} onValueChange={toggleWeeklyTip} />
      </View>

      <View style={tw`flex-row justify-between items-center py-4 border-b border-gray-200`}>
        <Text style={tw`text-base ${textColor}`}>Real-Time Flood Alerts</Text>
        <Switch value={realTimeAlerts} onValueChange={toggleRealTimeAlerts} />
      </View>

      <Text style={tw`mt-6 text-gray-500 text-sm`}>
        Note: Real-time alerts depend on your location and backend data. Please ensure location access is enabled in settings.
      </Text>
    </ScrollView>
  );
};

export default NotificationSettingsScreen;

