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

export const CardTitle: React.FC<CustomTextProps> = ({
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
          fontSize: normalizeFontSize(28),
          fontStyle: os === "ios" ? "italic" : "normal",
          letterSpacing: 12,
          fontFamily: "Afacad-BoldItalic",
          color: theme.colors.textTitle,
        },
        style,
      ]}
      // numberOfLines={numberOfLines}
      // {...restProps}
    >
      {children.toUpperCase()}
    </Text>
  );
};
