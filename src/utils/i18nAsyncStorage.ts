import AsyncStorage from "@react-native-async-storage/async-storage";

export const i18nAsyncStorage = {
  setItem: async (
    key: string,
    value: string,
    handleErrorCallback?: Function
  ) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("setItem error", error);
      handleErrorCallback?.(error);
    }
  },
  getItem: async (key: string, handleErrorCallback?: Function) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log("getItem error", error);
      handleErrorCallback?.(error);
    }
  },
};
