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
			if (savedPeople) setPeople(JSON.parse(savedPeople));
		};
		loadPeople();
	}, []);

	const addPerson = async (name, dob) => {
		const newPerson = {
			id: randomUUID(),
			name,
			dob,
			ideas: []
		};
		const updatedPeople = [...people, newPerson];
		setPeople(updatedPeople);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
	};

	const updatePerson = async (personId, idea) => {
		const updatedPeople = people.map((person) =>
			person.id === personId
				? {
					...person,
					ideas: [...person.ideas, idea] // Append the new idea to the existing ideas
				}
				: person
		);

		setPeople(updatedPeople);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
	};


	const deleteIdea = async (personId, ideaId) => {
		// Update the people state by removing the specified idea
		const updatedPeople = people.map((person) => {
			if (person.id === personId) {
				// Filter out the idea to be deleted
				return {
					...person,
					ideas: person.ideas.filter((idea) => idea.id !== ideaId),
				};
			}
			return person;
		});

		// Update state and AsyncStorage
		setPeople(updatedPeople);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
	};

	const deletePerson = async (personId) => {
		const updatedPeople = people.filter((person) => person.id !== personId);
		setPeople(updatedPeople);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
	}



	return (
		<PeopleContext.Provider value={{ people, addPerson, updatePerson, deleteIdea, deletePerson }}>
			{children}
		</PeopleContext.Provider>
	);
};

export default PeopleContext;