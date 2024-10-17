import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";
import { PaperProvider } from "react-native-paper";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
	const [people, setPeople] = useState([]);

	const STORAGE_KEY = "people";

	useEffect(() => {
		const loadPeople = async () => {
			const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
			if (savedPeople) setPeople(JSON.parse(savedPeople));
		};
		loadPeople();
	}, []);

	const addPerson = async (name, dob) => {
		const newPerson = {
			id: randomUUID(),
			name,
			dob,
			idea: []
		};
		const updatedPeople = [...people, newPerson];
		setPeople(updatedPeople);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
	};

	return (
		<PaperProvider>
			<PeopleContext.Provider value={{ people, addPerson }}>
				{children}
			</PeopleContext.Provider>
		</PaperProvider>
	);
};

export default PeopleContext;