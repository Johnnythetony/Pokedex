import { StyleSheet, Text, Pressable } from "react-native";
import { router } from "expo-router";

export type ListItemProps = {
  name: string;
  url: string;
};

const ListItem: React.FC<ListItemProps> = ({name, url}) => { 
  
  const id = +(url.split('/').at(-2) || '');

  return (
  <Pressable style={styles.itemContainer} onPress={() => router.push(`/${id}`)}>
    <Text style={styles.text}>{name.toUpperCase()}</Text>
  </Pressable>
);}

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