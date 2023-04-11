import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { styles } from "../utils/styles";

export default function RMGamerScreens() {
  const [personagem, setPersonagem] = useState(null);
  const [personagens, setPersonagens] = useState(0);
  const [totalPersonagens, setTotalPersonagens] = useState(0);
  const [resposta, setResposta] = useState(null);

  useEffect(() => {
    retornaTotalDePersonagens();
  }, []);

  function buscaPersonagemAleatorio() {
    fetch(
      "https://rickandmortyapi.com/api/character/" + retornaIndiceAleatorio()
    )
      .then((response) => response.json())
      .then((json) => {
        setPersonagem(json);
        console.log(json);
      })

      .catch((error) => {
        console.error(error);
      });

    setResposta(null);
  }

  function retornaTotalDePersonagens() {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((json) => {
        setTotalPersonagens(json.info.count);
        buscaPersonagemAleatorio();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function retornaIndiceAleatorio() {
    return Math.floor(Math.random() * totalPersonagens);
  }

  function checkIfPersonagemEstaVivo() {
    if (personagem.status === "Alive") {
      setResposta(true);
    } else {
      setResposta(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Este personagem está vivo?</Text>
      <Image
        source={{ uri: personagem?.image }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Personagem: {personagem?.name}</Text>
      <View>
        <Button onPress={() => checkIfPersonagemEstaVivo()}>
          SIM
        </Button>
        <Button onPress={() => !checkIfPersonagemEstaVivo()}>
          NÃO
        </Button>
      </View>

      <View>
        {resposta !== null && (
          <Text>{resposta ? "Vivaço" : "Morreu"}</Text>
        )}
      </View>

      <Button onPress={buscaPersonagemAleatorio}> Buscar Personagem </Button>
    </View>
  );
}
