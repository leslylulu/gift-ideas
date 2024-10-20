import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FAB } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';

import PeopleContext from "../PeopleContext";


export default function IdeaScreen({ route }) {
	const { personId, name } = route.params;
	const { people, deleteIdea } = useContext(PeopleContext);
	const navigator = useNavigation();

	const [ideaList, setIdeaList] = useState([]);

	useEffect(() => {
		const person = people.find(person => person.id === personId);
		if (person) {
			setIdeaList(person.ideas);
		}
	}, [people, personId]);

	const renderIdea = ({ item }) => {

		const handleDelete = async () => {
			await deleteIdea(personId, item.id); // Call your delete function
			const updatedPerson = people.find(person => person.id === personId);
			if (updatedPerson) {
				setIdeaList(updatedPerson.ideas); // Update the list after deletion
			}
		};

		return (
			// <TouchableOpacity style={styles.card} onPress={() => { }}>

			// 	{/* TODO */}
			// 	{/* image , delete */}
			// 	{/* Successfully	delete and reload */}
			// 	{/* The thumbnail images should be the same aspect ratio as the images that were saved, just smaller. */}
			// </TouchableOpacity >

			<View style={styles.card}>
				<Image
					source={{ uri: item.img }}
					style={styles.thumbnail}
					resizeMode="cover"
				/>
				<View style={styles.textContainer}>
					<Text style={styles.ideaText}>{item.text}</Text>
				</View>
				<TouchableOpacity style={styles.delContainer} onPress={handleDelete}>
					<AntDesign name="delete" size={24} color="#e60023" />
					<Text style={styles.deleteButton}>Delete</Text>
				</TouchableOpacity>
			</View>
		)
	}

	console.log("ideaList === ", ideaList); // undefined

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<Text style={styles.ideaHeader}>{name}'s Ideas</Text>
				{
					ideaList && ideaList.length > 0 ? <FlatList
						style={styles.ideaList}
						data={ideaList}
						keyExtractor={item => item.id}
						renderItem={renderIdea}
					/> : <View style={styles.empty}>
						<Text style={styles.emptyText}>No ideas yet</Text>
						<Text>Start by adding your first idea!</Text>
					</View>
				}
				<FAB
					icon="plus"
					style={styles.fab}
					onPress={() => navigator.navigate("AddIdea", { personId, name })}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 8,
		marginRight: 8,
	},
	userList: {
		margin: 8,
		display: 'flex',
		flexDirection: 'column',
	},

	thumbnail: {
		aspectRatio: 2 / 3,
		width: "30%",
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
	},
	textContainer: {
		flex: 1,
		marginLeft: 10,
	},
	ideaText: {
		fontSize: 16,
	},
	delContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 20,
		gap: 10,
	},
	deleteButton: {
		color: '#e60023',
		fontWeight: 'bold',
	},
	card: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#e6ebc1',
		margin: 4,
		borderRadius: 16,
		alignItems: 'center',
	},

	ideaHeader: {
		padding: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 24,
	},
	ideaList: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		minHeight: "70%",
	},
	empty: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	emptyText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: '#DDF42B',
	},

});
