import { useEffect, useState } from 'react';

import { GameParams } from '../../@types/navigation';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation, useRoute } from '@react-navigation/native';

import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';





// Style
import { styles } from './styles';
import { THEME } from '../../theme';
import { Entypo } from '@expo/vector-icons';
import logoImg from '../../assets/logo-nlw-esports.png';

// Components
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';


export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  };


  useEffect(() => {
    fetch(`http://192.168.100.3:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, []);
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
            onPress={handleGoBack}>
              <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
              />
            </TouchableOpacity>

            <Image 
              source={logoImg}
              style={styles.logo}
            />

            <View style={styles.right}/>
          </View>

          <Image source={{uri: game.bannerUrl}}
          style={styles.cover} />

          <Heading
          title={game.title}
          subtitle="Connect and start playing!" 
          />

          <FlatList 
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <DuoCard data={item} 
              onConnect={() => {}}
              />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                There's no ads here
              </Text>
            )}
          />
      </SafeAreaView>
    </Background>
  );
}