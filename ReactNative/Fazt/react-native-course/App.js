import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity, Platform} from 'react-native';  /*  Componentes de React */
{/*import diamondImage from './assets/diamond.png';*/}
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from "expo-sharing";
import UploadToAnonymousFiles from "anonymous-files";

const App = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permissionResult == false){
            Alert.alert('Permission to access to media library is required.');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if(pickerResult.cancelled == true){
            return;
        }

        if(Platform.OS === 'web'){
            const remoteUri = await UploadToAnonymousFiles(pickerResult.uri);
            setSelectedImage({localUri: pickerResult.uri, remoteUri});
        }else{
            setSelectedImage({localUri: pickerResult.uri});
        }
    };

    const openShareDialog = async () => {
        if(!(await Sharing.isAvailableAsync())){
            //No está funcionando
            alert(`The image is available on ${selectedImage.remoteUri}`);
            return;
        }
        
        if(Platform.OS === 'web'){
            await Sharing.shareAsync(selectedImage.remoteUri);
            return;
        }

        await Sharing.shareAsync(selectedImage.localUri);
    };

    return(
        <View style={estilos.contenedor}>
            <Text style={estilos.titulo}>Please, pick an Image</Text>

            <TouchableOpacity onPress={openImagePickerAsync}>
                {/*<Image source={diamondImage} style={estilos.imagen} />*/}
                <Image
                    source={{uri: (selectedImage==null)?'https://picsum.photos/200/200':selectedImage.localUri}}
                    style={estilos.imagen} />
            </TouchableOpacity>
            
            {/*onPress={() => console.log('Hello World!')}*/}
            {/*<Button
                color='#000000'
                title='Botón'
                onPress={() => Alert.alert('Soy un Button!')}
            />*/}

            {
                selectedImage ? (
                    <TouchableOpacity style={estilos.boton} onPress={openShareDialog}>
                        <Text style={estilos.textoBoton}>Share this image</Text>
                    </TouchableOpacity>
                ) : (<View />)
            }
            
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#292929'
    },
    titulo: {
        fontSize:30,
        color:'white'
    },
    imagen:{
        width:200,
        height:200,
        borderRadius:100,
        resizeMode:'contain',
        marginTop:20
    },
    boton:{
        backgroundColor:'deepskyblue',
        padding:7,
        marginTop:20
    },
    textoBoton:{
        color:'white',
        fontSize:20
    }
});

export default App;