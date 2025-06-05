import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";

interface TranslucentLoaderProps {
  visible: boolean;
}

const TranslucentScreen = ({
  visible,
}: TranslucentLoaderProps): JSX.Element => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Translucent background
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TranslucentScreen;
