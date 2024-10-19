import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FAB } from 'react-native-paper';

import PeopleContext from "../PeopleContext";


export default function IdeaScreen({ route }) {
	const { personId, name } = route.params;
	const { people } = useContext(PeopleContext);
	const navigator = useNavigation();

	const [ideaList, setIdeaList] = useState([]);

	useEffect(() => {
		const person = people.find(person => person.id === personId);
		if (person) {
			setIdeaList(person.ideas);
		}
	}, [people, personId]);

	const renderIdea = ({ item }) => {
		return (
			<TouchableOpacity style={styles.card} onPress={() => { }}>

				{/* TODO */}
				{/* image , delete */}
				{/* Successfully	delete and reload */}
				{/* The thumbnail images should be the same aspect ratio as the images that were saved, just smaller. */}
			</TouchableOpacity >
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
					onPress={() => navigator.navigate("AddIdea", { personId })}
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
