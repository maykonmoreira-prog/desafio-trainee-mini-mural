import {StyleSheet, Text, TouchableOpacity, TouchableHighlightProps} from 'react-native'

type ButtonProps = TouchableHighlightProps & {
        label: string;
}

export function Button({ label, ...rest }: ButtonProps) {
    return(
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        backgroundColor: '#ebe948',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: "#000000",
        fontSize: 16,
        fontWeight: 600,
    },
    })
