import { View } from "react-native"
import ReadLures from "../components/ReadLures"

const ReadLuresScreen = ({ route }) => {
    const { type } = route.params;

    return (
        <View style={styles.container}>
            <ReadLures type={type} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ReadLuresScreen;