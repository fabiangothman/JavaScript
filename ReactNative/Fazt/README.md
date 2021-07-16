# Tutorial de React Native

## Para crear un nuevo proyecto con Expo
- https://docs.expo.io/get-started/installation/
- expo init <app-name>

## Install dependencies/packages
- If it's the first time you run the app, use:
    - npm install
- If not, you can update the packages by using:
    - npm update

## Run app
To run your project, navigate to the directory and run one of the following yarn commands.
- cd react-native-course
- yarn start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- yarn android
- yarn ios # requires an iOS device or macOS for access to an iOS simulator
- yarn web

## Use a Image Picker in the App (with Expo)
You can use any image picker 3rd-party library, but by the moment we can use the expo's one:
- Go inside the project's root folder
- expo install expo-image-picker

# Share (with Expo)
You can use any image picker 3rd-party library, but by the moment we can use the expo's one:
- Go inside the project's root folder
- expo install expo-sharing
For "web" platforms you can't share content by local, you need to upload it to a 3rd-party server:
- npm install anonymous-files

# Deploy
- expo build:android
- expo build:ios (Needs to be done from a MAC computer)
- expo build:web (Generates a web-build folder)
    - You can run a local server via: npx serve web-build
    - Or upload it to a cloud server via: https://docs.expo.io/distribution/publishing-websites/