export const useNumberHelper = () => {
    const METRIC_TO_IMPERIAL_HEIGHT = 0.3048;
    const IMPERIAL_TO_METRIC_HEIGHT = 3.28084;

    const METRIC_TO_IMPERIAL_WEIGHT = 0.453592;
    const IMPERIAL_TO_METRIC_WEIGHT = 2.20462082;

    const convertHeight = (height: number, isMetric: boolean): number => {
        const multiplier = isMetric ? METRIC_TO_IMPERIAL_HEIGHT : IMPERIAL_TO_METRIC_HEIGHT;
        return Number((height * multiplier).toFixed(2));
    }

    const convertWeight = (weight: number, isMetric: boolean): number => {
        const multiplier = isMetric ? METRIC_TO_IMPERIAL_WEIGHT : IMPERIAL_TO_METRIC_WEIGHT;
        return Number((weight * multiplier).toFixed(2));
    }

    return [convertHeight, convertWeight]
}