import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4 mt-5">
      <aside>
        <p>
          Copyright © ${new Date().getFullYear()} - All rights reversed. Just
          kidding, they're reserved.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
