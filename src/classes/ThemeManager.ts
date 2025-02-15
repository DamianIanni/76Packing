import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export class ThemeManager {
  private isDarkMode: boolean;

  constructor() {
    this.isDarkMode = useColorScheme() === "dark";
  }

  //get theme mode
  get themeMode() {
    return this.isDarkMode;
  }

  // Colores para los dos temas
  get colors() {
    return {
      // primary: this.isDarkMode ? "#1e1e1e" : "#6200ee", // Principal
      // secondary: this.isDarkMode ? "#bb86fc" : "#03dac6", // Secundario
      background: this.isDarkMode ? "#1C1C1E" : Colors.lighter, // Fondo
      backgroundCard: this.isDarkMode ? "#2A2A2D" : "#ffffff",
      button: this.isDarkMode ? "#ffffff" : "#1AA6B7",
      text: this.isDarkMode ? "#ffffff" : "#000000", // Color del texto
      textTitle: this.isDarkMode ? "#ffffff" : "#FF414D", // Color del texto
      textHeader: this.isDarkMode ? "#ffffff" : "#1AA6B7", // Color del texto
      text76: "#173B61",
      stripe1: "#D9ECF2", // Borde
      stripe2: "#FF414D", // Resaltado
      stripe3: "#1AA6B7", // Colores atenuados
    };
  }

  // Estilo de fuentes
  get fontFamily() {
    return "Arial"; // Puedes cambiar esto por una fuente personalizada
  }

  // Tamaños de fuente
  get fontSizes() {
    return {
      small: 12,
      medium: 14,
      large: 16,
      xLarge: 20,
      xxLarge: 24,
      splash7: 512,
      splash6: 384,
    };
  }

  // get fontWeights() {
  //   return {
  //     medium: 500,
  //     bold: 900,
  //     italicMedium: "500italic",
  //     italicBold: "900italic",
  //   };
  // }

  // get fontSpacing() {
  //   small: "0.25",
  //   medium: 0.5,

  // }

  get stripStyleContainer() {
    return {
      flexDirection: "row",
      justifyContent: "center",
      zIndex: 0,
      position: "absolute",
      height: "100%",
      width: "100%",
      gap: 10,
    };
  }

  get stripeStyle() {
    return {
      stripe1: {
        backgroundColor: "#D9ECF2",
        width: 70,
        height: "100%",
      },
      stripe2: {
        backgroundColor: "#FF414D",
        width: 70,
        height: "100%",
      },
      stripe3: {
        backgroundColor: "#1AA6B7",
        width: 70,
        height: "100%",
      },
    };
  }

  get padding() {
    return {
      small: 4,
      medium: 8,
      large: 12,
    };
  }

  // Métodos para determinar el estilo de la barra de estado
  getStatusBarStyle() {
    return {
      barStyle: this.isDarkMode ? "light-content" : "dark-content",
      backgroundColor: this.colors.background,
    };
  }

  // Método para obtener el fondo
  getBackgroundStyle() {
    return {
      backgroundColor: this.colors.background,
    };
  }
}
