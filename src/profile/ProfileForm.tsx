import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Profile, ProfileReducerAction, ReducerActionType, Units } from "./ProfileTypes";


export interface ProfileFormProps {
    profile: Profile
    dispatch: (profile: ProfileReducerAction) => void
    onSave: () => void
}

export const ProfileForm = ({ dispatch, onSave, profile }: ProfileFormProps) => {

    const getWeightLabel = (): string => {
        return `${profile.units === Units.Metric ? 'kg' : 'lb'}${profile.weight > 1 ? 's' : ''}`;
    }
    const imperialHeightComponent = useCallback(
        () => {
            let feet = Math.floor(profile.height);
            let inches = Math.round((profile.height % 1) * 12);
            return (
                <>
                    <View style={styles.field}>
                        <TextInput
                            keyboardType="numeric"
                            onChangeText={value => dispatch({
                                fieldName: "feet",
                                updateType: ReducerActionType.IMPERIAL_HEIGHT_CHANGE,
                                payload: value
                            })}
                            style={styles.inputStyle}
                            value={feet.toString() || ''}

                        />
                        <Text>ft</Text>
                    </View>
                    <View style={styles.field}>
                        <TextInput
                            keyboardType="numeric"
                            onChangeText={value => dispatch({
                                fieldName: "inches",
                                updateType: ReducerActionType.IMPERIAL_HEIGHT_CHANGE,
                                payload: value
                            })}
                            style={styles.inputStyle}
                            value={inches.toString()}
                        />
                        <Text>in</Text>
                    </View>
                </>
            )
        },
        [profile.height]
    )

    const metriclHeightComponent = useCallback(
        () => (
            <>
                <View style={styles.field}>
                    <TextInput
                        keyboardType="numeric"
                        onChangeText={value => dispatch({
                            fieldName: "height",
                            updateType: ReducerActionType.HANDLE_TEXT_CHANGE,
                            payload: value
                        })}
                        style={styles.inputStyle}
                        value={profile.height?.toString() || ''}

                    />
                    <Text>m</Text>
                </View>
            </>
        ),
        [profile.height]
    )

    return !profile ? <Text>Loading</Text> : (
        <View style={styles.container}>
            <Picker
                selectedValue={profile.units}
                onValueChange={(itemValue) => dispatch({
                    fieldName: "units",
                    updateType: ReducerActionType.HANDLE_PICKER_CHANGE,
                    payload: itemValue
                })}
            >
                <Picker.Item label="Imperial" value={Units.Imperial} />
                <Picker.Item label="Metric" value={Units.Metric} />
            </Picker>
            <Text>Weight</Text>
            <View style={styles.field}>
                <TextInput
                    keyboardType="numeric"
                    onChangeText={value => dispatch({
                        fieldName: "weight",
                        updateType: ReducerActionType.HANDLE_TEXT_CHANGE,
                        payload: value
                    })}
                    value={profile.weight?.toString() || ''}
                />
                <Text>{getWeightLabel()}</Text>
            </View>

            <Text>Height</Text>
            {profile.units === Units.Metric ? metriclHeightComponent() : imperialHeightComponent()}
            <TouchableOpacity style={styles.button} onPress={onSave}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#228B22',
        borderRadius: 20,
        marginTop: 20,
        padding: 10
    },
    container: {
        padding: 20
    },
    field: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputStyle: {
        borderColor: 'black',
        padding: 10
    }
})
