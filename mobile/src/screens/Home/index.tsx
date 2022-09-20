import {useEffect, useState} from 'react'
import { Image, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';


import { styles } from './styles';

import { Heading } from '../../components/Heading';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';

import { SafeAreaView } from 'react-native-safe-area-context';

import { GameCard, GameCardProps } from '../../components/GameCard';


export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl});
  };

  useEffect(() => {
    fetch('http://192.168.100.3:3333/games')
    .then(response => response.json())
    .then(data=> setGames(data))
  }, []);

  return (
    <Background>
    <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title="Find your Duo!"
          subtitle="Select the game you want to play"
        />

        <FlatList 
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard 
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
    </SafeAreaView>
    </Background>
  );
}