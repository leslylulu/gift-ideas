import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";

const stack = createStackNavigator();

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<stack.Navigator>
				<stack.Screen name="People" component={PeopleScreen} />
				<stack.Screen name="AddPerson" component={AddPersonScreen} />
				<stack.Screen name="Ideas" component={IdeaScreen} />
				<stack.Screen name="AddIdea" component={AddIdeaScreen} />

			</stack.Navigator>
		</NavigationContainer>
	)
}