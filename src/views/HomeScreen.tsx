import React from "react";
import { ThemeManager } from "../classes/ThemeManager";
import {
  getUserFromServer,
  getFavPackingFromServer,
  getSavedLuggageFromServer,
  getPromptLuggageFromServer,
  getUserIdFromServer,
  getAllUserDataFromServer,
} from "../api/apiServices/queryServices";
import {
  insertUserToServer,
  insertFavPackingToServer,
  insertSavedLuggageToServer,
  updateFavPackingToServer,
  updateSavedLuggageToServer,
  updateUserToServer,
  deleteUserToServer,
} from "../api/apiServices/mutationServices";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
  Button,
} from "react-native";
import TopProfileBar from "../components/topBars/TopProfileBar";

import { useDispatch } from "react-redux";
import { getReduxStoreUser } from "../redux/getReduxStore";
interface customProps {
  navigation: any;
}

const HomeScreen = (props: customProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const theme = new ThemeManager();
  const style = StyleSheet.create({
    text: {
      fontFamily: "Afacad-BoldItalic",
      fontSize: 20,
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
  });

  const myStore = getReduxStoreUser();
  // console.log("LA STORE DE REDUX", myStore);

  return (
    <SafeAreaView
      style={[
        style.container,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
        },
      ]}
    >
      <StatusBar
        barStyle={theme.themeMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <TopProfileBar />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          alignItems: "center",
          paddingBottom: Platform.OS === "android" ? 80 : 60,
        }}
        style={{
          width: "100%",
        }}
      >
        <Button
          title="Get user"
          onPress={() =>
            getUserFromServer("ec949b67-c76f-4dbd-8084-f28ce4e61c46")
          }
        />
        <Button
          title="Get user all data"
          onPress={() =>
            getAllUserDataFromServer("ae28c49b-d57a-4081-a802-ae7f2aed5c7a")
          }
        />
        <Button
          title="Get user ID"
          onPress={() => getUserIdFromServer("monetizacion@gmail.com")}
        />
        <Button
          title="Get Packing"
          onPress={() =>
            getFavPackingFromServer("ec949b67-c76f-4dbd-8084-f28ce4e61c46")
          }
        />
        <Button
          title="Get savedLuggage"
          onPress={() =>
            getSavedLuggageFromServer("9840cca1-d935-4082-b71a-4a3f0fc8a751")
          }
        />
        <Button
          title="propmt Luggage"
          onPress={() =>
            getPromptLuggageFromServer("123123123123123123123123123123123123")
          }
        />
        <Button
          color={"red"}
          title="insert user"
          onPress={() =>
            insertUserToServer({
              Email: "monetizacion@gmail.com",
              Surname: "Monte",
              Name: "Mont",
              //  097fc05c-586e-44db-b796-b0db2da30485
            })
          }
        />
        <Button
          color={"red"}
          title="insert favPacking"
          onPress={() =>
            insertFavPackingToServer({
              Name: "SPAIN",
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
              Luggage_1: "bla bla bla",
              Luggage_2: "",
              Luggage_3: "",
              Luggage_4: "",
              packing_type: 1,
            })
          }
        />
        <Button
          color={"red"}
          title="insert savedLuggage"
          onPress={() =>
            insertSavedLuggageToServer({
              luggage1: "carry on",
              luggage2: "",
              luggage3: "Backpack",
              luggage4: "",
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
            })
          }
        />
        {/* <Button
          color={"green"}
          title="update user"
          onPress={() =>
            updateUserToServer({
              Name: "Thor",
              Surname: "Odinson",
              Email: "monetizacion@gmail.com",
              DateOfBirth: new Date("1998-01-01"),
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
              // height: 180,
              Gender: "male",
              // email: "monetizacion@gmail.com",
            })
          }
        /> */}
        <Button
          color={"green"}
          title="update favPacking"
          onPress={() =>
            updateFavPackingToServer({
              packing_type: 1,
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
              id: 21,
            })
          }
        />
        <Button
          color={"green"}
          title="update savedLuggage"
          onPress={() =>
            updateSavedLuggageToServer({
              luggage1: "Big suitcase",
              luggage2: "",
              luggage3: "Backpack",
              luggage4: "",
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
            })
          }
        />

        <Button
          color={"blue"}
          title="delete user"
          onPress={() =>
            deleteUserToServer("aecef0f6-726b-4fdb-b21f-b3252ad97db9")
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
