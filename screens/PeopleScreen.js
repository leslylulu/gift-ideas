import { useContext } from "react";
import { StyleSheet, FlatList, View, Text, SafeAreaView, TouchableOpacity, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import PeopleContext from "../PeopleContext";


export default function PeopleScreen() {
	const navigation = useNavigation();
	const { people } = useContext(PeopleContext);


	const renderPerson = ({ item }) => {
		return (
			<View style={styles.card}>
				<View style={styles.userCard}>
					<View>
						<EvilIcons name="user" size={24} color="white" />
					</View>
					<View >
						<Text style={styles.name}>{item.name}</Text>
						<Text style={styles.dob}>{item.dob}</Text>
					</View>

				</View>

				<View>
					<MaterialCommunityIcons name="thought-bubble" size={24} color="white" />
				</View>
			</View>
		)
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<FlatList
					style={styles.userList}
					data={people}
					keyExtractor={item => item.id}
					renderItem={renderPerson}
				/>
				<View style={styles.addButton}>
					<TouchableOpacity onPress={() => navigation.navigate("AddPerson")}>
						<AntDesign name="pluscircleo" size={24} color="black" />
					</TouchableOpacity>
					<Button title="Add Person" onPress={() => navigation.navigate("AddPerson")}></Button>
				</View>

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
