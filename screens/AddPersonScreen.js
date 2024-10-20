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

import MessageModal from "../components/messageModal";

export default function AddPersonScreen() {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const { addPerson } = useContext(PeopleContext);
	const [isFailVisible, setFailVisible] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(300)).current;

	const navigation = useNavigation();

	const savePerson = () => {
		if (name && dob) {
			addPerson(name, dob);
			setFailVisible(false);
			navigation.goBack();
		} else {
			setFailVisible(true);
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
		}).start(() => {
			setModalVisible(false);
		});
	};

	const handleSelectDate = (date) => {
		const selectedDate = new Date(date.replace(/\//g, '-')); // 替换斜杠为连字符
		const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;
		setDob(formattedDate);
		hideDatePicker();
	};

	const errorMessage = () => {
		let message = "Please fill in all fields";
		if (!name) {
			message = "Please fill in the name field";
		} else if (!dob) {
			message = "Please fill in the date of birth field";
		}
		return message;
	}

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
									<Text style={styles.selectBtnText}>Select Date</Text>
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

					<TouchableWithoutFeedback>
						<View style={styles.modalBackground}>
							<TouchableWithoutFeedback>
								<Animated.View style={[styles.animatedView, { transform: [{ translateY: slideAnim }] }]}>
									<DatePicker
										onSelectedChange={handleSelectDate}
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
									{/* <View style={styles.buttonGroup}>
										<TouchableOpacity style={styles.confirmBtn} onPress={hideDatePicker}>
											<Text>Confirm</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.cancelBtn} onPress={hideDatePicker}>
											<Text>Close</Text>
										</TouchableOpacity>
									</View> */}
								</Animated.View>
							</TouchableWithoutFeedback>
						</View>
					</TouchableWithoutFeedback>
				</Modal>

				<MessageModal
					visible={isFailVisible}
					type="Error"
					message={errorMessage()}
					onConfirm={() => setFailVisible(false)}
					onCancel={() => setFailVisible(false)}
				/>

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
		fontFamily: "Poppins_400Regular",
	},
	date: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	dob: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 16,
		fontSize: 16,
		fontWeight: "bold",
		overflow: "hidden",
		minWidth: "50%",
		fontFamily: "Poppins_700Bold",
	},
	selectBtn: {
		padding: 14,
		borderRadius: 10,
		backgroundColor: "#DDF42B",
	},
	selectBtnText: {
		fontSize: 16,
		color: "#000",
		fontFamily: "Poppins_400Regular",
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
		fontFamily: "Poppins_700Bold",
	},
	cancelForm: {
		padding: 18,
		borderRadius: 16,
		backgroundColor: "#000",
	},
	cancelFormText: {
		textAlign: "center",
		color: "#fff",
		fontFamily: "Poppins_700Bold",

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