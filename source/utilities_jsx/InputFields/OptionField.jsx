import Ionicons from "@react-native-vector-icons/ionicons"
import { Text, TouchableOpacity, View } from "react-native"
import { DashboardTheme } from "../../theme"

export default function OptionField(handleClick, value, name) {
    const theme = DashboardTheme
    const clickWrapper = () =>{
        return handleClick(name)
    }
    return (
        <View className="p-2 gap-3 rounded-xl" style={{
            backgroundColor: theme.surfaceCard
        }}>
            <Text className="text-sm" style={{
                fontFamily: theme.font,
                color: theme.textPrimary
            }}>{name}</Text>
            <TouchableOpacity onPress={clickWrapper}
                className="text-md flex-row w-[30] justify-between items-center rounded-xl bg-transparent border-white"
            >
                <Text className="text-md flex-1 border-r-white"
                    style={{
                        fontFamily: theme.font,
                        color: theme.textPrimary
                    }}
                >
                    {value}
                </Text>
                <Ionicons
                    name="chevron-down"
                    size={20}
                    color={theme.textPrimary}
                />
            </TouchableOpacity>
        </View>
    )
}
