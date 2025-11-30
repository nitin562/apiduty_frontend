// OptionField.jsx
import React, { useState } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import SlideInput from "../SlideUpInput"; // path: utilities_jsx/SlideUpInput.jsx (one level up)
import { DashboardTheme } from "../../theme";

/**
 * Props:
 * - field: string
 * - value: current display key (like "NORMAL" or "ON")
 * - name: label to show ("Status", "State", etc.)
 * - setValue(field, value): function to update parent state (required)
 * - list: optional array [{ name: "CRITICAL", value: "Critical" }, ...]
 * - sheetHeight: optional height for dropdown
 */
export default function OptionField({
    field,
    value,
    name,
    setValue,
    list = [],
}) {
    const theme = DashboardTheme;
    const [open, setOpen] = useState(false);

    const onPressField = () => {
        setOpen((val) => !val);
    };

    // Called when user selects an option inside dropdown
    const onSelect = (selectedName) => {
        setValue(field, selectedName);
        setOpen(false);
    };

    // eslint-disable-next-line react/no-unstable-nested-components
    const OptionsList = ({ items = [], currentSelection = "" }) => {
        return (
            <View className="w-full">
                {items.map((item) => {
                    const key = item.name;
                    const displayText = item.value ?? item.name;
                    const checked = currentSelection === key;
                    return (
                        <TouchableOpacity
                            key={key}
                            onPress={() => onSelect(key)}
                            className="w-full flex-row justify-between items-center p-2"
                            style={{ borderBottomWidth: 1, borderBottomColor: theme.surfaceSecondary }}
                        >
                            <Text
                                className="text-base"
                                style={{
                                    fontFamily: theme.font,
                                    color: theme.textPrimary,
                                }}
                            >
                                {displayText}
                            </Text>
                            <Ionicons
                                name={checked ? "radio-button-on-outline" : "radio-button-off-outline"}
                                size={22}
                                color={checked ? theme.accentPrimaryEnd || "#10b981" : theme.textSecondary}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    // Render
    return (
        <View className="p-2 w-full gap-3 rounded-xl">
            <Text
                className="text-sm"
                style={{
                    fontFamily: theme.font,
                    color: theme.accentSparkline,
                }}
            >
                {name}
            </Text>

            <TouchableOpacity
                onPress={onPressField}
                style={{
                    backgroundColor: theme.surfaceSecondary,
                }}
                className="text-md flex-row px-2 py-1 justify-between items-center rounded-md bg-transparent border-white"
            >
                <Text
                    className="text-md flex-1"
                    style={{
                        fontFamily: theme.font,
                        color: theme.textPrimary,
                    }}
                >
                    {/** display label for current value: try to find display text from list */}
                    {(() => {
                        const found = list.find((i) => i.name === value);
                        return found ? found.value ?? found.name : value;
                    })()}
                </Text>

                <Ionicons
                    name="chevron-down"
                    size={20}
                    color={theme.textPrimary}
                    // rotate the chevron when open
                    style={{
                        transform: [{ rotate: open ? "180deg" : "0deg" }],
                    }}
                />
            </TouchableOpacity>

            {/* Dropdown SlideInput rendered in-place (dropdown style SlideInput expected) */}
            {open && (
                <SlideInput
                    component={<OptionsList items={list} currentSelection={value} />}
                    show={open}
                    setShow={setOpen}
                    sheetHeight={200} // default dropdown height; adjust or pass prop
                    theme={theme}
                />
            )}
        </View>
    );
}
