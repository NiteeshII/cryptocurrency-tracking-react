import React, { Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
import Banner from "../components/Banner";
// import MyErrorBoundary from "../ErrorBoundries/classErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import Errorboundry from "../ErrorBoundries/Errorboundry";
const CoinsTable = React.lazy(() =>
  Lazyloading(import("../components/CoinsTable"))
);

export default function Homepage() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={Errorboundry} onReset={() => {}}>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress
                style={{ color: "gold" }}
                size={100}
                thickness={1}
              />
            </div>
          }
        >
          <Banner />
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

// Adding fixed delay to see the spinner
async function Lazyloading(promise) {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  return promise;
}
