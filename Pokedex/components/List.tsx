import { View } from 'react-native'
import ListItem, { ListItemProps } from "./ListItem"

type ListProps = {
    items: ListItemProps[];
}

const List: React.FC<ListProps> = ({items}) => (
    <View>
        {items.map(item => (<ListItem {...item}/>))}
    </View>
    );

export default List;    