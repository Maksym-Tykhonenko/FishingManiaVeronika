import { View } from "react-native"
import Seasons from "../components/Seasons"
import Menu from "../components/Menu";

const SeasonsScreen = () => {
    return (
        <View style={styles.container}>
            <Seasons />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0
    }
}

export default SeasonsScreen;