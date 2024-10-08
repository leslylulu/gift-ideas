import { FlatList, View, Text, SafeAreaView, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


export default function PeopleScreen() {
	const navigation = useNavigation();

	const people = [
		{
			id: "dhie-dejoifjoejf",
			name: "John Doe",
			dob: "1993-01-01",
		},
		{
			id: "dhie-dejoifjoejf",
			name: "Alex Doe",
			dob: "1993-01-12",
		},
		{
			id: "dhie-dejoifjoejf",
			name: "Jane Doe",
			dob: "1993-01-23",
		},
		{
			id: "dhie-dejoifjoejf",
			name: "Jenny Doe",
			dob: "1993-01-30",
		}
	]

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<FlatList
					data={people}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<View>
							<Text>{item.name}</Text>
							<Text>{item.dob}</Text>
						</View>
					)}
				/>
				<Button title="Add Person" onPress={() => navigation.navigate("AddPerson")}></Button>
			</SafeAreaView>
		</SafeAreaProvider>
	)

}