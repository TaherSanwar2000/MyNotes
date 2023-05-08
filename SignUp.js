import { View, Text, KeyboardAvoidingView, SafeAreaView,TextInput,Pressable, ToastAndroid,ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pswrd, setPswrd] = useState("");
  const [mobile, setMobile] = useState("");
  const[isLoading,setLoading] = useState(false);
  const navigation = useNavigation();
  const register = ()=>{
  
    if(email==="" || pswrd==="" || mobile==="" ){
      ToastAndroid.showWithGravityAndOffset(
        'oops Something missing ',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }else{
      let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        ToastAndroid.showWithGravityAndOffset(
          'Email is not correct ',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
      else{
        setLoading(true)
        createUserWithEmailAndPassword(auth,email,pswrd).then((userCredential)=>{
          const user = userCredential._tokenResponse.email;
          const myUserId = auth.currentUser.uid;
          
    
          setDoc(doc(db,"user",`${myUserId}`),{
            email:user,
            phone:mobile,
            userId:myUserId
          })
          setLoading(false)
          ToastAndroid.showWithGravityAndOffset(
            'SignUp Successful',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          navigation.navigate("Home")
          
        }).catch(error => {
          setLoading(false)
          switch (error.code) {
             case 'auth/email-already-in-use':
               ToastAndroid.showWithGravityAndOffset(
                `Email address ${email} already in use.`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
               break;
             case 'auth/invalid-email':
              ToastAndroid.showWithGravityAndOffset(
                `Email address ${this.state.email} is invalid.`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
               break;
             case 'auth/operation-not-allowed':
              ToastAndroid.showWithGravityAndOffset(
                `Error during sign up.`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
               break;
             case 'auth/weak-password':
              ToastAndroid.showWithGravityAndOffset(
                'Password is not strong enough. Add additional characters including special characters and numbers.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
               break;
             default:
               console.log(error.message);
               break;
           }
       });
      }
    }
    
  }


 const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      ToastAndroid.showWithGravityAndOffset(
        'Email is not correct ',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      this.setState({ email: text })
      return false;
    }
    else {
      this.setState({ email: text })
      setEmail(text)
    }
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

      {isLoading?(
 <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',flex:1}}>
 <Text style={{fontSize:30,fontWeight:800,marginRight:20}}>Creating your Profile....</Text>
 <ActivityIndicator size={30} color="blue" />
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
            SignUp
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Create an account
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
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <Entypo name="old-mobile" size={30} color="black" />
          <TextInput
            placeholder="Mobile No."
            value={mobile}
            onChangeText={(text) => setMobile(text)}
            keyboardType="numeric"
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
          onPress={register}
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
            Sign Up
          </Text>
        </Pressable>
        <Pressable
          onPress={()=>navigation.goBack()}
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
        >
          <Text style={{ textAlign: "center",color:'#8f008f' }}>
            Already have an account?
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
      )}
      
    

    </SafeAreaView>
  );
};

export default SignUp;
