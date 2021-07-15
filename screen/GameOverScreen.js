import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MButton from '../components/MButton';



const GameOverScreen = props => {
    const isPortrait = () => {
        let content = <View style={styles.imageContainer}>
            <Image source={{ uri: props.imgLink }}
                style={styles.image}
                resizeMode="cover" />
        </View>;
        const dim = Dimensions.get('screen');

        if (dim.height >= dim.width) {
            return content;
        } else {
            return;
        }
    };

    return (
        <View style={styles.screen}>
            <TitleText>And Now The Game is Over Now!</TitleText>
            {isPortrait()}
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed{' '}
                    <Text style={styles.highlight}>{props.roundsNumber}</Text>
                    {' '}rounds to guess the number{' '}
                    <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
            </View>

            <MButton onPress={props.onRestart}>
                New Game
            </MButton>


        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 15,
    },
    highlight: {
        color: Colors.accent,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 40,
        marginVertical: 15,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default GameOverScreen;