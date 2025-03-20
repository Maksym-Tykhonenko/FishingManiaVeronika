import { View } from "react-native"
import ReadFish from "../components/ReadFish"

const ReadFishScreen = ({ route }) => {
    const { type } = route.params;

    return (
        <View style={styles.container}>
            <ReadFish type={type} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ReadFishScreen;