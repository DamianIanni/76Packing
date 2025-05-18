import React, { useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PixelRatio,
} from "react-native";
import { Title } from "../texts/Title";
import { ContentText } from "../texts/ContentText";
import { ThemeManager } from "../../classes/ThemeManager";
import { useLocale } from "../../i18n/TranslationContext";

interface customProps {
  showModal: boolean;
  onClose: () => void;
}

export const LngSelectorComponent: React.FC<customProps> = ({
  showModal,
  onClose,
}) => {
  const theme = new ThemeManager();
  const { t, currentLanguage, changeLanguage } = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const arrLng = [
    t("language.enLng"),
    t("language.esLng"),
    t("language.deLng"),
  ];

  const normalizeFontSize = (size: number) => {
    const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
    return size / scale;
  };

  function isSelectedFunc(str: string) {
    let result: string;
    switch (str) {
      case "es":
        result = t("language.esLng");
        break;
      case "de":
        result = t("language.deLng");
        break;
      default:
        result = t("language.enLng");
        break;
    }

    return result;
  }

  function toggleLang(index: number) {
    switch (index) {
      case 1:
        setSelectedLanguage("es");
        changeLanguage("es");
        break;
      case 2:
        setSelectedLanguage("de");
        changeLanguage("de");

        break;
      default:
        setSelectedLanguage("en");
        changeLanguage("en");
        break;
    }
    onClose();
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      //   width: theme.standarWidth,
      //   paddingBottom: 50,
    },
    container2: {
      flex: 1,
      //   backgroundColor: "blue",
      alignItems: "flex-start",
      gap: 15,
    },

    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: theme.colors.background,
      padding: 30,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingBottom: "10%",
    },
    option: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.colors.backgroundCard,
      // borderWidth: 1,
      marginVertical: 6,
    },
    selectedOption: {
      backgroundColor: theme.colors.stripe3,
      borderColor: theme.colors.stripe3,
    },
    optionText: {
      color: theme.colors.text,
    },
    selectedText: {
      color: "#fff",
    },
    confirmButton: {
      marginTop: 16,
      backgroundColor: theme.colors.stripe3,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    confirmText: {
      color: "#fff",
      fontWeight: "600",
    },
    cancelText: {
      textAlign: "center",
      marginTop: 12,
      color: "#666",
    },
    mainCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      padding: Platform.OS === "ios" ? 10 : 2,
    },
    input: {
      width: "100%",
      fontFamily: "Afacad-Medium",
      fontSize: normalizeFontSize(20),
      color: theme.colors.text,
      letterSpacing: 3,
      maxHeight: 150,
      paddingRight: 0,
    },
  });

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <Pressable
        style={[StyleSheet.absoluteFill, style.overlay]}
        onPress={() => onClose()}
      >
        <TouchableWithoutFeedback>
          <View style={style.modal}>
            <Title>{t("language.selectLng")}</Title>

            {arrLng.map((lng, index) => {
              const isSelected = isSelectedFunc(selectedLanguage) === lng;
              return (
                <TouchableOpacity
                  key={lng}
                  style={[style.option, isSelected && style.selectedOption]}
                  onPress={() => toggleLang(index)}
                >
                  <ContentText
                    style={isSelected ? style.selectedText : style.optionText}
                  >
                    {lng}
                  </ContentText>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};
