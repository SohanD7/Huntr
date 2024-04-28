import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Animated, StyleSheet, Text, StatusBar, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config'; // Ensure this points to your Firestore config

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const handleOpenURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } 
};

const Item = ({ title, salary, isSaved, onSave, scrollY, index, jobPostingUrl }) => {
  const inputRange = [
    -1,
    0,
    (index - 1) * 100,
    index * 100
  ];
  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0]
  });

  return (
    <Animated.View style={[styles.item, { opacity }]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.salary}>{salary}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onSave}>
          <Icon name={isSaved ? "bookmark" : "bookmark-border"} size={24} color="#000" />
        </TouchableOpacity>
        <Icon name="link" size={24} color="#000" onPress={() => jobPostingUrl && handleOpenURL(jobPostingUrl)}/>
      </View>
    </Animated.View>
  );
};

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [savedItems, setSavedItems] = useState(new Set());
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = db.collection('liked_jobs')
      .onSnapshot(snapshot => {
        const fetchedJobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobs(fetchedJobs);
      }, error => {
        console.error("Failed to fetch jobs:", error);
      });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const toggleSaved = (id) => {
    setSavedItems(prev => new Set(prev).add(id));
  };

  const renderItem = ({ item, index }) => (
    <Item
      title={item.title}
      salary={item.salary}
      jobPostingUrl={item.job_posting_url}
      isSaved={savedItems.has(item.id)}
      onSave={() => toggleSaved(item.id)}
      scrollY={scrollY}
      index={index}
    />
  );

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <AnimatedFlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 9,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  salary: {
    fontSize: 16,
    color: '#606060',
  },
});

export default App;
