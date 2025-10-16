import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react'; // This is to hold the selected image.
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Gesture handling. 

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {

  // We use setState instead of simple variables becuase it has render hooks.
  // selectedImage can hold 2 types of values: string or undefined.
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

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
      setShowAppOptions(true); // This will make the options menu appear.
    } else{
      alert('You did not select any image.');
    }
  };


  //Placeholder for now
  const onReset = () =>{
    setShowAppOptions(false);
  }
  const onAddSticker = () =>{
    setIsModalVisible(true);
  }
  const onSaveImageAsync = async() =>{
    
  }
  const onModalClose = () => {
    setIsModalVisible(false);
  };



  // Image display on the screen.
  // Button display on screen.
  // Conditional rendering for the options menu.
  return (
    <GestureHandlerRootView style={styles.container}> 
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
        
        {showAppOptions ?(
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon='refresh' label='Reset' onPress={onReset}/>
              <CircleButton onPress={onAddSticker}/>
              <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync}/>
              </View>
            </View>
        ): (
          <View style={styles.footerContainer}>
            <Button theme='primary' onPress={pickImageAsync}label="Choose a photo"/>
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/> {/* Hide the menu options. Work done. */}
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          {/* Contents to be displayed in menu */}
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>
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
  },
    optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
