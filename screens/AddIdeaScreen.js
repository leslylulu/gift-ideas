import React, { useContext, useState, useRef } from "react";
import {
	Modal,
	StyleSheet,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Platform,
	View,
	Text,
	Animated,
	TouchableOpacity,
	TextInput
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function AddIdeaScreen({ route }) {
	const { personId } = route.params;

	return (
		<SafeAreaProvider>
			<SafeAreaView>

				<Text>Person ID: {personId}</Text>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	form: {
		marginLeft: 10,
		marginRight: 10,
		flexDirection: "column",
		gap: 10,
		marginTop: 20,
	},
	nameInput: {
		padding: 14,
		borderRadius: 10,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ccc",
	},
	date: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// backgroundColor: "#fff",
	},
	selectBtn: {
		padding: 14,
		borderRadius: 10,
		backgroundColor: "#DDF42B",
	},
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
	formBtns: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		width: "100%",
		justifyContent: "space-around",
		marginTop: 20,
	},
	confirmForm: {
		padding: 18,
		borderRadius: 16,
		backgroundColor: "#DDF42B",
	},
	confirmFormText: {
		textAlign: "center",
		color: "#000",
		fontWeight: "bold",
	},
	cancelForm: {
		padding: 18,
		borderRadius: 16,
		backgroundColor: "#000",
	},
	cancelFormText: {
		textAlign: "center",
		color: "#fff",
		fontWeight: "bold",
	},
	confirmBtn: {
		padding: 18,
		borderRadius: 16,
		backgroundColor: "#DDF42B",
		color: "#000",
	},
	cancelBtn: {
		padding: 18,
		borderRadius: 16,
		backgroundColor: "#fff",
		color: "#000",
	},
});