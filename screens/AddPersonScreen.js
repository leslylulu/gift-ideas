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
import DatePicker from 'react-native-modern-datepicker';

export default function AddPersonScreen() {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const { addPerson } = useContext(PeopleContext);
	const [isSaveSuccess, setSaveSuccess] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(300)).current;

	const navigation = useNavigation();

	const savePerson = () => {
		if (name && dob) {
			addPerson(name, dob);
			setSaveSuccess(true);
			navigation.goBack();
		} else {
			// TODO if failed go back to the list page and show an error message in modal
			setSaveSuccess(false);
		}
	}

	const showDatePicker = () => {
		setModalVisible(true);
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 400,
			useNativeDriver: true,
		}).start();
	};

	const hideDatePicker = () => {
		Animated.timing(slideAnim, {
			toValue: 800,
			duration: 400,
			useNativeDriver: true,
		}).start(() => setModalVisible(false));
	};

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.form}>
							<TextInput style={styles.nameInput} placeholder="Name" value={name} onChangeText={setName} />
							<View style={styles.date}>
								<TouchableOpacity style={styles.selectBtn} onPress={showDatePicker}>
									<Text>Select Date</Text>
								</TouchableOpacity>
								<Text style={styles.dob}>{dob}</Text>
							</View>
							<View style={styles.formBtns}>
								<TouchableOpacity style={styles.confirmForm} onPress={savePerson}>
									<Text style={styles.confirmFormText}>Save</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.cancelForm} onPress={() => navigation.goBack()}>
									<Text style={styles.cancelFormText}>Cancel</Text>
								</TouchableOpacity>

							</View>

						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>

				<Modal transparent={true} visible={isModalVisible} animationType="none">

					<TouchableWithoutFeedback onPress={hideDatePicker}>
						<View style={styles.modalBackground}>
							<TouchableWithoutFeedback>
								<Animated.View style={[styles.animatedView, { transform: [{ translateY: slideAnim }] }]}>
									<DatePicker
										onSelectedChange={(date) => setDob(date)}
										options={{
											backgroundColor: '#fff',
											textHeaderColor: '#000000',
											textDefaultColor: '#454E01',
											selectedTextColor: '#000',
											mainColor: '#DDF42B',
											textSecondaryColor: '#454E01',
											borderColor: 'rgba(0, 0, 0, 0.5)',
										}}
										mode="calendar"
										minuteInterval={30}
										style={{ borderRadius: 20 }}
									/>
									<View style={styles.buttonGroup}>
										<TouchableOpacity style={styles.confirmBtn} onPress={hideDatePicker}>
											<Text>Confirm</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.cancelBtn} onPress={hideDatePicker}>
											<Text>Close</Text>
										</TouchableOpacity>
									</View>
								</Animated.View>
							</TouchableWithoutFeedback>
						</View>
					</TouchableWithoutFeedback>
				</Modal>

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