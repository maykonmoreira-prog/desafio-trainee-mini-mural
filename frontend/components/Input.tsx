import { TextInput, StyleSheet, TextInputProps } from "react-native"

export function Input({ ...rest }: TextInputProps) {
    return <TextInput style={styles.input} {...rest} />  
} 

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 48,
        borderWidth: 2.5,
        borderColor: '#ebe948',
        borderRadius: 16,
        fontSize: 16,
        paddingLeft: 12,
    },
});
