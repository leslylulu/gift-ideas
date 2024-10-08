import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
	const [people, setPeople] = useState([]);
	const STORAGE_KEY = "people";

	useEffect(() => {
		const loadPeople = async () => {
			const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
			if (savedPeople) {
				setPeople(JSON.parse(savedPeople));
			}
		}
		loadPeople();
	}, [])


	const addPeople = async (name, dob) => {
		const newPerson = {
			id: randomUUID(),
			name,
			dob
		}
		const newPeople = [...people, newPerson];
		setPeople(newPeople);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPeople));
	}

	return (
		<PeopleContext.Provider value={{ people, addPeople }}>
			{children}
		</PeopleContext.Provider>
	)
};

export default PeopleContext;