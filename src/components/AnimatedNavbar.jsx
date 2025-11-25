import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Events } from "react-scroll";
import "../styles/global.scss";

function AnimatedNavbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="navbar glass">
      <ul>
        {navItems.map((it) => (
          <li key={it.id}>
            <ScrollLink
              to={it.id}
              spy={true}
              smooth={true}
              duration={600}
              offset={-80}
              className={`nav-link ${active === it.id ? "active" : ""}`}
              onSetActive={() => setActive(it.id)}
            >
              {it.label}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AnimatedNavbar;
