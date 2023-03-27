import { Inter } from "next/font/google";
import React from "react";
import SpaceScene from "../../components/space/spaceScene";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <SpaceScene />;
}
