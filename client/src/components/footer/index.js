import React from "react";

export default function FooterComponent({ size }) {
  return (
    <div className="footer-main footer-reserved">
      {size && <p> You have {size} Cards</p>}
    </div>
  );
}
