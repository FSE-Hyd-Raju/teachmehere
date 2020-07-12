import AsyncStorage from '@react-native-community/async-storage';


export const storeAsyncData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getAsyncData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export const clearAsyncData = async () => {
    try {
        const jsonValue = await AsyncStorage.clear()
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}
