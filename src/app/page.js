import React, { Suspense } from "react";
const CardsList = React.lazy(() => import("./components/CardsList"));
import Skeleton from "react-loading-skeleton";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <CardsList />
      </Suspense>
    </main>
  );
}
