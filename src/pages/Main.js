import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Main = ({navigation}) => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    AsyncStorage.getItem("books").then(data => {
      const book = JSON.parse(data);
      setBooks(book);
    })
  }, []);

  const onNewBook = () => {
    navigation.navigate('Book');
  }

  const onBookEdit = (bookId) => {
    const book = books.find(item => item.id === bookId)
    navigation.navigate('Book', {book: book, isEdit: true});
  };

  const onBookDelete = async (bookId) => {
    const newBooks = books.filter(item => item.id !== bookId);
    await AsyncStorage.setItem("books", JSON.stringify(newBooks));
    setBooks(newBooks);
  }

  const onBookRead = async (bookId) => {
    const newBooks = books.map(item => {
      if (item.id === bookId) {
        item.read = !item.read; // false -> true / true -> false
      }
      return item;
    });

    await AsyncStorage.setItem("books", JSON.stringify(newBooks));
    setBooks(newBooks); 
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolbox}>
        <Text style={styles.title}>Lista de Leitura</Text>
        <TouchableOpacity
          style={styles.toolboxButton}
          onPress={onNewBook}>
          <Icon name="add" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList 
        data={books} 
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemsContainer}>
            <TouchableOpacity 
              style={styles.itemButton}
              onPress={() => onBookRead(item.id)}>
              <Text style={[styles.itemText, item.read ? styles.itemRead : '']}>{item.title}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => onBookEdit(item.id)}>
              <Icon name="create" size={14} color="#2ecc71" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => onBookDelete(item.id)}>
              <Icon name="delete" size={14} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  itemsContainer: {
    flexDirection: "row",
  },
  itemButton: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  itemRead: {
    textDecorationLine: "line-through",
    color: "#95a5a6",
  },
  editButton: {},
  deleteButton: {},
});

export default Main;