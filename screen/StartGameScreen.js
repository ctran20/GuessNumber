import React, { useState } from 'react';
import {
    View, Text, StyleSheet, Button,
    TouchableWithoutFeedback, Keyboard, Alert, ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card'
import Input from '../components/Input'
import Colors from '../constants/colors'
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MButton from '../components/MButton';


const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 to 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }

        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {

        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MButton>
            </Card>
        );


    }

    return (

        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>
                        <Card style={styles.props}>
                            <View style={styles.inputContainer}>
                                <BodyText>Select a Number</BodyText>
                                <Input
                                    style={styles.input}
                                    blurOnSubmit
                                    keyboardType='number-pad'
                                    maxLength={2}
                                    onChangeText={numberInputHandler}
                                    value={enteredValue}
                                />
                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}>
                                        <Button title="Reset"
                                            onPress={resetInputHandler}
                                            color={Colors.accent} />
                                    </View>
                                    <View style={styles.button}>
                                        <Button title="Confirm"
                                            onPress={confirmInputHandler}
                                            color={Colors.primary} />
                                    </View>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },

    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },

    input: {
        width: 50,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },

    text: {
        fontFamily: 'open-sans',
    }
});

export default StartGameScreen;