import React, { createContext, useContext } from "react";
import { Text, TextProps } from "react-native";

// Contexto para manejar fuentes (pero en este caso, siempre es `true`)
const FontContext = createContext({ fontLoaded: true });

export const useFont = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  return (
    <FontContext.Provider value={{ fontLoaded: true }}>
      {children}
    </FontContext.Provider>
  );
};

// Mapas de fuentes, tamaños y espaciado
const fontMap = {
  regular: "Afacad-Regular",
  bold: "Afacad-Bold",
  italic: "Afacad-Italic",
  boldItalic: "Afacad-BoldItalic",
  medium: "Afacad-Medium",
  mediumItalic: "Afacad-MediumItalic",
  semiBold: "Afacad-SemiBold",
  semiBoldItalic: "Afacad-SemiBoldItalic",
};

const fontSizes = {
  small: 14,
  medium: 18,
  large: 24,
  xlarge: 32,
  xxlarge: 40,
  splash: 512,
};

const letterSpacings = {
  normal: 0,
  wide: 2,
};

// Componente `CustomText`
export const CustomText = ({
  weight = "regular",
  size = "medium",
  letterSpacing = "normal",
  style,
  children,
  ...props
}) => {
  const { fontLoaded } = useFont();

  if (!fontLoaded) return null; // No renderizar hasta que las fuentes carguen

  return (
    <Text
      style={[
        {
          fontFamily: fontMap[weight], // Usa la fuente ya enlazada
          fontSize: fontSizes[size],
          letterSpacing: letterSpacings[letterSpacing],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
