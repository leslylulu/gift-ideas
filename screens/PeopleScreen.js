import { useState, useContext } from "react";
import { StyleSheet, FlatList, View, Text, SafeAreaView, TouchableOpacity, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import MessageModal from "../components/messageModal";
import PeopleContext from "../PeopleContext";


export default function PeopleScreen() {
	const navigation = useNavigation();
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [isDelModalVisible, setIsDelModalVisible] = useState(false);
	const { people, deletePerson } = useContext(PeopleContext);
	let prevOpenedRow;


	const sortPeopleByBirthday = (people) => {
		return people.sort((a, b) => {
			const dateA = new Date(a.dob);
			const dateB = new Date(b.dob);
			if (dateA.getMonth() === dateB.getMonth()) {
				return dateA.getDate() - dateB.getDate();
			}
			return dateA.getMonth() - dateB.getMonth();
		});
	};


	const renderPerson = ({ item, index }, goIdeasPage, deletePersonFun) => {

		const closeRow = (index) => {
			if (prevOpenedRow && prevOpenedRow !== people[index]) {
				prevOpenedRow.close();
			}
			prevOpenedRow = people[index];
		};

		const renderRightActions = (progress, dragX, onPress) => {
			return (
				<View
					style={styles.delbtn}>
					<TouchableOpacity onPress={() => deletePersonFun(item)}>
						<AntDesign name="delete" size={18} color="#fff" />
					</TouchableOpacity>
				</View>
			);
		};


		return (
			<Swipeable
				renderRightActions={(progress, dragX) =>
					renderRightActions(progress, dragX)
				}
				onSwipeableOpen={() => closeRow(index)}
				rightOpenValue={-140}>
				<TouchableOpacity style={styles.card} onPress={() => goIdeasPage(item.id, item.name)}>
					<View style={styles.userCard}>
						<View>
							<EvilIcons name="user" size={40} color="#000" />
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
			</Swipeable>
		);
	};

	const goIdeasPage = (personId, name) => {
		navigation.navigate("Ideas", { personId, name });
	}

	const deletePersonFun = (person) => {
		setSelectedPerson(person);
		setIsDelModalVisible(true);
	};

	const handleConfirmDelete = async () => {
		try {
			await deletePerson(selectedPerson.id);
			setIsDelModalVisible(false);
		} catch (error) {
			console.error("Error deleting person:", error); // Log the error to debug
			alert("An error occurred while deleting the person. Please try again."); // Show an alert to the user
		}
	}

	console.log(JSON.stringify(people));
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					{/* <View style={styles.title}>
						<Text style={styles.titleText}>Quick Add Person</Text>
					</View> */}
					<TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate("AddPerson")}>
						<FontAwesome5 name="user-plus" size={36} color="black" />
						<Text style={styles.addBtn}>Add Person</Text>
					</TouchableOpacity>
				</View>
				{
					people && people.length > 0 ? <FlatList
						style={styles.userList}
						data={sortPeopleByBirthday(people)}
						renderItem={(item) => renderPerson(item, goIdeasPage, deletePersonFun)}
						keyExtractor={(item) => item.id.toString()}
					/>
						: <View style={styles.empty}>
							<Text style={styles.emptyText}>Oh no, we couldn't find anyone! ✨</Text>
							<Text style={styles.emptyText}>Please add a little buddy! 💖</Text>
						</View>
				}
				<MessageModal
					type="Warning"
					title="Delete Person"
					visible={isDelModalVisible}
					onCancel={() => setIsDelModalVisible(false)}
					onConfirm={handleConfirmDelete}
					message={`Are you sure you want to delete this ${selectedPerson?.name} person?`}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
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
		fontFamily: 'Poppins_400Regular',
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
		color: '#000',
		fontFamily: 'Poppins_700Bold',
	},
	dob: {
		color: '#333',
		fontFamily: 'Poppins_400Regular',
	},
	addButton: {
		width: "100%",
		display: 'flex',
		justifyContent: 'center',
		justifyItems: 'center',
		textAlign: 'center',
	},
	header: {
		marginTop: 48
	},
	avatarBtn: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: "center",
		padding: 16,
		gap: 8,
	},
	delbtn: {
		display: 'flex',
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		borderRadius: 16,
		paddingLeft: 24,
		paddingRight: 24,
	},
	addBtn: {
		fontSize: 16,
		color: '#000',
		borderStyle: 'solid',
		borderWidth: 1,
		padding: 8,
		borderRadius: 8,
		fontFamily: 'Poppins_400Regular',
	},
	empty: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		color: '#000',
		fontFamily: 'Poppins_400Regular',
	}
});
