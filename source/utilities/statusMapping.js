import { DashboardTheme } from "../theme.js";

export const statusMap = {
        CRITICAL: {
            bg: DashboardTheme.statusCriticalLight,
            text: DashboardTheme.statusCritical,
            label: "Critical",
            icon: "🔥",
        },
        HIGH: {
            bg: DashboardTheme.statusHighLight,
            text: DashboardTheme.statusHigh,
            label: "High",
            icon: "⚠️",
        },
        MEDIUM: {
            bg: "rgba(235, 201, 88, 0.1)", // derived from statusMedium
            text: DashboardTheme.statusMedium,
            label: "Medium",
            icon: "🟡",
        },
        LOW: {
            bg: "rgba(78, 205, 196, 0.1)", // derived from statusLow
            text: DashboardTheme.statusLow,
            label: "Low",
            icon: "💤",
        },
        NORMAL: {
            bg: "rgba(76, 175, 80, 0.1)", // derived from functionalSuccess
            text: DashboardTheme.functionalSuccess,
            label: "Resolved",
            icon: "✅",
        },
        // WARNING: {
        //     bg: "rgba(235, 201, 88, 0.1)", // similar to functionalWarning
        //     text: DashboardTheme.functionalWarning,
        //     label: "Warning",
        //     icon: "⚡",
        // },
        ERROR: {
            bg: "rgba(255, 77, 77, 0.1)", // similar to functionalError
            text: DashboardTheme.functionalError,
            label: "Error",
            icon: "🚨",
        },
    }