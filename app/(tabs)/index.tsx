import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react'; // This is to hold the selected image.
import { StyleSheet, View } from 'react-native';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);


  // Pick an image from the device's library
  // This function is called when the "Choose a photo" button is pressed
  const pickImageAsync = async () => { 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      // Handle the selected image.
      //console.log(result);
      setSelectedImage(result.assets[0].uri)
    } else{
      alert('You did not select any image.');
    }
  };

  // Image display on the screen.
  // Button display on screen.
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>

  
      <View style={styles.footerContainer}>
        <Button theme='primary' onPress={pickImageAsync}label="Choose a photo"/>
        <Button label="Use this photo"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1
  },
  footerContainer:{
    flex: 1/3,
    alignItems:'center'
  }
});
