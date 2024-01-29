import React from "react";
import "./App.css";
import Routers from "./Routers/Routers";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import { pdfjs } from "react-pdf";

const stripePromise = loadStripe(
  "pk_test_51JeDolGB4JYTbuOR1quYyXWaa0060OlApbeYRRIhOeNBK8DyqDNggLNv9FS5YD6Q3FOsIGCbxfLAVd5izxiPb5HQ00kMW1xXlm"
);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Routers />
      </Elements>
    </>
  );
}

export default App;
