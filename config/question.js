import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


export const quizzes ={
  floodSafety: [
    {
      question: "1. What should you do when a flood warning is issued?",
      options: [
        "Go for a walk",
        "Move to higher ground",
        "Take a nap",
        "Drive through floodwaters"
      ],
      correctAnswer: "Move to higher ground"
    },
    {
      question: "2. Which item is essential in an emergency flood kit?",
      options: [
        "Chocolate",
        "Books",
        "Portable radio",
        "Board games"
      ],
      correctAnswer: "Portable radio"
    },
    {
      question: "3. Which government app provides flood alerts in Singapore?",
      options: [
        "MyTransport.SG",
        "myResponder",
        "SGSecure",
        "myENV"
      ],
      correctAnswer: "myENV"
    },
    {
      question: "4. Is it safe to walk or drive through flooded roads?",
      options: [
        "Yes, if the water looks shallow",
        "Yes, if you're in a rush",
        "No, it's dangerous",
        "Only if you're in a truck"
      ],
      correctAnswer: "No, it's dangerous"
    },
    {
      question: "5. Who should you call in case of a flood emergency?",
      options: [
        "995",
        "999",
        "1800-CALL-MOM",
        "112"
      ],
      correctAnswer: "995"
    }
  ],

  floodAwareness: [
    {
      question: "1. What is the most flood-prone season in Singapore?",
      options: [
        "June-July",
        "December-January",
        "March-April",
        "August-September"
      ],
      correctAnswer: "December-January"
    },
    {
      question: "2. Which agency manages drainage in Singapore?",
      options: [
        "PUB (National Water Agency)",
        "LTA",
        "NEA",
        "HDB"
      ],
      correctAnswer: "PUB (National Water Agency)"
    },
    {
      question: "3. What does PUB stand for?",
      options: [
        "Public Utility Board",
        "Public Urban Bureau",
        "Pumps Under Bridges",
        "People’s Utility Base"
      ],
      correctAnswer: "Public Utility Board"
    },
    {
      question: "4. Which of these is a common cause of flash floods?",
      options: [
        "Tidal waves",
        "Heavy rainfall",
        "Sunny days",
        "Earthquakes"
      ],
      correctAnswer: "Heavy rainfall"
    },
    {
      question: "5. What color alert does NEA use for high-risk flood warnings?",
      options: [
        "Red",
        "Blue",
        "Yellow",
        "Green"
      ],
      correctAnswer: "Red"
    }
  ]
}

const styles = StyleSheet.create({})