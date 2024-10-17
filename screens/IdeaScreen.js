import { useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";



export default function IdeaScreen() {



	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<Text>IDEA SCREEN</Text>

			</SafeAreaView>
		</SafeAreaProvider>
	)

}

const styles = StyleSheet.create({
	userList: {
		margin: 8,
		display: 'flex',
		flexDirection: 'column',
	},
	card: {
		padding: 16,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#829',
		margin: 4,
		borderRadius: 16,
		alignItems: 'center',
	},
	userCard: {
		display: 'flex',
		gap: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	name: {
		fontWeight: 'bold',
		color: 'white'
	},
	dob: {
		color: '#ccc'
	},
	addButton: {
		width: "100%",
		display: 'flex',
		justifyContent: 'center',
		justifyIems: 'center',
		textAlign: 'center',
	}
});
