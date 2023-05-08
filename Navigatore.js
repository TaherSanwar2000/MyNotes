import { createStackNavigator } from "@react-navigation/stack";
import AddNotes from "./AddNotes";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import SignUp from "./SignUp";
import Edit from "./Edit";


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="Login"
        component={Login}
      
        options={{
            headerTitle: () => <Header name="LogIn" />,
            headerStyle: { backgroundColor: "#8f008f", height: 100 },
            headerTintColor: "white"
          }}
      />
       
        <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
            headerTitle: () => <Header name="SignUp" />,
            headerStyle: { backgroundColor: "#8f008f", height: 100 },
            headerTintColor: "white"

          }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header name="Notes" />,
          headerStyle: { backgroundColor: "#8f008f", height: 100 },
          headerTintColor: "white"

        }}
      />
      <Stack.Screen
        name="Add"
        component={AddNotes}
        options={{
          headerTitle: () => <Header name="Add Notes" />,
          headerStyle: { backgroundColor: "#8f008f", height: 100 },
          headerTintColor: "white"

        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          headerTitle: () => <Header name="Edit Notes" />,
          headerStyle: { backgroundColor: "#8f008f", height: 100 },
          headerTintColor: "white"

        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
