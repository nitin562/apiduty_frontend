// SlideUpInput.jsx - mount/unmount animated dropdown (no measuring)
import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Platform } from "react-native";

export default function SlideInput({
    component,
    show,
    setShow,    // still available if parent wants to close
    theme,
    // animation config
    duration = 180,
    translateFrom = 8, // how much to shift from when animating in (px)
}) {
    const anim = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(!!show);

    // when `show` becomes true, mount (visible) then animate in
    useEffect(() => {
        if (show) {
            setVisible(true);
            Animated.timing(anim, {
                toValue: 1,
                duration,
                useNativeDriver: false,
            }).start();
        } else {
            // animate out, then unmount by setting visible false on completion
            Animated.timing(anim, {
                toValue: 0,
                duration,
                useNativeDriver: false,
            }).start(({ finished }) => {
                if (finished) setVisible(false);
            });
        }
    }, [show, anim, duration]);

    // if not visible, render nothing so it takes no layout space
    if (!visible) return null;

    const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [translateFrom, 0],
    });

    const animatedStyle = {
        transform: [{ translateY }],
        opacity: anim,
    };

    // visual container styles use theme where available
    const bg = theme?.surfaceSecondary || "#111827";
    const border = theme?.accentSparkline || "#374151";

    return (
        <Animated.View
            style={[
                {
                    overflow: "hidden",
                    backgroundColor: bg,
                    borderColor: border,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                },
                animatedStyle,
            ]}
        >
            <View>{component}</View>
        </Animated.View>
    );
}
