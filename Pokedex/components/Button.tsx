import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text } from "react-native";


type ButtonProps = {
    leftIcon?: typeof MaterialIcons.defaultProps.name;
    text: string;
    rightIcon?: typeof MaterialIcons.defaultProps.name;
    onPress: () => void;
    disabled?: boolean;
};

const Button : React.FC<ButtonProps> = ({leftIcon, text, rightIcon, onPress, disabled}) => (
    <Pressable style={[styles.button, disabled && styles.disabledButton]} onPress={onPress} disabled={disabled}>
        {leftIcon && <MaterialIcons name={leftIcon} size={24} color="black"/>}
        <Text style={styles.text}>{text}</Text>
        {rightIcon && <MaterialIcons name={rightIcon} size={24} color="black"/>}
    </Pressable>
);

const styles = StyleSheet.create ({
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginVertical: 10,
        backgroundColor:"#97BC62",
        width: 100,
        borderRadius: 10,
    },
    text: {
        marginHorizontal:10,
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default Button;