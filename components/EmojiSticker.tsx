import { ImageSourcePropType, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
 
  // Used to track scale of the image on the UI thread.
  const scaleImage = useSharedValue(imageSize);

  // Double the image size on double tap or return to og size.
  const doubleTap = Gesture.Tap().numberOfTaps(2)
  .onStart(() => {
    if (scaleImage.value !== imageSize * 2) {
      scaleImage.value = scaleImage.value * 2;
    } else {
      scaleImage.value = Math.round(scaleImage.value / 2);
    }
  });
  
  // Animate the image size change.
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <View style={{ top: -350 }}>
      <GestureDetector gesture={doubleTap}> 
        <Animated.Image source={stickerSource} style={[imageStyle,{ width: imageSize, height: imageSize }]}  resizeMode="contain"/>
      </GestureDetector>
    </View>
  );
}

