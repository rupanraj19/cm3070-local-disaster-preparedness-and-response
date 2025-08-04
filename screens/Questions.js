import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useState} from 'react'
import {useRoute} from "@react-navigation/native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { quizzes } from '../config/question'
import { getFirestore, doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import tw from "twrnc"
import * as Progress from "react-native-progress"

const Questions = ({navigation}) => {

  const route = useRoute();
  // const navigation = useNavigation();
  const { quizType } = route.params;

  const quizQuestions = quizzes[quizType];

  const[currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [quizProgress, setQuizProgress] = useState(quizQuestions.length);

  const progress = (currentQuestionIndex + 1)/ quizProgress;

  // handle next press
  const handleNext=()=>{
    if(currentQuestionIndex === quizQuestions.length-1){
          const db = getFirestore();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
if (userId) {
    const userRef = doc(db, 'users', userId);

    const updates = {
      points: increment(score),
    };

    // Unique badge name for each quizType
    if (score === 50) {
      const badgeName = `${quizType}QuizMaster`;
      updates.badges = arrayUnion(badgeName);
    }

    updateDoc(userRef, updates)
      .then(() => {
        console.log("Points and badge updated");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  }


     navigation.navigate("Score", { score, quizType });
    }
    else{
      setCurrentQuestionIndex(currentQuestionIndex+1)
      setSelectedOption(null)
      setIsCorrect(null)
    }
  }

  // handle pressed option

  const handleOptionPress=(pressedOption)=>{

    setSelectedOption(pressedOption);

    const isAnswerCorrect =
    quizQuestions[currentQuestionIndex].correctAnswer === pressedOption;
    setIsCorrect(isAnswerCorrect)

    if(isAnswerCorrect){
      setScore((prevScore) => prevScore+10)
    }
  }

  return (
    <View style={tw`mt-6 p-4`}>
      <View style={tw`flex-row`}>
        <View style={tw`flex-1 mb-4`}>
          <Progress.Bar progress={progress} width={null} height={20} color={"rgba(25, 106, 247, 1)"} />
        </View>
      </View>
      <Text style={tw`text-2xl mb-4`}>{quizQuestions[currentQuestionIndex].question}</Text>
        {
            quizQuestions[currentQuestionIndex].options.map(option=>(
              <Pressable
              key={option}
              style={tw`border-2 border-blue-500 p-4 rounded-md p-4 my-2 rounded-md ${
                selectedOption == option? isCorrect? "bg-green-200 border-green-500": "bg-red-200 border-red-500": "border-blue-500"
              }`}
              onPress={()=>handleOptionPress(option)}
              disabled={selectedOption !== null}
              >
                <Text style={tw`text-lg`}>{option}</Text>
              </Pressable>
            ))
        }

      <Pressable style={tw`bg-blue-500 p-2 rounded-md mt-6`} onPress={handleNext}>
        <Text style={tw`text-white text-lg text-center font-bold`}>{currentQuestionIndex === quizQuestions.length-1 ? "Finish" : "Next"}</Text>
      </Pressable>

    </View>



  )
}

export default Questions

const styles = StyleSheet.create({})