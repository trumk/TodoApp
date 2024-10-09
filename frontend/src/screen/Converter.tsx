import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const units = ['meters', 'kilometers', 'miles', 'feet'];

const unitConversionRates: { [key: string]: number } = {
  meters: 1,
  kilometers: 0.001,
  miles: 0.000621371,
  feet: 3.28084,
};

const Converter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('kilometers');
  const [convertedValue, setConvertedValue] = useState<string>('');

  const handleConvert = () => {
    if (parseFloat(inputValue) < 0) return; 

    const valueInMeters = parseFloat(inputValue) / unitConversionRates[fromUnit];
    const result = valueInMeters * unitConversionRates[toUnit];

    setConvertedValue(Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, ''));
  };

  const handleInputChange = (value: string) => {
    if (!value.startsWith('-')) {
      setInputValue(value); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange} 
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fromUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setFromUnit(itemValue)}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>

        <Text style={styles.pickerText}>to</Text>

        <Picker
          selectedValue={toUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setToUnit(itemValue)}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>

      {convertedValue ? (
        <Text style={styles.resultText}>
          {inputValue} {fromUnit} is equal to {convertedValue} {toUnit}.
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 130,
  },
  pickerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  convertButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
});

export default Converter;
