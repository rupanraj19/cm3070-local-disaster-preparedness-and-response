//  ------------------------- QUESTIONS -----------------------------------
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { quizzes } from '../../../config/question'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'twrnc'
import * as Progress from 'react-native-progress'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, updateDoc, increment, arrayUnion, getDoc, setDoc } from 'firebase/firestore'

const Questions = ({ navigation }) => {
  const route = useRoute()
  const { quizType } = route.params

  // Fisher-Yates shuffle
  const shuffleArray = (array) => {
    let newArray = array.slice()
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Generate key for today's questions for given quizType
  const getTodayKey = () => {
    const todayStr = new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'
    return `quiz_${quizType}_${todayStr}`
  }

  const NUM_QUESTIONS = 5 // Number of questions per quiz session

  const [quizQuestions, setQuizQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  useEffect(() => {
    const loadDailyQuestions = async () => {
      const key = getTodayKey()
      try {
        const saved = await AsyncStorage.getItem(key)
        if (saved) {
          const savedQuestions = JSON.parse(saved)

          // Auto-reset if cache has wrong number of questions
          if (savedQuestions.length !== NUM_QUESTIONS) {
            await AsyncStorage.removeItem(key)
          } else {
            setQuizQuestions(savedQuestions)
            return
          }
        }

        // fresh load
        const allQuestions = quizzes[quizType] || []
        const shuffled = shuffleArray(allQuestions)
        const selected = shuffled.slice(0, NUM_QUESTIONS)
        setQuizQuestions(selected)
        await AsyncStorage.setItem(key, JSON.stringify(selected))

      } catch (error) {
        console.error("Error loading or saving quiz questions:", error)
        // fallback in case of error
        const allQuestions = quizzes[quizType] || []
        const shuffled = shuffleArray(allQuestions)
        const selected = shuffled.slice(0, NUM_QUESTIONS)
        setQuizQuestions(selected)
      }
    }
    loadDailyQuestions()
  }, [quizType])

  const progress = (currentQuestionIndex + 1) / (quizQuestions.length || 1)

  const handleNext = async () => {
    if (currentQuestionIndex === quizQuestions.length - 1) {
      // On quiz completion - update user points and badges
      const db = getFirestore()
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        const userRef = doc(db, "users", user.uid)
        const updates = { points: increment(score) }
        // Award badge for perfect score
        if (score === NUM_QUESTIONS * 10) {
          updates.badges = arrayUnion(`${quizType}QuizMaster`)
        }
        try {
          await updateDoc(userRef, updates)
          const userDoc = await getDoc(userRef)
          if (userDoc.exists()) {
            const userData = userDoc.data()
            await setDoc(
              doc(db, "leaderboard", user.uid),
              { name: userData.username || "Unknown", points: userData.points || 0 },
              { merge: true }
            )
          }
        } catch (err) {
          console.error("Error updating points or leaderboard:", err)
        }
      }
      navigation.navigate("Score", { score, quizType })
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsCorrect(null)
    }
  }

  const handleOptionPress = (option) => {
    setSelectedOption(option)
    const correct = quizQuestions[currentQuestionIndex].correctAnswer === option
    setIsCorrect(correct)
    if (correct) setScore(score + 10)
  }

  if (!quizQuestions.length) {
    return (
      <SafeAreaView style={[tw`flex-1 justify-center items-center`]}>
        <Text style={tw`text-lg`}>Loading questions...</Text>
      </SafeAreaView>
    )
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]

  return (
    <SafeAreaView style={[tw`flex-1 p-4`, { backgroundColor: 'white' }]}>
      <Progress.Bar progress={progress} width={null} />
      <Text style={tw`text-xl font-bold my-4`}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option) => (
        <Pressable
          key={option}
          onPress={() => handleOptionPress(option)}
          disabled={!!selectedOption}
          style={[
            tw`p-4 my-2 rounded`,
            selectedOption === option
              ? isCorrect
                ? tw`bg-green-500`
                : tw`bg-red-500`
              : tw`bg-gray-200`
          ]}
        >
          <Text>{option}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={handleNext}
        disabled={!selectedOption}
        style={tw`bg-blue-500 py-3 rounded mt-6`}
      >
        <Text style={tw`text-center text-white text-lg`}>
          {currentQuestionIndex === quizQuestions.length - 1 ? "Finish" : "Next"}
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Questions


