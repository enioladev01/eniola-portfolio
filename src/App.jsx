import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

import { useEffect, useState } from "react";
import profileImage from "./assets/Profile.jpg";
import calculatorImage from "./assets/calculator.png";
import fashionImage from "./assets/fashion-management.png";
import "./App.css";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [adminProjects, setAdminProjects] = useState([]);
  const [skills, setSkills] = useState(() => {
  try {
    const saved = localStorage.getItem(
      "eaPortfolioSkills"
    );

    return saved
      ? JSON.parse(saved)
      : [
          "Python",
          "Basic Video Editing",
          "HTML / CSS / JavaScript",
          "React",
          "SQLite",
          "Git / GitHub",
        ];
  } catch {
    return [
      "Python",
      "Basic Video Editing",
      "HTML / CSS / JavaScript",
      "React",
      "SQLite",
      "Git / GitHub",
    ];
  }
});
  const [profile, setProfile] = useState(() => {
  try {
    const saved = localStorage.getItem(
      "eaPortfolioProfile"
    );
    

    return saved
      ? JSON.parse(saved)
      : {
          name: "Eniola Ayodele Emmanuel",
          title: "Python Programmer • Aspiring AI/ML Specialist",
          email: "ayodeleeniola07@gmail.com",
          whatsapp: "+2347079756421",
          linkedin:
            "https://www.linkedin.com/in/eniola-ayodele-25eny",
          bio:
            "Building practical digital solutions while exploring the future of software, artificial intelligence and technology.",
        };
  } catch {
    return {
      name: "Eniola Ayodele Emmanuel",
      title: "Python Programmer • Aspiring AI/ML Specialist",
      email: "ayodeleeniola07@gmail.com",
      whatsapp: "+2347079756421",
      linkedin:
        "https://www.linkedin.com/in/eniola-ayodele-25eny",
      bio:
        "Building practical digital solutions while exploring the future of software, artificial intelligence and technology.",
    };
  }
});
  useEffect(() => {
  const savedProjects = localStorage.getItem(
    "eaPortfolioProjects"
  );

  if (savedProjects) {
    try {
      setAdminProjects(JSON.parse(savedProjects));
    } catch (error) {
      console.error(
        "Unable to load portfolio projects:",
        error
      );
    }
  }
}, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminPage, setAdminPage] = useState(null);

  /* ================= ADMIN LOGIN ================= */

  if (adminPage === "login") {
    return (
      <AdminLogin
        onLogin={() => setAdminPage("dashboard")}
      />
    );
  }

  /* ================= ADMIN DASHBOARD ================= */

  if (adminPage === "dashboard") {
    return (
      <AdminDashboard
        onLogout={() => setAdminPage(null)}
      />
    );
  }

  return (
    <div className="portfolio">

      {/* ================= NAVIGATION ================= */}

      <nav className="navbar">
        <div className="logo">
          EA<span>.</span>
        </div>

        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            <a 
            href="#about"
            onClick={() => setMenuOpen(false)}
            >
              About
            </a>
          <a
            href="#skills"
            onClick={() => setMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#cv"
            onClick={() => setMenuOpen(false)}
          >
            CV
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </div>

        <button
         className="menu-button"
         aria-label="Toggle menu"
         onClick={() => setMenuOpen(!menuOpen)}
       >
         {menuOpen ? "×" : "☰"}
    </button>
      </nav>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            EA TECH • DIGITAL PORTFOLIO
          </p>

         <h1>
  {profile.name.split(" ")[0]}
  <br />
  <span>
    {profile.name.split(" ").slice(1).join(" ")}
  </span>
</h1>

          <p className="hero-title">
            {profile.title}
          </p>

          <p className="hero-description">
            {profile.bio}
          </p>

          <div className="hero-buttons">

            <a
              href="#projects"
              className="primary-button"
            >
              Explore My Work
              <span>↗</span>
            </a>

            <a
              href="#contact"
              className="secondary-button"
            >
              Let's Connect
            </a>

          </div>

        </div>


        {/* PROFILE */}

        <div className="hero-visual">

          <div className="profile-orb">
            <img
              src={profileImage}
              alt="Eniola Emmanuel Ayodele"
            />
          </div>

          <div className="floating-card card-one">
            <span>01</span>
            PYTHON
          </div>

          <div className="floating-card card-two">
            <span>02</span>
            AI / ML
          </div>

          <div className="floating-card card-three">
            <span>03</span>
            BUILD
          </div>

        </div>


        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line"></div>
        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        className="about-section"
        id="about"
      >

        <div className="section-label">
          <span>01</span>
          ABOUT
        </div>

        <div className="about-grid">

          <div className="about-heading">

            <p className="about-kicker">
              A LITTLE ABOUT ME
            </p>

            <h2>
              Curious about
              <br />
              <span>what's next.</span>
            </h2>

          </div>


          <div className="about-content">

            <p className="about-intro">
              I'm Eniola Emmanuel Ayodele, a Python programmer
              with a growing interest in artificial intelligence
              and machine learning.
            </p>

            <p>
              I enjoy turning ideas into practical digital tools
              and learning by building real projects. My current
              work includes Python projects such as a calculator
              application and a fashion business management system.
            </p>

            <p>
              I'm continuing to develop my programming skills
              while exploring technologies that can shape the
              future of software and intelligent systems.
            </p>


            <div className="about-facts">

              <div className="about-fact">
                <span>FOCUS</span>
                <strong>Python</strong>
              </div>

              <div className="about-fact">
                <span>EXPLORING</span>
                <strong>AI / ML</strong>
              </div>

              <div className="about-fact">
                <span>APPROACH</span>
                <strong>Build & Learn</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SKILLS ================= */}

      <section 
        className="skills-section"
        id="skills"
      ></section>

        <div className="section-label">
          <span>02</span>
          SKILLS
        </div>


        <div className="skills-header">

          <div>

            <p className="about-kicker">
              WHAT I WORK WITH
            </p>

            <h2>
              Skills that
              <br />
              <span>I'm building.</span>
            </h2>

          </div>

          <p className="skills-description">
            A focused set of skills I'm currently developing
            and using in my projects. This section will grow
            as I learn and build more.
          </p>

        </div>


        <div className="skills-list">

  {skills.map((skill, index) => (

    <div
      className="skill-card"
      key={`${skill}-${index}`}
    >

      <div className="skill-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="skill-main">

        <h3>
          {skill}
        </h3>

        <p>
          {skill === "Python"
            ? "Programming with Python to create practical applications and explore software development."
            : skill === "Basic Video Editing"
            ? "Creating and editing videos while developing visual storytelling and editing skills."
            : `Developing and applying ${skill} through practical projects and continuous learning.`}
        </p>

      </div>

      <div className="skill-arrow">
        ↗
      </div>

    </div>

  ))}

</div>


      {/* ================= PROJECTS ================= */}

      <section
        className="projects-section"
        id="projects"
      >

        <div className="section-label">
          <span>03</span>
          PROJECTS
        </div>


        <div className="projects-header">

          <div>

            <p className="about-kicker">
              SELECTED WORK
            </p>

            <h2>
              Things I've
              <br />
              <span>built.</span>
            </h2>

          </div>

          <p className="projects-description">
            A collection of projects I've created while learning,
            experimenting, and turning ideas into working software.
          </p>

        </div>


        <div className="projects-list">
         {adminProjects
           .filter((project) => project.status === "Published") 
           .map((project, index) => (
    <article
      className={`project-card ${
        index % 2 !== 0
          ? "project-card-reverse"
          : ""
      }`}
      key={project.id}
    >

      <div className="project-image">

        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="project-screenshot"
          />
        ) : (
          <div className="project-image-placeholder">
            PROJECT
          </div>
        )}

      </div>


      <div className="project-info">

        <div className="project-meta">

          <span>
            {project.technology}
          </span>

          <span>
            {String(index + 1).padStart(2, "0")}
          </span>

        </div>


        <h3>
          {project.name}
        </h3>


        <p>
          {project.description}
        </p>


        <div className="project-actions">

          <button
            type="button"
            className="project-button"
            onClick={() =>
              setSelectedProject(project)
            }
          >
            View Project ↗
          </button>

        </div>

      </div>

    </article>
  ))
}

          {/* CALCULATOR */}

          <article className="project-card">

            <div className="project-image">

              <img
                src={calculatorImage}
                alt="Calculator Project"
                className="project-screenshot"
              />

            </div>


            <div className="project-info">

              <div className="project-meta">

                <span>
                  PYTHON
                </span>

                <span>
                  01 / 02
                </span>

              </div>


              <h3>
                Calculator Project
              </h3>


              <p>
                A Python-based calculator created to practice
                programming fundamentals, user input,
                calculations, and application logic.
              </p>


              <div className="project-actions">

                <button
                  type="button"
                  className="project-button"
                  onClick={() =>
                    setSelectedProject("calculator")
                  }
                >
                  View Project ↗
                </button>

              </div>

            </div>

          </article>


          {/* FASHION MANAGEMENT */}

          <article className="project-card project-card-reverse">

            <div className="project-image">

              <img
                src={fashionImage}
                alt="Fashion Management App"
                className="project-screenshot"
              />

            </div>


            <div className="project-info">

              <div className="project-meta">

                <span>
                  PYTHON • CUSTOMTKINTER • SQLITE
                </span>

                <span>
                  02 / 02
                </span>

              </div>


              <h3>
                Fashion Management App
              </h3>


              <p>
                A desktop management application designed
                to help organize and manage operations for a
                fashion business through a centralized
                digital system.
              </p>


              <div className="project-actions">

                <button
                  type="button"
                  className="project-button"
                  onClick={() =>
                    setSelectedProject("fashion")
                  }
                >
                  View Project ↗
                </button>

              </div>

            </div>

          </article>

        </div>

      </section>


      {/* ================= UPGRADED PROJECT VIEWER ================= */}

      {selectedProject && (

        <div className="project-modal">

          <div className="project-modal-content">

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProject(null)
              }
              aria-label="Close project"
            >
              ×
            </button>


            {/* ================= CALCULATOR ================= */}

            {selectedProject === "calculator" && (

              <>

                <p className="modal-label">
                  PROJECT 01 / PYTHON
                </p>

                <h2>
                  Calculator Project
                </h2>

                <p className="modal-description">
                  A Python calculator application created to
                  practice programming fundamentals, user input,
                  calculations, and application logic.
                </p>


                <div className="project-details-grid">

                  <div>
                    <span className="detail-label">
                      PROJECT TYPE
                    </span>

                    <strong>
                      Desktop Application
                    </strong>
                  </div>


                  <div>
                    <span className="detail-label">
                      TECHNOLOGY
                    </span>

                    <strong>
                      Python
                    </strong>
                  </div>

                </div>


                <div className="case-study">

                  <h3>
                    About the project
                  </h3>

                  <p>
                    This project was created as a practical way
                    to develop programming fundamentals and
                    understand how application logic,
                    calculations, and user input work together.
                  </p>

                </div>


                <div className="project-preview-large">

                  <img
                    src={calculatorImage}
                    alt="Calculator Project preview"
                  />

                </div>

                <div className="modal-tech">

                  <span>
                    Python
                  </span>

                  <span>
                    Calculations
                  </span>

                  <span>
                    User Input
                  </span>

                  <span>
                    Application Logic
                  </span>

                </div>

              </>

            )}


            {/* ================= FASHION MANAGEMENT ================= */}

            {selectedProject === "fashion" && (

              <>

                <p className="modal-label">
                  PROJECT 02 / PYTHON
                </p>

                <h2>
                  Fashion Management App
                </h2>

                <p className="modal-description">
                  A desktop management system created to help
                  a fashion business organize customers,
                  measurements, orders, payments, apprentices,
                  certificates, receipts, and other daily
                  operations.
                </p>


                <div className="project-details-grid">

                  <div>
                    <span className="detail-label">
                      PROJECT TYPE
                    </span>

                    <strong>
                      Desktop Management System
                    </strong>
                  </div>


                  <div>
                    <span className="detail-label">
                      TECHNOLOGY
                    </span>

                    <strong>
                      Python
                    </strong>
                  </div>

                </div>


                <div className="case-study">

                  <h3>
                    About the project
                  </h3>

                  <p>
                    The system was designed as a centralized
                    digital tool for managing the operations
                    of a fashion studio. It brings several
                    everyday business activities into one
                    application instead of relying on separate
                    manual records.
                  </p>


                  <h3>
                    Key features
                  </h3>

                  <ul className="feature-list">

                    <li>
                      Customer management
                    </li>

                    <li>
                      Customer measurements
                    </li>

                    <li>
                      Order management
                    </li>

                    <li>
                      Payment tracking
                    </li>

                    <li>
                      Calendar management
                    </li>

                    <li>
                      Apprentice management
                    </li>

                    <li>
                      Certificate generation
                    </li>

                    <li>
                      Receipt and PDF generation
                    </li>

                    <li>
                      Business settings
                    </li>

                    <li>
                      Login and password management
                    </li>

                  </ul>

                </div>


                <div className="project-preview-large">

                  <img
                    src={fashionImage}
                    alt="Fashion Management App preview"
                  />

                </div>


                <div className="modal-tech">

                  <span>
                    Python
                  </span>

                  <span>
                    CustomTkinter
                  </span>

                  <span>
                    SQLite
                  </span>

                  <span>
                    ReportLab
                  </span>

                </div>

              </>

            )}

          </div>
          {/* ================= ADMIN PROJECT ================= */}

{typeof selectedProject === "object" && selectedProject !== null && (

  <>

    <p className="modal-label">
      PORTFOLIO PROJECT
    </p>

    <h2>
      {selectedProject.name}
    </h2>

    <p className="modal-description">
      {selectedProject.description}
    </p>

    <div className="project-details-grid">

      <div>
        <span className="detail-label">
          PROJECT STATUS
        </span>

        <strong>
          {selectedProject.status}
        </strong>
      </div>

      <div>
        <span className="detail-label">
          TECHNOLOGY
        </span>

        <strong>
          {selectedProject.technology}
        </strong>
      </div>

    </div>

    {selectedProject.image && (

      <div className="project-preview-large">

        <img
          src={selectedProject.image}
          alt={`${selectedProject.name} preview`}
        />

      </div>

    )}

    <div className="modal-tech">

      <span>
        {selectedProject.technology}
      </span>

      <span>
        Portfolio Project
      </span>

    </div>

  </>

)}

        </div>

      )}
      
      {/* ================= CV ================= */}

