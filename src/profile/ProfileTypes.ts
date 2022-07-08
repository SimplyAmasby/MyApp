export enum Units {
    Imperial,
    Metric
}

export interface Profile {
    weight: number,
    height: number,
    units: Units
}

export enum ReducerActionType {
    HANDLE_PICKER_CHANGE,
    HANDLE_TEXT_CHANGE,
    IMPERIAL_HEIGHT_CHANGE,
    UPDATE_STATE
}

export type ProfileReducerAction = {
    updateType: ReducerActionType,
    fieldName: string,
    payload: string | Units | Profile
}