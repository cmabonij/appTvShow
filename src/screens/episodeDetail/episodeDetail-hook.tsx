import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { ScrollView } from 'react-native-gesture-handler';

export const EpisodeDetail = ({ route }) => {
    const { id } = route.params;
    const [episodeDetail, setEpisodeDetail] = useState<any>({});
    const [episodeDescription, setEpisodeDescription] = useState('');
    const [imageEpisode, setImageEpisode] = useState('');

    useEffect(() => {
        getEpisode();

    }, []);

    const getEpisode = async () => {
        console.log(id)
        const response = await fetch(`https://api.tvmaze.com/episodes/${id}`);
        const responseJson = await response.json();
        setEpisodeDetail(responseJson);
        setImageEpisode(responseJson.image.original);
        setEpisodeDescription(responseJson.summary.replace('<p>', '').replace('</p>', '').replace('<b>', '').replace('</b>', ''))
    }


    console.log(episodeDetail.image)
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ alignItems: 'center', backgroundColor: 'black', paddingBottom: 10 }}>
                    <Image
                        source={{ uri: imageEpisode || ' ' }}
                        style={{ width: ScreenWidth, height: ScreenWidth, resizeMode: 'stretch', }}
                    />
                </View>
                <View style={{ paddingStart: 15, paddingEnd: 10, paddingBottom: 10 }}>
                    <Text style={{ fontSize: 35, color: 'black', }}>{episodeDetail.name}</Text>
                    <Text style={{ fontSize: 20, alignItems: 'stretch' }}>{`${episodeDescription}`}</Text>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}