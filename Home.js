import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  StyleSheet,
  useColorScheme,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "./config";
import { FlashList } from "@shopify/flash-list";
import { AntDesign } from "react-native-vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { auth } from "./config";
import { ActivityIndicator, Chip } from "react-native-paper";

const Home = () => {
  const [newNote, setNewNote] = useState([]);
  const [highSelected, setHighSelected] = useState(false);
  const [mediumSelected, setMediumSelected] = useState(false);
  const [lowSelected, setLowSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();

  const userUid = auth.currentUser.uid;

  const showAlert = (title,note,id) =>
  Alert.alert('Delete', 'Are sure You want to delete this note?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => HandleDeleteNote(title,note,id)},
  ]);


  useEffect(() => {
    updateData("ALL")  
  },[]);

  const updateData = (type) => {
    setLoading(true)
    setNewNote(() => []);
    
    console.log(
      `high - ${highSelected},med -  ${mediumSelected}, low -  ${lowSelected}`
    );

    if (type === "HIGH") {
      firebase
        .firestore()
        .collection("notes")
        .where("userUid", "==", userUid)
        .where("priority", "==", "HIGH")
        .orderBy("createdOn", "desc")
        .get()
        .then((querySnapshot) => {
          // Loop through the results and do something with each document
          const newNote = [];
          setLoading(false)
          querySnapshot.forEach((doc) => {
            const { note, title } = doc.data();
            newNote.push({ note, title, id: doc.id });
          });
          console.log("high", newNote);
          setNewNote(newNote);
        })
        .catch((error) => {
          setLoading(false)
          console.log("Error getting documents:", error);
        });
    } else if (type === "MEDIUM") {
      firebase
        .firestore()
        .collection("notes")
        .where("userUid", "==", userUid)
        .where("priority", "==", "MEDIUM")
        .orderBy("createdOn", "desc")
        .get()
        .then((querySnapshot) => {
          setLoading(false)
          // Loop through the results and do something with each document
          const newNote = [];

          querySnapshot.forEach((doc) => {
            const { note, title } = doc.data();
            newNote.push({ note, title, id: doc.id });
          });
          console.log("medium", newNote);
          setNewNote(newNote);
        })
        .catch((error) => {
          setLoading(false)
          console.log("Error getting documents:", error);
        });
    } else if(type === "LOW"){
      firebase
        .firestore()
        .collection("notes")
        .where("userUid", "==", userUid)
        .where("priority", "==", "LOW")
        .orderBy("createdOn", "desc")
        .get()
        .then((querySnapshot) => {
          setLoading(false)
          // Loop through the results and do something with each document
          const newNote = [];
          querySnapshot.forEach((doc) => {
            const { note, title } = doc.data();
            newNote.push({ note, title, id: doc.id });
          });
          console.log("low", newNote);
          setNewNote(newNote);
        })
        .catch((error) => {
          setLoading(false)
          console.log("Error getting documents:", error);
        });
    }else{
      firebase
      .firestore()
      .collection("notes")
      .where("userUid", "==", userUid)
      .orderBy("createdOn", "desc")
      .get()
      .then((querySnapshot) => {
        setLoading(false)
        // Loop through the results and do something with each document
        const newNote = [];
        querySnapshot.forEach((doc) => {
          const { note, title } = doc.data();
          newNote.push({ note, title, id: doc.id });
        });
        setNewNote(newNote);
      })
      .catch((error) => {
        setLoading(false)
        console.log("Error getting documents:", error);
      });
    }
  };

  const HandleDeleteNote = async (title, note, id) => {
    setLoading(true)
    const db = firebase.firestore();
    // Define the document data
    const docData = {
      title,
      note,
      userUid,
      id,
    };

    // Get the reference to the document you want to update
    const docRef1 = db.collection("notes").doc(id);

    // Update the document with the new data
    docRef1
      .delete(docData)
      .then(() => {
        setLoading(false)
        ToastAndroid.showWithGravityAndOffset(
          "Note Deleted",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        console.log("Document updated successfully");
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error updating document: ", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
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
              updateData("HIGH");
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
        <View
          style={{ width: 120, height: 100, marginLeft: 20, marginTop: 20 }}
        >
          <Chip
            mode="outlined"
            selectedColor="white"
            selected={mediumSelected}
            onPress={() => {
              setHighSelected(false);
              setMediumSelected(true);
              setLowSelected(false);
              updateData("MEDIUM");
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
              updateData("LOW");
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

      <FlashList
        data={newNote}
        numColumns={2}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              margin: 20,
              borderColor: "#8f008f",
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Pressable onPress={() => navigation.navigate("Edit", { item })}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "200" }}>
                {item.note}
              </Text>
            </Pressable>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
              onPress={ ()=>showAlert(item.title,item.note,item.id)}
            >
              <AntDesign name="delete" color="purple" size={25} />
            </TouchableOpacity>
          </View>
        )}
      />
      {(newNote.length == 0 && !isLoading) ? (
          <Text
            style={{
              flex:1,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginStart: 130
            }}
          >
            No Data Found
          </Text>
        ) : null}
        {isLoading? (
          <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size={30} color="#8f008f" />
          </View>
        ):null}
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          right: 20,
          bottom: 30,
          backgroundColor: "#b666d2",
          borderRadius: 40,
        }}
        onPress={() => navigation.navigate("Add")}
      >
        

        <AntDesign name="addfile" color="white" size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  chip: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginTop: 20,
  },
});
