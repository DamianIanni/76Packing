import {
  useColorScheme,
  useWindowDimensions,
  Platform,
  PixelRatio,
} from "react-native";
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

  get standarWidth() {
    return useWindowDimensions().width - 50;
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
      stripe3: "#1AA6B7", // Colores atenuados,
      divider: "#CAC4D0",
      checkIcon: this.isDarkMode ? "#1AA6B7" : "#1AA6B7",
      nonCheckIcon: this.isDarkMode ? "#ffffff" : "black",
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
      // zIndex: 0,
      position: "absolute",
      height: "100%",
      width: "100%",
      gap: 10,
    };
  }

  get rotatedStripStyleContainer() {
    return {
      flexDirection: "row",
      justifyContent: "center",
      // zIndex: 0,
      position: "absolute",
      top: 0,
      height: "100%",
      width: "100%",
      gap: 10,
      // marginBottom: "20%",
      // backgroundColor: "red",
      // transform: [{ rotate: "45deg" }],
    };
  }

  get tallStripeStyle() {
    return {
      stripe1: {
        backgroundColor: this.isDarkMode ? "#1AA6B7" : "#D9ECF2",
        width: PixelRatio.get() * 20,
        height: "100%",
        zIndex: Platform.OS === "android" ? undefined : -2,
        elevation: 10,
        shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
        shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
        shadowOpacity: 1,
        shadowRadius: 8,
        // transform: [{ rotate: "45deg" }],
        // marginLeft: -100,
      },
      stripe2: {
        backgroundColor: "#FF414D",
        width: PixelRatio.get() * 20,
        height: "100%",
        zIndex: Platform.OS === "android" ? undefined : -1,
        elevation: 9,
        shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
        shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
        shadowOpacity: 1,
        shadowRadius: 8, // Difuminado de la sombra
        // transform: [{ rotate: "45deg" }],
        // marginLeft: -50,
      },
      stripe3: {
        backgroundColor: this.isDarkMode ? "#D9ECF2" : "#1AA6B7",
        width: PixelRatio.get() * 20,
        height: "100%",
        zIndex: Platform.OS === "android" ? undefined : 0,
        elevation: 10,
        shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
        shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
        shadowOpacity: 1,
        shadowRadius: 8, // Difuminado de la sombra
        // transform: [{ rotate: "45deg" }],
        // marginLeft: -50,
      },
    };
  }

  get stripeStyle() {
    return {
      stripe1: {
        backgroundColor: this.isDarkMode ? "#1AA6B7" : "#D9ECF2",
        width: PixelRatio.get() * 20,
        height: "70%",
        zIndex: Platform.OS === "android" ? undefined : -2,
        elevation: 5,
        shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
        shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
        shadowOpacity: 1,
        shadowRadius: 8, // Difuminado de la sombra
      },
      stripe2: {
        backgroundColor: "#FF414D",
        width: PixelRatio.get() * 20,
        height: "80%",
        zIndex: Platform.OS === "android" ? undefined : -1,
        elevation: 5,
        shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
        shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
        shadowOpacity: 1,
        shadowRadius: 8, // Difuminado de la sombra
      },
      stripe3: {
        backgroundColor: this.isDarkMode ? "#D9ECF2" : "#1AA6B7",
        width: PixelRatio.get() * 20,
        height: "90%",
        zIndex: Platform.OS === "android" ? undefined : 0,
        elevation: 5,
        shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
        shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
        shadowOpacity: 1,
        shadowRadius: 8, // Difuminado de la sombra
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
