// app/api/listings/route.ts

import { NextRequest, NextResponse } from "next/server";

let Cars = [
  { id: 0, Brand: "BMW", Model: "M4", Year: 2022, Price: 30, Status: "Approved" },
  { id: 1, Brand: "BMW", Model: "M3", Year: 2020, Price: 35, Status: "Rejected" },
  { id: 2, Brand: "BMW", Model: "M2", Year: 2024, Price: 20, Status: "Panding" },
  { id: 3, Brand: "BMW", Model: "M5", Year: 2025, Price: 50, Status: "Approved" },
  { id: 4, Brand: "BMW", Model: "X3", Year: 2020, Price: 30, Status: "Panding" },
  { id: 5, Brand: "BMW", Model: "X1", Year: 2023, Price: 20, Status: "Rejected" },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const count = searchParams.get("count");

  if (count === "true") {
    const counts = {
      Approved: Cars.filter((car) => car.Status === "Approved").length,
      Rejected: Cars.filter((car) => car.Status === "Rejected").length,
      Panding: Cars.filter((car) => car.Status === "Panding").length,
      All:Cars.length,
    };
    return NextResponse.json(counts);
  }

  if (status) {
    const filtered = Cars.filter((car) =>
      status === "All" ? true : car.Status === status
    );

    return NextResponse.json({
      filter: status,
      items: filtered,
    });
  }

  return NextResponse.json({
    filter: "All",
    items: Cars,
  });

  //return NextResponse.json(Cars);
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();

  const index = Cars.findIndex((car) => car.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  Cars[index].Status = status;
  
  return NextResponse.json({ message: "Status updated", car: Cars[index] });
}

export async function PUT(req: NextRequest) {
  const { id, ...updates } = await req.json();
  console.log("data recived for update:",{ id, ...updates });
  

  const index = Cars.findIndex((car) => car.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  Cars[index] = { ...Cars[index], ...updates };

  return NextResponse.json({ message: "Listing updated", car: Cars[index] });
}
