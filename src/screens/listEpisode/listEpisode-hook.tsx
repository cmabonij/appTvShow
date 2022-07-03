import React, { useEffect, useState, } from 'react';
import { Text, View, SafeAreaView, Image, FlatList, TouchableHighlight, } from 'react-native';
import { Card } from 'react-native-elements';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

export const ListEpisode = ({ navigation }) => {
    const [listEpisodes, setListEpisodes] = useState<any[]>([]);
    const [imageShow, setImageShow] = useState('');
    const [descriptionShow, setDescriptionShow] = useState('');
    const [showProps, setShowProps] = useState<any>({});

    useEffect(() => {
        getPropsShow();
        getListEpisodes();
    }, []);

    const getPropsShow = async () => {
        const response = await fetch(`https://api.tvmaze.com/shows/1955`);
        const responseJson = await response.json();
        setShowProps(responseJson);
        setImageShow(responseJson.image.original);
        setDescriptionShow(responseJson.summary.replace('<p>', '').replace('</p>', '').replace('<b>', '').replace('</b>', ''))
    }

    const getListEpisodes = async () => {
        const response = await fetch(`https://api.tvmaze.com/shows/1955/episodes`);
        const responseJson = await response.json();
        setListEpisodes(responseJson);
    }

    const renderItem = ({ item }: any) => (

        <View style={{ flex: 1 }}>
            {(item.number === 1) ? (<Text style={{ paddingTop: 20, paddingStart: 15, fontSize: 25 }}>{`Season ${item.season}`}</Text>) : null}
            <Card>
                <TouchableHighlight
                    key={item.key}
                    onPress={() => {
                        navigation.navigate('Detail', { id: item.id })
                    }}
                >
                    <View style={{ flexDirection: 'row', maxWidth: ScreenWidth * 0.6 }}>
                        <Image
                            source={{ uri: item.image.original || ' ' }}
                            style={{ width: ScreenWidth / 4, height: ScreenWidth / 4, resizeMode: 'stretch', }}
                        />
                        <View style={{ paddingStart: 5 }}>
                            <Text style={{ fontSize: 20 }}>{`${item.number} - ${item.name}`}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </Card>
        </View >
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', backgroundColor: 'black', paddingBottom: 10 }}>
                <Image
                    source={{ uri: imageShow || ' ' }}
                    style={{ width: ScreenWidth / 2, height: ScreenWidth / 2, resizeMode: 'stretch', }}
                />
            </View>
            <View style={{ paddingStart: 15, paddingEnd: 10, paddingBottom: 10 }}>
                <Text style={{ fontSize: 40, color: 'black', }}>{showProps.name}</Text>
                <Text style={{ fontSize: 15, alignItems: 'stretch' }}>{descriptionShow}</Text>
            </View>
            <FlatList
                data={listEpisodes}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView >
    );
}