import { useState } from "react";
import { View } from "react-native";
import { TiposTransacoes } from "../utils/tiposTransacoes";
import { ButtonItem } from "./buttonItem";

export const ButtonInfo = () => {
  const data = TiposTransacoes;
  const [selected, setSelected] = useState<Number | null>(null);
 
  return (
    <View className="flex-row items-center justify-center mt-6">
      {data.map((item) => (
        <ButtonItem
          label={item.label}
          key={item.id}
          clickButton={()=>  {setSelected(item.id)}}
          isSelected={selected === item.id}
          
        />
      ))}
    </View>
  );
};
