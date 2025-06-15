import { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePin() {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle]=useState("")
  const onSubmit=()=>{
    
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      // aspect: [4, 3], //allow any aspect ratio
      quality: 1, //he used 0.5 to reduce size
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const [ratio, setRatio]=useState(1);
  
  useEffect(()=>{
          if(image){
      Image.getSize(image,(width, height)=>setRatio(width/height))
       }
      },[image])

  return (
    <View style={styles.container}>
      <Button title="Upload your pin" onPress={pickImage} />
      {image && 
      <ScrollView><Image source={{ uri: image }} style={[styles.image, {aspectRatio:ratio}]} />
      <TextInput placeholder='title' style={styles.input} value={title} onChangeText={setTitle}/>

      <Button title="Submit" onPress={onSubmit} />

      </ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10
  },
  image: {
    width: "100%",
    marginVertical:10
    // aspectRatio:
  },
  input:{
    borderWidth:1,
    borderColor:"gainsboro",
    padding:5,
    width:"100%",
    borderRadius:5
  }
});
