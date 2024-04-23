"use client";
import React from "react";
import {
  Card,
  Button,
  Stack,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import ConstructionIcon from "@mui/icons-material/Construction";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { PieChart } from "@mui/x-charts/PieChart";

export interface DataItem {
  label: string;
  value: number;
  status: string;
  icon?: string;
}

export interface ListItem {
  id: string;
  tool_ref: string;
  teammember: string;
  status: string;
  duration: string;
}

interface IProps {
  list: ListItem[];
  data: DataItem[];
  title: string;
  chartTitle: string;
}

const ToolModal = ({ list, data: dataItems, title, chartTitle }: IProps) => {

  const getColor = (data: DataItem[]) => {
    return data.map((item:DataItem) => {
      if (item.status === "completed") {
        return "green";
      } else if (item.status === "in progress") {
        return "orange";
      } else if (item.status === "due") {
        return "red";
      }
      return "gray";
    });
  };

const getIcons = (iconName: string) => {
  switch (iconName) {
    case "Rental Items":
      return <BuildIcon data-testid="RentalItemsIcon" />;
    case "Spare Parts":
      return <ConstructionIcon data-testid="SparePartsIcon" />;
    case "Processed Packages":
      return <SpaceDashboardOutlinedIcon data-testid="ProcessedPackagesIcon" />;
    case "Packages Received":
      return <SpaceDashboardIcon data-testid="PackagesReceivedIcon" />;
    default:
      return "";
  }
};

  return (
    <div style={{ display: "flex" }}>
      <Card
        style={{
          width: title === "Missing Items" ? "40%" : "60%",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)",
          padding: "1rem",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>{title}</h2>
        <table style={{ borderSpacing: "0", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  padding: "0.5rem 0",
                  minWidth: "80px",
                }}
              >
                Tool Ref.
              </th>
              <th
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  padding: "0.5rem 0",
                }}
              >
                Team Member
              </th>
              {title !== "Missing Items" && (
                <th
                  style={{
                    borderBottom: "1px solid #e0e0e0",
                    padding: "0.5rem 0",
                  }}
                >
                  <span
                    style={{
                      height: "8px",
                      width: "8px",
                      backgroundColor: "transparent",
                      borderRadius: "50%",
                      display: "inline-flex",
                      marginRight: "8px",
                    }}
                  >
                    {" "}
                  </span>
                  Status
                </th>
              )}
              <th
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  padding: "0.5rem 0",
                }}
              >
                {title !== "Missing Items" &&
                  title !== "Restock Items" &&
                  "Duration"}
              </th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item: ListItem) => (
              <tr key={item.id}>
                <td
                  style={{
                    borderBottom: "1px solid #e0e0e0",
                    padding: "0.5rem 0",
                  }}
                >
                  {item.tool_ref}
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #e0e0e0",
                    padding: "0.5rem 0",
                  }}
                >
                  {item.teammember}
                </td>
                {title !== "Missing Items" && (
                  <td
                    style={{
                      borderBottom: "1px solid #e0e0e0",
                      padding: "0.5rem 0",
                    }}
                  >
                    <span
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor:
                          item.status == "Completed"
                            ? "green"
                            : item.status == "In Progress"
                            ? "gray"
                            : item.status == "None"
                            ? "orange"
                            : "red",
                        borderRadius: "50%",
                        display: "inline-flex",
                        marginRight: "8px",
                        position: "relative",
                        top: "-1px",
                      }}
                    ></span>
                    {item.status}
                  </td>
                )}
                {title !== "Missing Items" && title !== "Restock Items" && (
                  <td
                    style={{
                      borderBottom: "1px solid #e0e0e0",
                      padding: "0.5rem 0",
                    }}
                  >
                    {item.duration}
                  </td>
                )}
                <td
                  style={{
                    borderBottom: "1px solid #e0e0e0",
                    padding: "0.5rem 0",
                  }}
                >
                  <Button variant="contained">Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card
        style={{
          width: "-webkit-fill-available",
          marginLeft: "1rem",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)",
          padding: "1rem",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>{chartTitle}</h2>
        {chartTitle == "Work Order Status" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              justifyContent: "space-between",
              paddingRight: "20px",
            }}
          >
            <Stack direction="row">
              <PieChart
                series={[
                  {
                    innerRadius: 60,
                    outerRadius: 80,
                    data: dataItems,
                    cx: 100,
                  },
                ]}
                margin={{ right: 5 }}
                width={400}
                height={200}
                colors={getColor(dataItems)}
                label={({ label, value }: {label:string, value:string}) => `${label} : ${value}`}
                data={dataItems}
              />
            </Stack>
            <div
              style={{
                textAlign: "center",
                position: "absolute",
                left: "65px",
              }}
            >
              <p style={{ marginBottom: "2px" }}>Completed</p>
              <span>
                {
                  dataItems.filter((data) => data.label === "Completed")[0]
                    .value
                }
              </span>
            </div>
            <div>
              {dataItems.map((chartData) => (
                <div>
                  <span>{chartData.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {chartTitle != "Work Order Status" && (
          <div>
            {dataItems.map((data, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    textAlign: "center",
                    marginTop: "15px",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "32px" }}>{getIcons(data.label)}</p>
                  </div>
                  <div>
                    <p>{data.label}</p>
                  </div>
                  {chartTitle === "Reception Summary" && (
                    <div>
                      <p>{data.value}</p>
                    </div>
                  )}
                  {chartTitle === "Tools and Equipments Availability" && (
                    <div>
                      {
                        <Box
                          sx={{ position: "relative", display: "inline-flex" }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={data.value}
                            className="circlular-progress"
                            size={75}
                            thickness={4}
                            style={{
                              stroke: "#1fc91f",
                              backgroundColor: "#c2ddc8",
                              fill: "#fff",
                              borderRadius: "50%",
                            }}
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="caption" component="div">
                              {data.value}%
                            </Typography>
                          </Box>
                        </Box>
                      }
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ToolModal;
