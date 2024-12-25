import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";

const COLOR = {
  RESULT: "#4e4c51",
  RESET: "#5f5e62",
  OPERATOR: "#f39c29",
  NUM: "#5c5674",
};

// Button type : 'reset' | 'operator' | 'num'
function Button({ text, onPress, flex, type, isSelected }) {
  const backgroundColor =
    type === "reset"
      ? COLOR.RESET
      : type === "operator"
      ? COLOR.OPERATOR
      : type === "num"
      ? COLOR.NUM
      : "transparent";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderWidth: isSelected ? 1 : 0.2,
      }}
    >
      <Text style={{ color: "white", fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
}

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  padding: 10px 5px;
`;

export default () => {
  const [input, setInput] = useState(0);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [tempInput, setTempInput] = useState(null);
  const [tempOperator, setTempOperator] = useState(null);

  function onPressNum(num) {
    if(currentOperator){
      setResult(input);
      setInput(num);
    }else{
      const newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
  }

  function onPressOperator(operator){
    if(operator !== '='){
      setCurrentOperator(operator);
    }else{
      // = TODO
      var finalResult = result;
      console.log(currentOperator);
      switch(currentOperator){
        case '/':
          finalResult = result / input;
          break;
        case 'x':
          finalResult = result * input;
          break;
        case '-':
          finalResult = result - input;
          break;
        case '+':
          finalResult = result + input;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);

    }
  }

  function onPressReset(){
    setInput(0);
    setCurrentOperator(null);
    setResult(null);
    setTempInput(null);
    setTempOperator(null);
  }

  return (
    <View style={{ flex: 1, width: 250, justifyContent: "center" }}>
      <Text>input : {input}</Text>
      <Text>currentOperator : {currentOperator}</Text>
      <Text>result : {result}</Text>
      <Text>tempInput : {tempInput}</Text>
      <Text>tempOperator : {tempOperator}</Text>

      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: "white", fontSize: 35, textAlign: "right" }}>
          {input}
        </Text>
      </InputContainer>
      {/* AC ~ / */}
      <ButtonContainer>
        <Button type="reset" text="AC" onPress={onPressReset} flex={3} />
        <Button type="operator" text="/" isSelected={currentOperator === '/'} onPress={() => onPressOperator('/')} flex={1} />
      </ButtonContainer>
      {/* 7 ~ X */}
      <ButtonContainer>
        {[7, 8, 9].map((num, idx) => (
          <Button key={idx} type="num" text={`${num}`} onPress={() => onPressNum(num)} flex={1} />
        ))}
        <Button type="operator" text="x" isSelected={currentOperator === 'x'} onPress={() => onPressOperator('x')} flex={1} />
      </ButtonContainer>
      {/* 4 ~ - */}
      <ButtonContainer>
        {[4, 5, 6].map((num,idx) => (
          <Button key={idx} type="num" text={`${num}`} onPress={() => onPressNum(num)} flex={1} />
        ))}
        <Button type="operator" text="-" isSelected={currentOperator === '-'} onPress={() => onPressOperator('-')} flex={1} />
      </ButtonContainer>
      {/* 1 ~ + */}
      <ButtonContainer>
        {[1, 2, 3].map((num, idx) => (
          <Button key={idx} type="num" text={`${num}`} onPress={() => onPressNum(num)} flex={1} />
        ))}
        <Button type="operator" text="+" isSelected={currentOperator === '+'} onPress={() => onPressOperator('+')} flex={1} />
      </ButtonContainer>
      {/* 0 ~ = */}
      <ButtonContainer>
        <Button type="num" text="0" onPress={() => onPressNum(0)} flex={2} />
        <Button type="num" text="." onPress={() => null} flex={1} />
        <Button type="operator" text="=" onPress={() => onPressOperator('=')} flex={1} />
      </ButtonContainer>
    </View>
  );
};