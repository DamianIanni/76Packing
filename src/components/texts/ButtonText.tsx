import React from "react";
import {
  Text,
  TextStyle,
  StyleSheet,
  Platform,
  PixelRatio,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";

// Define the props interface
interface CustomTextProps {
  children: string;
  style?: TextStyle;
}

const normalizeFontSize = (size: number) => {
  const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
  return size / scale;
};

export const ButtonText: React.FC<CustomTextProps> = ({
  children,
  style,
  // ...restProps
}) => {
  const theme = new ThemeManager();
  const os = Platform.OS;

  return (
    <Text
      style={[
        {
          fontSize: normalizeFontSize(36),
          fontStyle: os === "ios" ? "italic" : "normal",
          letterSpacing: 12,
          fontFamily: "Afacad-BoldItalic",
          color: "white",
          textAlign: "center",
          textShadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
          textShadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
          textShadowRadius: os === "ios" ? 4 : 8, // Difuminado de la sombra
        },
        style,
      ]}
    >
      {children.toUpperCase()}
    </Text>
  );
};
