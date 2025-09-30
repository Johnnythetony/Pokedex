import { StyleSheet, Text, View } from "react-native";

export type ListItemProps = {
  name: string;
  url: string;
};

const ListItem: React.FC<ListItemProps> = ({name}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.text}>{name.toUpperCase()}</Text>
  </View>
);

const styles = StyleSheet.create ({
    itemContainer: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 14,
      backgroundColor:"#97BC62",
    },
    text: {
      fontSize: 32,
      color: "#2C5F2D",
      textAlign: "center",
    },
}

);

export default ListItem;