import React from 'react'
import { View, ScrollView, FlatList } from "react-native"

import Title from "../utilities_jsx/Title.jsx"
import SubTitle from "../utilities_jsx/SubTitle.jsx"
import Box1 from "../utilities_jsx/Box1.jsx"
import { DashboardTheme } from "../theme.js"
import PieChart from "../utilities_jsx/PieChart.jsx"
import { statusMap } from "../utilities/statusMapping.js"
import QuickAction from "./QuickActions.jsx"


export default function Dashboard() {
  const theme = DashboardTheme
  const recentIncidents = [
    {
      id: 1,
      title: "Database Latency in Production",
      timestamp: Date.now() - 60 * 60 * 1000, // 1 hour ago
      status: "CRITICAL",
      logoSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      count: 3
    },
    {
      id: 2,
      title: "API Gateway Timeout",
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      status: "HIGH",
      logoSrc: "https://cdn-icons-png.flaticon.com/512/825/825533.png",
      count: 6
    },
    {
      id: 3,
      title: "Cache Invalidations Slower Than Expected",
      timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
      status: "MEDIUM",
      logoSrc: "https://cdn-icons-png.flaticon.com/512/4257/4257483.png",
      count: 1
    },
    {
      id: 4,
      title: "Email Notification Delay",
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
      status: "LOW",
      logoSrc: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
      count: 2
    },
    {
      id: 5,
      title: "Incident Reporting Verification",
      timestamp: Date.now() - 10 * 60 * 1000, // 10 minutes ago
      status: "HIGH",
      logoSrc: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
      count: 3
    },
  ];

  const pieData = (data) => {
    const chartData = data.map(({status, count}) => ({
      value: count,
      color: statusMap[status]?.text || "#d1d5db", // fallback gray
      text: status,
      bg: statusMap[status]?.bg || "#d1d5db"
    }));
    console.log(chartData)
    return chartData
  }
  return (
    
    <ScrollView contentContainerClassName="gap-4">
      <View className={`p-4 gap-3 flex-1`} style={{backgroundColor: theme.backgroundPrimary}}>
          <Title title="Dashboard" icon="home-outline" theme={theme}/>
          {/* ------------- Recent Activities ---------------------- */}
          <SubTitle title="Recent Activites" theme={theme}/>
          <View className="w-full h-[300px] mb-4">
            <FlatList
              data={recentIncidents}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Box1
                  title={item.title}
                  timestamp={item.timestamp}
                  status={item.status}
                  logoSrc={item.logoSrc}
                />
              )}
              nestedScrollEnabled
              ItemSeparatorComponent={() => <View className="h-3" />}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* -------------------- PIECHART------------------ */}
          <SubTitle title="Incidents Summary" theme={theme}/>
          <PieChart data={pieData(recentIncidents)} theme={theme}/>

          <SubTitle title="Quick Actions" theme={theme}/>
          <QuickAction/>
      </View>
    </ScrollView>
  )
}
