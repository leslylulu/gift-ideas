import React, { useContext, useState, useRef } from "react";
import {
	Modal,
	StyleSheet,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Platform,
	Button,
	View,
	Text,
	Animated,
	TouchableOpacity
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-modern-datepicker';

export default function AddPersonScreen() {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const { addPerson } = useContext(PeopleContext);
	const [isModalVisible, setModalVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(300)).current;

	const navigation = useNavigation();

	const savePerson = () => {
		if (name && dob) {
			addPerson(name, dob);
			navigation.goBack();
		}

	}


	const showDatePicker = () => {
		setModalVisible(true);
		Animated.timing(slideAnim, {
			toValue: 0, // 从底部向上平移至视图内
			duration: 400, // 动画持续时间
			useNativeDriver: true, // 使用原生驱动提高性能
		}).start();
	};

	const hideDatePicker = () => {
		Animated.timing(slideAnim, {
			toValue: 800,
			duration: 400,
			useNativeDriver: true,
		}).start(() => setModalVisible(false)); // 动画结束后关闭Modal
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
							<TextInput mode="outlined" label={"Name"} placeholder="Name" value={name} onChangeText={setName} />
							<View style={styles.date}>
								<TouchableOpacity style={styles.selectBtn} onPress={showDatePicker}>
									<Text>Select Date</Text>
								</TouchableOpacity>
								<Text style={styles.dob}>{dob}</Text>
							</View>
							<View style={styles.formBtns}>
								<TouchableOpacity style={styles.confirmBtn} onPress={savePerson}>
									<Text>Save</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
									<Text>Cancel</Text>
								</TouchableOpacity>
							</View>

						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>

				<Modal transparent={true} visible={isModalVisible} animationType="none">

					<TouchableWithoutFeedback onPress={hideDatePicker}>
						<View style={styles.modalBackground}>
							<TouchableWithoutFeedback>
								{/* Animated View 实现从底部平移 */}
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
									// display={Platform.OS === "ios" ? "inline" : "default"}
									/>
									<View style={styles.buttonGroup}>
										<TouchableOpacity style={styles.confirmBtn} onPress={hideDatePicker}>
											<Text>Confirm</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.cancelBtn} onPress={hideDatePicker}>
											<Text>Close</Text>
										</TouchableOpacity>
										{/* <Button style={styles.confirmBtn} title="confirm" onPress={hideDatePicker} />
										<Button style={styles.cancelBtn} title="close" onPress={hideDatePicker} /> */}
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
		flexDirection: "column",
		gap: 10,
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