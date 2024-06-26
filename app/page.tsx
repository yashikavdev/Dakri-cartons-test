"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ToolModal from "./Dashboard/toolModal";

interface DataItem {
  label: string;
  value: number;
  status: string;
  icon?: string;
}

interface ListItem {
  id: string;
  tool_ref: string;
  teammember: string;
  status: string;
  duration: string;
}

interface ToolsData {
  data: DataItem[];
  list: ListItem[];
  title: string;
  chartTitle: string;
}

const Dashboard = () => {
  const [toolsData, setToolsData] = useState<ToolsData[]>([]);

  const getToolsData = async () => {
    try {
      const res = await fetch("./Dashboard");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const toolsList = await res.json();
      setToolsData(toolsList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getToolsData();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div
        style={{
          height: "100vh",
          width: "70px",
          backgroundColor: "gray",
          padding: "20px",
        }}
      >
        <div
          style={{
            color: "white",
            display: "block",
            fontSize: "30px",
            marginTop: "20px",
          }}
        >
          <OtherHousesIcon style={{ marginBottom: "10px" }} />
          <AssignmentIcon />
          <AssignmentIcon />
          <AssignmentIcon />

          <SettingsIcon
            style={{
              marginTop: "30px",
              fontSize: "40px",
              color: "black",
              backgroundColor: "white",
              borderRadius: "30px",
              position: "fixed",
              bottom: "20px",
              left: "15px",
            }}
          />
        </div>
      </div>
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "calc(100% - 100px)",
          height: "100vh",
          overflow: "auto",
        }}
      >
        {toolsData.length > 0 &&
          toolsData?.map(
            (
              {
                data,
                list,
                title,
                chartTitle,
              }: ToolsData,
              index: number
            ) => (
              <ToolModal
                list={list}
                data={data}
                title={title}
                chartTitle={chartTitle}
                key={index}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Dashboard;
