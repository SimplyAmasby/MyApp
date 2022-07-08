import { useNumberHelper } from "../src/utilities/useNumberHelper";
const [convertHeight, convertWeight] = useNumberHelper();

test('convert 1 pound to kg', () => {
    const isMetric = false;
    expect(convertWeight(1, isMetric)).toBe(0.45);
});

test('convert 10 pound to kg', () => {
    const isMetric = false;
    expect(convertWeight(10, isMetric)).toBe(4.54);
});

test('convert 1 kg to pound', () => {
    const isMetric = true;
    expect(convertWeight(1, isMetric)).toBe(2.2);
});

test('convert 10 kg to pound', () => {
    const isMetric = true;
    expect(convertWeight(10, isMetric)).toBe(22.05);
});


test('convert 1 foot to meter', () => {
    const toMetric = true;
    expect(convertHeight(1, toMetric)).toBe(0.3);
});

test('convert 10 feet to meters', () => {
    const toMetric = true;
    expect(convertHeight(10, toMetric)).toBe(3.05);
});

test('convert 1 meter to feet', () => {
    const toMetric = false;
    expect(convertHeight(1, toMetric)).toBe(3.28);
});

test('convert 10 meters to feet', () => {
    const toMetric = false;
    expect(convertHeight(10, toMetric)).toBe(32.81);
});