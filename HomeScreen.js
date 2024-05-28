import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Функция для расчета факториала
const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

const HomeScreen = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        // Заменяем ^ на ** для использования в eval, √ на Math.sqrt, log на Math.log10
        let expression = input.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)')
                              .replace(/√(\d+)/g, 'Math.sqrt($1)')
                              .replace(/log(\d+)/g, 'Math.log10($1)');
        let evaluatedResult = eval(expression);
        setResult(evaluatedResult.toString());
      } catch (e) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'x!') {
      try {
        let number = parseFloat(input);
        if (number >= 0) {
          setResult(factorial(number).toString());
        } else {
          setResult('Error');
        }
      } catch (e) {
        setResult('Error');
      }
    } else if (value === '√' || value === 'log' || value === '^' || value === '(' || value === ')') {
      setInput(input + value);
    } else {
      setInput(input + value);
    }
  };

  const renderButton = (value, style = {}) => (
    <TouchableOpacity onPress={() => handlePress(value)} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('/', styles.operatorButton)}
          {renderButton('(', styles.operatorButton)}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('*', styles.operatorButton)}
          {renderButton(')', styles.operatorButton)}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('-', styles.operatorButton)}
          {renderButton('√', styles.operatorButton)}
        </View>
        <View style={styles.row}>
          {renderButton('0', { flex: 2 })}
          {renderButton('.')}
          {renderButton('+', styles.operatorButton)}
          {renderButton('log', styles.operatorButton)}
        </View>
        <View style={styles.row}>
          {renderButton('C', { flex: 2, backgroundColor: '#f44336' })}
          {renderButton('=', { flex: 2, backgroundColor: '#4caf50' })}
          {renderButton('x!', styles.operatorButton)}
          {renderButton('^', styles.operatorButton)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#d1d1d1',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  input: {
    fontSize: 36,
    color: '#333',
  },
  result: {
    fontSize: 28,
    color: '#666',
  },
  buttonsContainer: {
    flex: 3,
    padding: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  operatorButton: {
    backgroundColor: '#ffa726',
  },
});

export default HomeScreen;
