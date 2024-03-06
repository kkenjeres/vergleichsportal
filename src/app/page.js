import React, { Suspense } from "react";
const CardsList = React.lazy(() => import("./components/CardsList"));
export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <CardsList />
      </Suspense>
    </main>
  );
}
