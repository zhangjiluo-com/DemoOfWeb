import { useState } from "react";
import BaseLayout from "./components/BaseLayout";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BaseLayout />
    </>
  );
}
