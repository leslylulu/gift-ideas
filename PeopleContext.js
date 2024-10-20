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
		if (!name || typeof name !== 'string') {
			throw new Error("Invalid name: Name must be a non-empty string.");
		}
		if (!dob || isNaN(new Date(dob))) {
			throw new Error("Invalid date of birth: Date of birth must be a valid date.");
		}
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
		const personExists = people.some((person) => person.id === personId);
		if (!personExists) {
			throw new Error("Invalid person ID: No person found with the given ID.");
		}

		if (!idea || !idea.text || typeof idea.text !== 'string') {
			throw new Error("Invalid idea: Idea must have a valid text property.");
		}
		if (!idea.img || typeof idea.img !== 'string') {
			throw new Error("Invalid idea: Image URL must be a valid string.");
		}

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

		const person = people.find((person) => person.id === personId);
		if (!person) {
			throw new Error("Invalid person ID: No person found with the given ID.");
		}

		const ideaExists = person.ideas.some((idea) => idea.id === ideaId);
		if (!ideaExists) {
			throw new Error("Invalid idea ID: No idea found with the given ID.");
		}

		const updatedPeople = people.map((person) => {
			if (person.id === personId) {
				return {
					...person,
					ideas: person.ideas.filter((idea) => idea.id !== ideaId),
				};
			}
			return person;
		});

		setPeople(updatedPeople);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
	};

	const deletePerson = async (personId) => {
		const personExists = people.some((person) => person.id === personId);
		if (!personExists) {
			throw new Error("Invalid person ID: No person found with the given ID.");
		}

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