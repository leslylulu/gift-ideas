import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function AddPersonScreen() {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const { addPerson } = useContext(PeopleContext);

	const navigation = useNavigation();

	const savePerson = () => {
		if (name && dob) {
			addPerson(name, dob);
			navigation.goBack();
		}

	}
	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<TextInput placeholder="Name" value={name} onChangeText={setName} />
				<TextInput placeholder="1993-01-01" value={dob} onChangeText={setDob} />
				<Button title="Save" onPress={savePerson}></Button>
				<Button title="Cancel" onPress={() => navigation.goBack()}></Button>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}