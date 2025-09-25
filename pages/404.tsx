import React from "react";
import Link from "next/link";

export default function Custom404() {
  return (
    <div style={{textAlign:"center", padding:"40px"}}>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Kembali ke Home</Link>
    </div>
  );
}