<section
  className="cv-section"
  id="cv"
>

  <div className="section-label">

    <span>04</span>
    CV

  </div>


  <div className="cv-content">

    <div>

      <p className="about-kicker">
        CURRICULUM VITAE
      </p>

      <h2>
        Want to know
        <br />
        <span>more about me?</span>
      </h2>

    </div>


    <div className="cv-description">

      <p>
        My detailed CV is available upon request.
      </p>

      <div className="cv-actions">

        <a

        href={`https://wa.me/${profile.whatsapp.replace(
          /\D/g,
           ""
        )}?
        text=Hi%20Eniola%2C%20I%20would%20like%20to%20request%20your%20CV.`}
      >
        Request CV ↗
     </a>

      </div>

    </div>

  </div>

</section>


      {/* ================= CONTACT ================= */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="section-label">
          <span>05</span>
          CONTACT
        </div>


        <div className="contact-content">

          <p className="about-kicker">
            LET'S CONNECT
          </p>

          <h2>
            Have an idea?
            <br />
            <span>Let's talk.</span>
          </h2>


          <div className="contact-links">

            <a
              href={`mailto:${profile.email}`}
              className="contact-card"
            >
              <span>EMAIL</span>

              <strong>
                {profile.email}
              </strong>

              <span className="contact-arrow">
                ↗
              </span>
            </a>


            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <span>
                LINKEDIN
              </span>

              <strong>
                Eniola Ayodele
              </strong>

              <span className="contact-arrow">
                ↗
              </span>
            </a>


            <a
              href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <span>
                WHATSAPP
              </span>

              <strong>
                {profile.whatsapp}
              </strong>

              <span className="contact-arrow">
                ↗
              </span>
            </a>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="logo">
          EA<span>.</span>
        </div>

        <p>
          © 2026 Eniola Emmanuel Ayodele
        </p>

        <p>
          Built with curiosity.
        </p>

        <button
          type="button"
          className="admin-access"
          onClick={() => setAdminPage("login")}
        >
          Admin
        </button>

      </footer>

    </div>
  );
}

export default App;