import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity, Image, Modal, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FAB } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


import PeopleContext from "../PeopleContext";
import MessageModal from "../components/messageModal";


export default function IdeaScreen({ route }) {
	const { personId, name } = route.params;
	const { people, deleteIdea } = useContext(PeopleContext);
	const navigator = useNavigation();

	const [ideaList, setIdeaList] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDelModalVisible, setIsDelModalVisible] = useState(false);

	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		const person = people.find(person => person.id === personId);
		if (person) {
			setIdeaList(person.ideas);
		} else {
			Alert.alert("Person not found");
			navigator.goBack();
		}
	}, [people, personId]);

	const confirmDelete = async () => {
		await deleteIdea(personId, item.id); // Call your delete function
		const updatedPerson = people.find(person => person.id === personId);
		if (updatedPerson) {
			setIdeaList(updatedPerson.ideas); // Update the list after deletion
		}
		setIsDelModalVisible(false);
	};


	const renderIdea = ({ item }) => {

		const openImageModal = () => {
			setSelectedImage(item.img);
			setIsModalVisible(true);
		}

		const handleDelete = async () => {
			setIsDelModalVisible(true);

		};


		return (

			// 	{/* TODO */}
			// 	{/* Successfully	delete and reload */}
			// 	{/* The thumbnail images should be the same aspect ratio as the images that were saved, just smaller. */}
			// </TouchableOpacity >

			<View style={styles.card}>
				<TouchableOpacity onPress={openImageModal}>
					<Image
						source={{ uri: item.img }}
						style={styles.thumbnail}
						resizeMode="cover"
					/>
				</TouchableOpacity>

				<View style={styles.actionBtns}>
					<View style={styles.textContainer}>
						<Text style={styles.ideaText}>{item.text}</Text>
					</View>
					<TouchableOpacity style={styles.delContainer} onPress={handleDelete}>
						<AntDesign name="delete" size={24} color="#e60023" />
					</TouchableOpacity>
				</View>
			</View>
		)
	}


	const closeImageModal = () => {
		setIsModalVisible(false);
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<View style={styles.ideaHeader}>
					<FontAwesome5 name="star-and-crescent" size={24} color="#000" />
					<Text style={styles.headerText}>{name}'s Ideas</Text>
				</View>
				{
					ideaList && ideaList.length > 0 ? <FlatList
						style={styles.ideaList}
						data={ideaList}
						keyExtractor={item => item.id}
						renderItem={renderIdea}
						numColumns={2}
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

				<Modal
					visible={isModalVisible}
					transparent={true}
					onRequestClose={closeImageModal}
				>
					<View style={styles.modalContainer}>
						<Image
							source={{ uri: selectedImage }}
							style={styles.fullSizeImage}
							resizeMode="contain"
						/>
						<TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
							<AntDesign name="closecircle" size={48} color="#DDF42B" />
						</TouchableOpacity>
					</View>
				</Modal>


				<MessageModal
					visible={isDelModalVisible}
					type="Warning"
					message="Are you sure you want to delete this idea?"
					onConfirm={confirmDelete}
					onCancel={() => setIsDelModalVisible(false)}
				/>


			</SafeAreaView>
		</SafeAreaProvider>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor: '#fff',
	},
	userList: {
		margin: 8,
		display: 'flex',
		flexDirection: 'column',
	},
	thumbnail: {
		aspectRatio: 2 / 3,
		width: "100%",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	actionBtns: {
		backgroundColor: '#000',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 16,
		paddingTop: 8,
		paddingBottom: 8,
	},
	textContainer: {
		flex: 1,
		marginLeft: 8,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	ideaText: {
		fontSize: 16,
		color: '#fff',
		padding: 8,
		fontFamily: "Poppins_700Bold",
	},
	delContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 20,
		gap: 10,
	},
	card: {
		flex: 1,
		flexDirection: 'column',
		margin: 4,
		alignItems: 'center',
	},

	ideaHeader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		padding: 16,
		fontWeight: 'bold',
		fontSize: 24,
	},
	headerText: {
		fontSize: 24,
		fontFamily: 'Poppins_700Bold',
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
		fontFamily: 'Poppins_400Regular',
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: '#DDF42B',
	},
	modalCloseButton: {
	},
	fullSizeImage: {
		aspectRatio: 2 / 3,
		width: '100%',
	},

});
