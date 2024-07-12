import {
  Button,
  Card,
  Dialog,
  Divider,
  Icon,
  Image,
  Text,
} from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ScrollView, View } from "react-native";
import { firebase } from "../config";
import { CardImage } from "@rneui/base/dist/Card/Card.Image";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import { collection, onSnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);

  const makeACall = (phone) => {
    const url = `tel:${phone}`;
    Linking.openURL(url);
  };

  const openEmail = (email) => {
    const url = `mailto:${email}?subject=${encodeURIComponent(
      "Contacto desde Agrovid"
    )}&body=${encodeURIComponent(
      "Hola, vi tu perfil en Agrovid y me gustaría contactarte."
    )}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebase.firestore(), "resume"),
      (querySnapshot) => {
        const newResumes = querySnapshot.docs.map((doc) => doc.data());
        setResumes(newResumes);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe(); // Asegúrate de desuscribirte cuando el componente se desmonte
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      {resumes.map((resume) => (
        <View key={resume.email}>
          <Card>
            <CardImage
              source={{ uri: resume.featuredImage }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{ position: "absolute", top: 0 }}>
              <Image
                source={{ uri: resume.profileImage }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderColor: "black",
                  borderWidth: 2,
                  marginLeft: 20,
                  marginTop: 110,
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={{ marginTop: 40, marginBottom: 5 }}>
              <Text h4>{resume.name}</Text>
              <Text>{resume.description}</Text>
            </View>
            <CardDivider />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button color={"primary"} onPress={() => openEmail(resume.email)}>
                <Icon name="mail" type="material" color="black" />
              </Button>
              <View style={{ width: 10 }} />
              <Button
                color={"success"}
                onPress={() => makeACall(resume.phoneNumber)}
              >
                <Icon name="phone" type="material" color="black" />
              </Button>
            </View>
          </Card>
        </View>
      ))}
      <Dialog isVisible={loading}>
        <Dialog.Loading />
      </Dialog>
    </ScrollView>
  );
};

export default Dashboard;
