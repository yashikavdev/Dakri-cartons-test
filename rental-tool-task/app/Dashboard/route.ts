import { NextResponse } from "next/server";

 const allData = [
   {
     data: [
       { label: "Completed", value: 400, status: "completed" },
       { label: "Work in progress", value: 100, status: "in_progress" },
       { label: "Due", value: 200, status: "due" },
     ],
     list: [
       {
         id: "01",
         tool_ref: "6465",
         teamMember: "Alex Noman 🏆",
         status: "Completed",
         duration: "15:00",
       },
       {
         id: "02",
         tool_ref: "5665",
         teamMember: "Razib Rahman 🏺",
         status: "In Progress",
         duration: "05:00",
       },
       {
         id: "03",
         tool_ref: "1755",
         teamMember: "Luke Norton ⭐",
         status: "Not Started",
         duration: "00:00",
       },
     ],
     title: "Rental Tools",
     chartTitle: "Work Order Status",
   },
   {
     data: [
       {
         label: "Rental Items",
         value: 50,
         status: "completed",
         icon: "BuildIcon",
       },
       {
         label: "Spare Parts",
         value: 75,
         status: "in_progress",
         icon: "ConstructionIcon",
       },
     ],
     list: [
       {
         id: "01",
         tool_ref: "6465",
         teamMember: "Alex Noman 🏆",
         status: "Completed",
       },
       {
         id: "02",
         tool_ref: "5665",
         teamMember: "Alex Noman 🏆",
         status: "In Progress",
       },
       {
         id: "03",
         tool_ref: "1755",
         teamMember: "Alex Noman 🏆",
         status: "Not Started",
       },
     ],
     title: "Missing Items",
     chartTitle: "Tools and Equipments Availability",
   },
   {
     data: [
       { label: "Packages Received", value: 400, status: "completed" },
       { label: "Processed Packages", value: 100, status: "in_progress" },
     ],
     list: [
       {
         id: "01",
         tool_ref: "6465",
         tool: "Screws",
         status: "Low",
       },
       {
         id: "02",
         tool_ref: "5665",
         tool: "Wires (electrical)",
         status: "None",
       },
       {
         id: "03",
         tool_ref: "1755",
         tool: "Bolts",
         status: "None",
       },
     ],
     title: "Restock Items",
     chartTitle: "Reception Summary",
   },
 ];

export async function GET(request: Request) {
  return NextResponse.json(allData, { status: 200 })
}

