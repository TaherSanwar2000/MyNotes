import { View, Text, TouchableOpacity, Keyboard, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "./config";
import { firebase } from "./config";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";



const Edit = ({ route }) => {
  const [title, setTitle] = useState(route.params.item.title);
  const [note, setNote] = useState(route.params.item.note);
  const [isLoading, setLoading] = useState(false);


  const navigation = useNavigation();

  const userUid = auth.currentUser.uid;
  const docId = route.params.item.id;
  

  const HandleUpdateNote = async () => {

    setLoading(true)

    if (title === "" || note === "") {
      Alert.alert("Title or Note should not be empty");
    } else {
      const db = firebase.firestore();

      // Define the document data
      const docData = {
        title,
        note,
        userUid,
        docId,
        createdOn: new Date()
      };

      // Get the reference to the document you want to update
      const docRef1 = db.collection("notes").doc(docId);

      // Update the document with the new data
      docRef1
        .update(docData)
        .then(() => {
          setLoading(false)
            ToastAndroid.showWithGravityAndOffset(
                "Note Updated",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
          console.log("Document updated successfully");
          navigation.replace('Home');

        })
        .catch((error) => {
          setLoading(false)
          console.error("Error updating document: ", error);
        });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "lightgray" }}>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
        style={{
          margin: 10,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
          borderColor: "purple",
          borderRadius: 10,
          marginTop: 20,
          fontWeight: "bold",
        }}
      />
      <TextInput
        multiline
        value={note}
        onChangeText={(text) => setNote(text)}
        placeholder="Write Your Note here.."
        style={{
          margin: 10,
          fontSize: 18,
          padding: 10,
          borderWidth: 1,
          borderColor: "purple",
          borderRadius: 10,
          marginTop: 20,
          height: 100,
        }}
      />
      {isLoading? (
          <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',flex:1}}>
          <ActivityIndicator size={30} color="#8f008f" />
          </View>
        ):null}
      <View style={{position:'absolute',bottom:0,left:20,right:20}}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "purple",
            padding: 10,
            marginBottom: 20,
            borderRadius: 10,
            fontWeight: "bold",
            width:"100%",
          }}
          onPress={() => {
            HandleUpdateNote()
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>Update Note</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

export default Edit;
