import React, { useState, useEffect, useRef, useContext } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Image,
	Dimensions,
	KeyboardAvoidingView
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Camera, CameraView } from "expo-camera";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { randomUUID } from "expo-crypto";
import PeopleContext from "../PeopleContext";


export default function AddIdeaScreen({ route }) {
	const { personId, name } = route.params;
	const [hasPermission, setHasPermission] = useState(null);
	const { updatePerson } = useContext(PeopleContext);

	const [cameraRef, setCameraRef] = useState(null);
	const [facing, setFacing] = useState("back");
	const [photo, setPhoto] = useState(null);
	const [ideaText, setIdeaText] = useState("");
	const aspectRatio = 2 / 3;
	const [sizes, setSizes] = useState([]);
	const navigation = useNavigation();
	const [imageWidth, setImageWidth] = useState(0);
	const [imageHeight, setImageHeight] = useState(0);


	// Request camera permission
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");

			if (cameraRef) {
				const camera = cameraRef;
				const availableSizes = await camera.getAvailablePictureSizesAsync();
				setSizes(availableSizes[1]);
			}
		})();
	}, [cameraRef]);

	// If permission is not granted
	if (hasPermission === null) {
		return <Text>Permission is not granted</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera, please allow access</Text>;
	}

	const takePicture = async () => {
		if (cameraRef) {
			const screenWidth = Dimensions.get("window").width;
			setImageWidth(Math.floor(screenWidth * 0.6)); // Use 60% of screen width
			setImageHeight(Math.floor(imageWidth * aspectRatio));
			const options = {
				quality: 0.8,
				pictureSize: sizes.length > 0 ? sizes[1] : `${imageWidth}x${imageHeight}`,
				imageType: "PNG",
				skipProcessing: false,
			}

			const image = await cameraRef.takePictureAsync(options);
			setPhoto(image.uri); // Set the manipulated photo URI
		}
	};

	const toggleCameraFacing = () => {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	const saveIdea = async () => {
		if (!ideaText || !photo) {
			alert("Please provide both text and image before saving.");
			return;
		}

		try {
			const newIdea = {
				id: randomUUID(),
				text: ideaText,
				img: photo,
				width: imageWidth,
				height: imageHeight,
			};
			updatePerson(personId, newIdea);
			navigation.navigate("Ideas", { personId, name });
		} catch (e) {
			console.error("Failed to save idea", e);
		}
	};

	const cancel = () => {
		navigation.navigate("Ideas", { personId, name });
	};


	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.addIdeaPage}>
				<View style={styles.ideaHeader}>
					<Text style={{ fontWeight: "bold", fontFamily: "Poppins_400Regular" }}>Add Idea for {name}</Text>
					<TextInput
						style={styles.ideaInput}
						value={ideaText}
						onChangeText={setIdeaText}
						placeholder="Enter Your Idea" />
				</View>
				{/* Camera view if no photo is taken yet */}
				{!photo ? (
					<CameraView
						style={styles.cameraContainer}
						facing={facing}
						ref={(ref) => setCameraRef(ref)}
						ratio={aspectRatio}
					>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.flipButton}
								onPress={toggleCameraFacing}
							>
								<MaterialIcons name="flip-camera-ios" size={24} color="black" />
								<Text style={styles.flipText}> Flip </Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.captureButton}
								onPress={takePicture}
							>
								<MaterialCommunityIcons name="camera" size={24} color="black" />
								<Text style={styles.captureText}> Take Picture </Text>
							</TouchableOpacity>
						</View>
					</CameraView>
				) : (
					// If a photo is taken, display the preview
					<View style={styles.previewContainer}>
						<Image source={{ uri: photo }} style={styles.imagePreview} />
						<TouchableOpacity
							style={styles.captureButton}
							onPress={() => setPhoto(null)}
						><MaterialCommunityIcons name="camera-retake" size={24} color="black" />
							<Text style={styles.captureText}> Retake </Text>
						</TouchableOpacity>
					</View>
				)}

				<View style={styles.actionButtons}>
					<TouchableOpacity style={styles.cancelButton} onPress={cancel}>
						<MaterialIcons name="cancel" size={24} color="black" />
						<Text style={styles.buttonText}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.saveButton} onPress={saveIdea}>
						<AntDesign name="save" size={24} color="black" />
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</SafeAreaProvider >
	)
}

const styles = StyleSheet.create({
	addIdeaPage: {
		width: "100%",
		flex: 1,
		backgroundColor: "#fff",
	},
	ideaHeader: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		marginTop: 20,
	},
	ideaInput: {
		padding: 14,
		borderRadius: 10,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ccc",
		marginTop: 10,
		width: "80%",
		fontFamily: "Poppins_400Regular",
	},
	cameraContainer: {
		flex: 1,
		marginTop: 20,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "transparent",
		justifyContent: "space-between",
	},
	flipButton: {
		display: "flex",
		flexDirection: "row",
		alignSelf: "flex-end",
		alignItems: "center",
		backgroundColor: "#DDF42B",
		borderRadius: 10,
		padding: 10,
		marginTop: 20,
		marginRight: 20,
	},
	flipText: {
		fontSize: 18,
		color: "#000",
		fontFamily: "Poppins_400Regular",
	},
	captureButton: {
		flexDirection: "row",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#DDF42B",
		borderRadius: 10,
		padding: 15,
		marginBottom: 20,
		color: "black",
	},
	captureText: {
		fontSize: 18,
		color: "black",
		fontFamily: "Poppins_400Regular",
	},
	previewContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
	},
	imagePreview: {
		width: "100%",
		height: "80%",
		resizeMode: "contain",
	},

	nameInput: {
		padding: 14,
		borderRadius: 10,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ccc",
	},
	actionButtons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10,
		gap: 5,
		backgroundColor: "#fff",
	},
	cancelButton: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ccc",
		padding: 20,
		aspectRatio: 1,
		borderRadius: "100%"
	},
	saveButton: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#DDF42B",
		justifyContent: "center",
		textAlign: "center",
		alignItems: "center",
		padding: 20,
		aspectRatio: 1,
		borderRadius: "100%"
	},

	confirmForm: {
		padding: 18,
		borderRadius: 16,
		backgroundColor: "#DDF42B",
	},
	buttonText: {
		fontSize: 16,
		fontFamily: "Poppins_400Regular",
	},


});