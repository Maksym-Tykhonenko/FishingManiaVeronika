import { View } from "react-native"
import Catch from "../components/Catch"
import Menu from "../components/Menu";

const CatchScreen = () => {
    return (
        <View style={styles.container}>
            <Catch />
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

export default CatchScreen;