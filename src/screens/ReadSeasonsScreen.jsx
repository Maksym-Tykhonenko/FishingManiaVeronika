import { View } from "react-native"
import ReadSeasons from "../components/ReadSeasons"

const ReadSeasonsScreen = ({ route }) => {
    const { type } = route.params;

    return (
        <View style={styles.container}>
            <ReadSeasons type={type} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ReadSeasonsScreen;