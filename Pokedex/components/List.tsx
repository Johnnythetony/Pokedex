import { FlatList } from "react-native";
import ListItem, { ListItemProps } from "./ListItem";

type ListProps = {
    items: ListItemProps[];
};

const List: React.FC<ListProps> = ({items}) => (
    <FlatList
        data={items}
        renderItem={({item}) => <ListItem key={item.url} {... item}/>}
        keyExtractor={item => item.url}
    />
);
/*     <ScrollView>
        {items.map(item => (
            <ListItem key={item.name}{...item}/>
            ))}
    </ScrollView> */

export default List; 