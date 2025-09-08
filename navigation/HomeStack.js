import { StyleSheet} from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import Splash from '../screens/games/quiz/Splash';
import Questions from "../screens/games/quiz/Questions"
import Score from '../screens/games/quiz/Score';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PackBagGame from '../screens/games/packbag/packBagGame';
import PbgResult from '../screens/games/packbag/pbgResult'
import GuideDetailScreen from '../screens/GuideDetailScreen';
import MatchingGameHome from '../screens/games/matchinggame/MatchingGameHome';
import MatchingGame from '../screens/games/matchinggame/MatchingGame';
import MatchingGameScore from '../screens/games/matchinggame/MatchingGameScore';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();
const HomeStack = () => {

  const { isDark } = useTheme();
  return (

          <Stack.Navigator
          screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#000' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
    >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="GuideDetails" component={GuideDetailScreen} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Question" component={Questions} />
        <Stack.Screen name="Score" component={Score} />
        <Stack.Screen name="Emergency Bag Pack" component={PackBagGame} />
        <Stack.Screen name="PbgResult" component={PbgResult} />
        <Stack.Screen name="Memory Game Home" component={MatchingGameHome}/>
        <Stack.Screen name="Memory Game" component={MatchingGame}/>
        <Stack.Screen name="Memory Game Score" component={MatchingGameScore}/>
      </Stack.Navigator>

  )
}

export default HomeStack

const styles = StyleSheet.create({})