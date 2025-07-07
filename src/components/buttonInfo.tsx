import { useState } from "react";
import { View } from "react-native";
import { TiposTransacoes } from "../utils/tiposTransacoes";
import { ButtonItem } from "./buttonItem";
import { Despesa } from "./despesa";
import { Fatura } from "./fatura";
import { Receita } from "./receita";

export const ButtonInfo = () => {
  const data = TiposTransacoes;
  const [selected, setSelected] = useState<Number | null>(null);
  const [categoria, setCategoria] = useState("");

  return (
    <View>
      <View className="flex-row items-center justify-center mt-6">
        {data.map((item) => (
          <ButtonItem
            label={item.label}
            key={item.id}
            clickButton={() => {
              (setSelected(item.id), setCategoria(item.label));
            }}
            isSelected={selected === item.id}
          />
        ))}
      </View>

      {categoria === "Despesa" && <Despesa />}
      {categoria === "Receita" && <Receita />}
      {categoria === "Fatura" && <Fatura />}
    </View>
  );
};
