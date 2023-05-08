import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "./config";
import { auth, db } from "./config";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Chip } from "react-native-paper";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [prit, setPrit] =useState("HIGH")
  const [modalVisible, setModalVisible] = useState(false);
  const [priority, setPriority] = useState("");
  const [highSelected, setHighSelected] = useState(true);
  const [mediumSelected, setMediumSelected] = useState(false);
  const [lowSelected, setLowSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const userUid = auth.currentUser.uid;
  const navigation = useNavigation();
  let selectedIndex = -1;



  const HandleAddNote = () => {
    setLoading(true)
    if (title === "" || note === "") {
      Alert.alert("Title or Note should not be empty");
    } else {
      const db = firebase.firestore();

    
      console.log(
        "checkPriority",
        `index - ${selectedIndex} priority -  ${priority}`
      );

      // Define the document data
      const docData = {
        title,
        note,
        userUid,
        priority: prit,
        createdOn: new Date()
      };

      // Create a new document with a custom ID and add the ID as a field
      const docRef = db.collection("notes").doc();
      docData.docId = docRef.id;
      docRef
        .set(docData)
        .then(() => {
          setLoading(false)
          setTitle("");
          setNote("");
          Keyboard.dismiss();
          ToastAndroid.showWithGravityAndOffset(
            "Note Added Successful",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          navigation.replace('Home');
        })
        .catch((error) => {
          setLoading(false)
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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

      <View style={{ flexDirection: "row", height: "10%" }}>
        <View style={styles.chip}>
          <Chip
            mode="outlined"
            selectedColor="white"
            selected={highSelected}
            onPress={() => {
              setHighSelected(true);
              setMediumSelected(false);
              setLowSelected(false);
              setPrit("HIGH")
            }}
            style={{
              backgroundColor: highSelected ? "purple" : "white",
              borderColor: highSelected ? "black" : "purple",
            }}
          >
            <Text style={{ color: highSelected ? "white" : "black" }}>
              {" "}
              HIGH
            </Text>
          </Chip>
        </View>
        <View style={styles.chip}>
          <Chip
            mode="outlined"
            selectedColor="white"
            selected={mediumSelected}
            onPress={() => {
              setHighSelected(false);
              setMediumSelected(true);
              setLowSelected(false);
              setPrit("MEDIUM")
            }}
            style={{
              backgroundColor: mediumSelected ? "purple" : "white",
              borderColor: mediumSelected ? "black" : "purple",
            }}
          >
            <Text style={{ color: mediumSelected ? "white" : "black" }}>
              {" "}
              MEDIUM
            </Text>
          </Chip>
        </View>
        <View style={{ width: 80, height: 100, marginLeft: 20, marginTop: 20 }}>
          <Chip
            mode="outlined"
            selectedColor="white"
            selected={lowSelected}
            onPress={() => {
              setHighSelected(false);
              setMediumSelected(false);
              setLowSelected(true);
              setPrit("LOW")
            }}
            style={{
              backgroundColor: lowSelected ? "purple" : "white",
              borderColor: lowSelected ? "black" : "purple",
            }}
          >
            <Text style={{ color: lowSelected ? "white" : "black" }}> LOW</Text>
          </Chip>
        </View>
      </View>


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
            HandleAddNote()
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>Add Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  chip: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginTop: 20,
  },
});
