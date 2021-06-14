import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

const Main = ({navigation}) => {
  const data = [
    {
      id: "1",
      title: "Clean the house",
      anotations: "Remove the dust",
      read: false,
      photo: null,
    },
    {
      id: "2",
      title: "Study ",
      anotations: "React Native",
      read: false,
      photo: null,
    },
    {
      id: "3",
      title: "Go to the Gym",
      anotations: "Don't think, just go!!",
      read: false,
      photo: null,
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.toolbox}>
        <Text style={styles.title}>To Do List</Text>
        <TouchableOpacity
          style={styles.toolboxButton}
          onPress={() => {
            navigation.navigate("Book");
          }}
          >
          <Icon name="add" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList 
        data={data} 
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemButton}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginTop: 50,
  },
  toolbox: {
    flexDirection: "row",
    marginBottom: 5,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "#3498db",
  },
  toolboxButton: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  itemButton: {

  },
  itemText: {
    fontSize: 16,
  },
});

export default Main;