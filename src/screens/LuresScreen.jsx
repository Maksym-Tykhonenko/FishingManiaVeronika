import { View } from "react-native"
import Lures from "../components/Lures"
import Menu from "../components/Menu";

const LuresScreen = () => {
    return (
        <View style={styles.container}>
            <Lures />
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

export default LuresScreen;