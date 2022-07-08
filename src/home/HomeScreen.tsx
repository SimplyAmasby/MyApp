import React, { Reducer, useEffect, useReducer, useState } from "react";
import { ProfileForm } from "../profile/ProfileForm";
import Toast from "react-native-toast-message";
import { profileClient } from "../profile/ProfileClient";
import { Profile, ProfileReducerAction, ReducerActionType, Units } from "../profile/ProfileTypes";
import { useNumberHelper } from "../utilities/useNumberHelper";

export const HomeScreen = () => {

    const initialState: Profile = {
        weight: 0,
        height: 0,
        units: Units.Imperial
    };

    const showToast = (type: string, message: string) => {
        Toast.show({
            type: type,
            text1: message
        });
    }

    const calculateImperialHeight = (currentHeight: number, newValue: number, isInches: boolean): number => {
        const currentFeet = Math.floor(currentHeight);
        const currentInches = currentHeight % 1;
        if (isInches) {
            const n = Number(currentFeet + ((newValue > 11 ? 11 : newValue) / 12))
            return Number(n.toFixed(2));
        }

        return newValue + currentInches;
    }

    const [convertHeight, convertWeight] = useNumberHelper();

    const updateProfileReducer: Reducer<Profile, ProfileReducerAction> = (state, action): Profile => {
        switch (action.updateType) {
            case ReducerActionType.HANDLE_TEXT_CHANGE:
                return {
                    ...state,
                    [action.fieldName]: Number(action.payload) ? Number(action.payload) : 0
                }
            case ReducerActionType.IMPERIAL_HEIGHT_CHANGE:
                const value = Number(action.payload) ? Number(action.payload) : 0;
                return { ...state, height: calculateImperialHeight(state.height, value, action.fieldName === 'inches') }
            case ReducerActionType.HANDLE_PICKER_CHANGE:
                const isMetric = action.payload === Units.Metric;
                return {
                    height: convertHeight(state.height, isMetric),
                    weight: convertWeight(state.weight, isMetric),
                    units: isMetric ? Units.Metric : Units.Imperial
                }
            case ReducerActionType.UPDATE_STATE:
                const newProfile = action.payload as Profile;
                return (newProfile.height > 0 || newProfile.weight > 0) ? newProfile : state as Profile;
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(updateProfileReducer, initialState);

    const handleSave = async () => {
        const successful = await profileClient.saveProfileDataAsync(state)
        if (successful) {
            showToast('success', 'Profile Saved!');
        } else {
            showToast('error', 'Could not save profile');
        }
    }

    useEffect(() => {
        const loadProfileData = async () => {
            let data = await profileClient.loadProfileDataAsync();
            dispatch({
                fieldName: '',
                updateType: ReducerActionType.UPDATE_STATE,
                payload: data
            })
            if(data.height > 0 || data.weight > 0)  showToast('success', 'Profile Loaded!');
        }
        loadProfileData();
    }, [])

    return (
        <>
            <ProfileForm
                dispatch={dispatch}
                onSave={handleSave}
                profile={state}
            />
        </>
    )


}