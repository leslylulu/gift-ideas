# Gift Ideas

## Overview
Gift Ideas is a mobile application built using React Native and Expo that helps users keep track of gift ideas for their loved ones. The app allows users to add people, record their birthdays, and save gift ideas with descriptions and photos. Never forget a great gift idea again!

![Gift Ideas App Overview](./assets/idea-readme.png)

## Features
+ Add and manage people with their names and birthdays
+ Record gift ideas for each person
+ Capture photos of potential gifts using device camera
+ Easy navigation between people and their gift ideas
+ Delete people and ideas when no longer needed
+ Persistent storage of data across app sessions
+ User-friendly interface with modern design elements

## Tech Stack
+ React Native: Cross-platform mobile framework
+ Expo: Development platform and tools
+ React Navigation: Screen navigation
+ AsyncStorage: Local data persistence
+ Expo Camera: Photo capture functionality
+ React Native Paper: UI components
+ React Native Modern Datepicker: Date selection interface
+ Expo Google Fonts: Custom typography with Poppins font family
+ React Native Gesture Handler: Swipe actions and gestures

## Start the development server:
```sh
npx expo start
```

## Usage
+ Home Screen: View list of people you've added
+ Add Person: Click the "Add Person" button to add someone new with their name and birthday
+ Gift Ideas: Tap on a person to view or add gift ideas for them
+ Add Idea: From a person's page, add a new gift idea with description and photo
+ Delete: Swipe left on a person or idea to delete it

## Project Structure
```
gift-ideas/
├── assets/              # App assets including images and fonts
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── splash.png
│   └── screenshots/     # App screenshots for documentation
├── components/          # Reusable UI components
├── context/            # Context providers for state management
├── screens/            # Main application screens
├── App.js              # Application entry point
├── app.json            # Expo configuration
└── package.json        # Project dependencies
```

## Author
[Lulu Zhang](https://profile.catlulu.net/)



Built with ❤️ using React Native and Expo