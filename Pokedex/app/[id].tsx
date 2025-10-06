import PokemonTypeIcons from "@/assets/icons";
import Button from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from 'expo-av';

type PokemonType = {
  type: {
    name: string,
  },
};

type Pokemon = {
  cries: {
    latest: string,
  },
  height: number,
  id: number,
  name: string,
  sprites: {
    other: {
      "official-artwork": {
        front_default: string,
      },
    },
  },
  types: PokemonType[],
  weight: number,
};

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const DetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const [pokemonData, setPokemonData] = useState<Pokemon>();
    const [loading, setLoading] = useState(false);

    const fetchUrl = (url: URL | null) => 
        {
          if(url === null){return;}
          setLoading(true);
          fetch(url).then(request => request.json()).then((data: Pokemon) => {
            setPokemonData(data);
          }).catch(() => setPokemonData(undefined)).finally(() => setLoading(false));
        }
    
    useEffect(() => fetchUrl(new URL(`${BASE_URL}/${id}/`)), [])
    
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const playAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: pokemonData?.cries.latest || '' },
        { shouldPlay: true, volume: 1 }
      );
      await sound.playAsync();
    };

    const goHome = () => router.push('/');

    if(loading)
    {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.loading}>Loading...</Text>
        </SafeAreaView>
        );
    }

    if(!pokemonData)
        {
            return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.error}>Pokemon not found</Text>
            <Button leftIcon='home' text="Home" onPress={() => router.push('/')}/>
        </SafeAreaView>
        );
        }

    return (<SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.pokemonContainer}>
            <View style={styles.dataContainer}>
                <Image style={styles.image} source={{uri: pokemonData.sprites.other["official-artwork"].front_default}}/>
                <Text style={[styles.largeText, styles.boldText]}>{capitalize(pokemonData.name)}</Text>
                <Text style={[styles.normalText, styles.boldText]}>Height:<Text style={styles.normalText}>{` ${pokemonData.height / 10}m`}</Text></Text>
                <Text style={[styles.normalText, styles.boldText]}>Weight:<Text style={styles.normalText}>{` ${pokemonData.weight / 10}Kg`}</Text></Text>
                <View style={styles.typeContainer}>{pokemonData.types.map(({type}) => 
                  <Image key={type.name} source={PokemonTypeIcons[type.name]}/>)
                  }</View>
            </View>
            <View style={styles.buttonContainer}>
              <Button leftIcon={'play-arrow'} text="Play" onPress={playAudio}/>
              <Button leftIcon={'home'} text="Home" onPress={goHome}/>
            </View>
        </ScrollView>
    </SafeAreaView>);
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 32,
    textAlign: 'center',
  },
  error: {
    fontSize: 40,
    textAlign: 'center',
    color: 'red',
  },
  pokemonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  dataContainer: {
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "#f9c2ff",
    gap: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 50,
  },
  image: {
    width: 200,
    height: 200,
  },
  largeText: {
    fontSize: 36,
  },
  boldText: {
    fontWeight: "bold",
  },
  normalText: {
    fontWeight: "normal",
    fontSize: 24,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  }
})

export default DetailsScreen;