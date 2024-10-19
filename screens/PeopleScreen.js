import { useContext } from "react";
import { StyleSheet, FlatList, View, Text, SafeAreaView, TouchableOpacity, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PeopleContext from "../PeopleContext";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PeopleScreen() {
	const navigation = useNavigation();
	const { people } = useContext(PeopleContext);

	const renderPerson = ({ item }) => {

		return (
			<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Ideas", { personId: item.id, name: item.name })}>
				<View style={styles.userCard}>
					<View>
						<EvilIcons name="user" size={24} color="#000" />
					</View>
					<View >
						<Text style={styles.name}>{item.name}</Text>
						<Text style={styles.dob}>{item.dob}</Text>
					</View>
				</View>
				<View>
					<MaterialCommunityIcons name="thought-bubble" size={24} color="#000" />
				</View>
			</TouchableOpacity >
		)
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<View style={styles.header}>
					<View style={styles.title}>
						<Text style={styles.titleText}>Quick Add Person</Text>
					</View>
					<TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate("AddPerson")}>
						<FontAwesome5 name="user-plus" size={36} color="black" />
						<Text style={styles.addBtn}>Add Person</Text>
					</TouchableOpacity>

				</View>
				<FlatList
					style={styles.userList}
					data={people}
					keyExtractor={item => item.id}
					renderItem={renderPerson}
				/>
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
	title: {
		paddingTop: 16,
	},
	titleText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#111',
		textAlign: 'center',
	},
	card: {
		padding: 16,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#DDF42B',
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
		color: '#000'
	},
	dob: {
		color: '#333'
	},
	addButton: {
		width: "100%",
		display: 'flex',
		justifyContent: 'center',
		justifyItems: 'center',
		textAlign: 'center',
	},
	avatarBtn: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: "center",
		padding: 16,
		gap: 8,
	},
	addBtn: {
		fontSize: 16,
		color: '#000',
		borderStyle: 'solid',
		borderWidth: 1,
		padding: 8,
		borderRadius: 8,
	},
});
