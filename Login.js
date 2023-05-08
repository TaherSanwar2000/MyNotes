import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    ActivityIndicator,
    ToastAndroid,
  } from "react-native";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "./config";

 
  const Login= () => {
    const [email, setEmail] = useState("");
    const [pswrd, setPswrd] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    
 useEffect(()=>{
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(!authUser){
        setLoading(false);
      }
      if(authUser){
        navigation.replace("Home");
        ToastAndroid.showWithGravityAndOffset(
          'Login Successful',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    });
    return unsubscribe;
   },[])
  
  const Login = ()=>{
    setLoading(true)
    signInWithEmailAndPassword(auth,email,pswrd).then((userCredential) =>{
      const user = userCredential.user;
      setLoading(false)
  
    })
  }

  
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        {loading ?(
          <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',flex:1}}>
          <Text style={{fontSize:30,fontWeight:800,marginRight:20}}>Logging in...</Text>
          <ActivityIndicator size={30} color="#8f008f" />
          </View>
        ):(
          <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#8f008f" }}>
              Sign In
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Sign In to your account
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={30}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: 20,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 280,
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          >
            <MaterialCommunityIcons
              name="account-key-outline"
              size={30}
              color="black"
            />
            <TextInput
              placeholder="Password"
              value={pswrd}
              onChangeText={(text) => setPswrd(text)}
              secureTextEntry={true}
              style={{
                fontSize: 20,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 280,
                marginVertical: 10,
              }}
            />
          </View>
          <Pressable
          onPress={Login}
            style={{
              width: 150,
              backgroundColor: "#8f008f",
              borderRadius: 10,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
              LogIn
            </Text>
          </Pressable>
          <Pressable
        onPress={()=> navigation.navigate("SignUp")}
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
          >
            <Text style={{ textAlign: "center",color:'#8f008f' }}>
              Don't have an account? SignUp
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
        )}
       
      </SafeAreaView>
    );
  };
  
  export default Login;
  