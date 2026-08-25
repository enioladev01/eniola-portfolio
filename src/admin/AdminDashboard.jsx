import { useState } from "react";
import "./Admin.css";

function AdminDashboard({ onLogout }) {
  const defaultProjects = [
    {
      id: 1,
      name: "Calculator Project",
      technology: "Python",
      description:
        "A Python-based calculator created to practice programming fundamentals, user input, calculations, and application logic.",
      status: "Published",
    },
    {
      id: 2,
      name: "Fashion Management App",
      technology: "Python • CustomTkinter • SQLite",
      description:
        "A desktop management application designed to help organize and manage operations for a fashion business.",
      status: "Published",
    },
  ];

  const [activeSection, setActiveSection] = useState("overview");
  const [cvFile, setCvFile] = useState(null);
  const [settings, setSettings] = useState(() => {
  try {
    const saved = localStorage.getItem(
      "eaPortfolioSettings"
    );

    return saved
      ? JSON.parse(saved)
      : {
          portfolioName: "EA. Portfolio",
          websiteStatus: "online",
          appearance: "system",
        };
  } catch {
    return {
      portfolioName: "EA. Portfolio",
      websiteStatus: "online",
      appearance: "system",
    };
  }
});
  const [profile, setProfile] = useState(() => {
  try {
    const saved = localStorage.getItem("eaPortfolioProfile");

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
            "I'm a Python programmer with a growing interest in artificial intelligence and machine learning. I enjoy turning ideas into practical digital tools and learning by building real projects.",
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
        "I'm a Python programmer with a growing interest in artificial intelligence and machine learning. I enjoy turning ideas into practical digital tools and learning by building real projects.",
    };
  }
});
const [skills, setSkills] = useState(() => {
  try {
    const saved = localStorage.getItem("eaPortfolioSkills");

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
    ];
  }
});

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("eaPortfolioProjects");

      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [showProjectForm, setShowProjectForm] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState(null);

  const [projectForm, setProjectForm] = useState({
    name: "",
    technology: "",
    description: "",
    status: "Published",
  });

  /* ==================================================
     SAVE PROJECTS
  ================================================== */

  const saveProjects = (updatedProjects) => {
    setProjects(updatedProjects);

    localStorage.setItem(
      "eaPortfolioProjects",
      JSON.stringify(updatedProjects)
    );
  };

  /* ==================================================
     ADD PROJECT
  ================================================== */

  const openAddProject = () => {
    setEditingProject(null);

    setProjectForm({
      name: "",
      technology: "",
      description: "",
      status: "Published",
    });

    setShowProjectForm(true);
  };

 /* ==================================================
   EDIT PROJECT
================================================== */

const openEditProject = (project) => {
  setEditingProject(project);

  setProjectForm({
    name: project.name,
    technology: project.technology,
    description: project.description,
    status: project.status,
    image: project.image || "",
  });

  setShowProjectForm(true);
};
  /* ==================================================
     FORM INPUT
  ================================================== */

  const handleProjectChange = (event) => {
    const { name, value } = event.target;

    setProjectForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

/* ==================================================
   SAVE PROJECT
================================================== */

const saveProject = (event) => {
  event.preventDefault();

  if (!projectForm.name.trim()) {
    alert("Please enter a project name.");
    return;
  }

  if (!projectForm.technology.trim()) {
    alert("Please enter the technology used.");
    return;
  }

  if (editingProject) {

    const updatedProjects = projects.map((project) =>
      project.id === editingProject.id
        ? {
            ...project,
            name: projectForm.name.trim(),
            technology: projectForm.technology.trim(),
            description: projectForm.description.trim(),
            status: projectForm.status,
            image: projectForm.image || project.image || "",
          }
        : project
    );

    saveProjects(updatedProjects);

  } else {

    const newProject = {
      id: Date.now(),
      name: projectForm.name.trim(),
      technology: projectForm.technology.trim(),
      description: projectForm.description.trim(),
      status: projectForm.status,
      image: projectForm.image || "",
    };

    saveProjects([
      ...projects,
      newProject,
    ]);

  }

  closeProjectForm();
};
  /* ==================================================
     DELETE PROJECT
  ================================================== */

  const deleteProject = (id) => {
    const project = projects.find(
      (item) => item.id === id
    );

    if (!project) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    );

    if (!confirmed) return;

    const updatedProjects = projects.filter(
      (item) => item.id !== id
    );

    saveProjects(updatedProjects);
  };

  /* ==================================================
     CLOSE FORM
  ================================================== */

  const closeProjectForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);

   setProjectForm({
  name: "",
  technology: "",
  description: "",
  status: "Published",
  image: "",
  });
  };

  /* ==================================================
     NAVIGATION
  ================================================== */

  const navigationItems = [
    {
      id: "overview",
      number: "01",
      label: "Overview",
    },
    {
      id: "projects",
      number: "02",
      label: "Projects",
    },
    {
      id: "cv",
      number: "03",
      label: "CV",
    },
    {
      id: "profile",
      number: "04",
      label: "Profile",
    },
    {
      id: "skills",
      number: "05",
      label: "Skills",
    },
    {
      id: "settings",
      number: "06",
      label: "Settings",
    },
  ];

  const getPageTitle = () => {
    const currentItem = navigationItems.find(
      (item) => item.id === activeSection
    );

    return currentItem
      ? currentItem.label
      : "Dashboard";
  };

  return (
    <div className="admin-dashboard">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          EA<span>.</span>
        </div>

        <div className="admin-sidebar-title">
          PORTFOLIO ADMIN
        </div>

        <nav className="admin-nav">

          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-nav-item ${
                activeSection === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(item.id)
              }
            >
              <span>{item.number}</span>
              {item.label}
            </button>
          ))}

        </nav>

        <button
          type="button"
          className="admin-logout"
          onClick={onLogout}
        >
          Logout ↗
        </button>

      </aside>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="admin-main">

        {/* ==================================================
            TOP BAR
        ================================================== */}

        <header className="admin-topbar">

          <div>

            <p className="admin-eyebrow">
              EA TECH • CONTROL PANEL
            </p>

            <h1>{getPageTitle()}</h1>

          </div>

          <div className="admin-status">

            <span className="status-dot"></span>

            Portfolio Online

          </div>

        </header>


        {/* ==================================================
            OVERVIEW
        ================================================== */}

        {activeSection === "overview" && (
          <>

            <section className="admin-welcome">

              <div>

                <p className="admin-section-label">
                  WELCOME BACK
                </p>

                <h2>
                  Manage your
                  <span> portfolio.</span>
                </h2>

                <p>
                  Update your projects, profile, skills
                  and demonstration videos from one
                  place.
                </p>

              </div>

            </section>


            {/* STATS */}

            <section className="admin-stats">

              <div className="admin-stat-card">

                <span className="admin-stat-number">
                  {String(projects.length).padStart(
                    2,
                    "0"
                  )}
                </span>

                <span className="admin-stat-label">
                  PROJECTS
                </span>

              </div>


              <div className="admin-stat-card">

                <span className="admin-stat-number">
                  02
                </span>

                <span className="admin-stat-label">
                  SKILLS
                </span>

              </div>


              <div className="admin-stat-card">

                <span className="admin-stat-number">
                  00
                </span>

                <span className="admin-stat-label">
                  DEMO VIDEOS
                </span>

              </div>


              <div className="admin-stat-card">

                <span className="admin-stat-number">
                  01
                </span>

                <span className="admin-stat-label">
                  PROFILE
                </span>

              </div>

            </section>


            {/* PROJECT PREVIEW */}

            <section className="admin-section">

              <div className="admin-section-header">

                <div>

                  <p className="admin-section-label">
                    YOUR WORK
                  </p>

                  <h2>Projects</h2>

                </div>

                <button
                  type="button"
                  className="admin-action-button"
                  onClick={() =>
                    setActiveSection("projects")
                  }
                >
                  Manage Projects →
                </button>

              </div>


              <div className="admin-project-list">

                {projects.length === 0 ? (

                  <div className="admin-info-box">

                    <strong>
                      No projects yet.
                    </strong>

                    <p>
                      Add your first project from
                      the Projects section.
                    </p>

                  </div>

                ) : (

                  projects.map((project, index) => (

                    <div
                      className="admin-project-row"
                      key={project.id}
                    >

                      <div className="admin-project-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="admin-project-info">

                        <h3>
                          {project.name}
                        </h3>

                        <p>
                          {project.technology}
                        </p>

                      </div>

                      <div className="admin-project-status">
                        {project.status}
                      </div>

                      <button
                        type="button"
                        className="admin-edit-button"
                        onClick={() => {

                          setActiveSection(
                            "projects"
                          );

                          openEditProject(project);

                        }}
                      >
                        Edit ↗
                      </button>

                    </div>

                  ))

                )}

              </div>

            </section>

          </>
        )}


        {/* ==================================================
            PROJECTS
        ================================================== */}

        {activeSection === "projects" && (

          <section className="admin-section">

            <div className="admin-section-header">

              <div>

                <p className="admin-section-label">
                  CONTENT MANAGEMENT
                </p>

                <h2>Your Projects</h2>

              </div>

              <button
                type="button"
                className="admin-action-button"
                onClick={openAddProject}
              >
                + Add Project
              </button>

            </div>


            {projects.length === 0 ? (

              <div className="admin-info-box">

                <strong>
                  No projects available.
                </strong>

                <p>
                  Click "Add Project" to create your
                  first portfolio project.
                </p>

              </div>

            ) : (

              <div className="admin-project-manager-list">

                {projects.map((project, index) => (

                  <div
                    className="admin-manager-card"
                    key={project.id}
                  >

                    <div className="admin-manager-number">

                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}

                    </div>


                    <div className="admin-manager-content">

                      <div>

                        <p className="admin-section-label">
                          PROJECT
                        </p>

                        <h3>
                          {project.name}
                        </h3>

                        <p className="admin-manager-tech">
                          {project.technology}
                        </p>

                      </div>


                      <div className="admin-manager-status">

                        <span className="status-dot"></span>

                        {project.status}

                      </div>

                    </div>


                    <div className="admin-manager-actions">

                      <button
                        type="button"
                        className="admin-edit-button"
                        onClick={() =>
                          openEditProject(project)
                        }
                      >
                        Edit ↗
                      </button>


                      <button
                        type="button"
                        className="admin-delete-button"
                        onClick={() =>
                          deleteProject(project.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}


        {/* ==================================================
            PROJECT FORM MODAL
        ================================================== */}

        {showProjectForm && (

          <div className="admin-form-overlay">

            <div className="admin-form-modal">

              <div className="admin-form-header">

                <div>

                  <p className="admin-section-label">
                    {editingProject
                      ? "EDIT PROJECT"
                      : "NEW PROJECT"}
                  </p>

                  <h2>
                    {editingProject
                      ? "Edit Project"
                      : "Add Project"}
                  </h2>

                </div>


                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={closeProjectForm}
                  aria-label="Close"
                >
                  ×
                </button>

              </div>


              <form onSubmit={saveProject}>

                <div className="admin-form-group">

                  <label>
                    Project Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={projectForm.name}
                    onChange={handleProjectChange}
                    placeholder="e.g. Weather App"
                    required
                  />

                </div>


                <div className="admin-form-group">

                  <label>
                    Technology
                  </label>

                  <input
                    type="text"
                    name="technology"
                    value={projectForm.technology}
                    onChange={handleProjectChange}
                    placeholder="e.g. Python • React • SQLite"
                    required
                  />

                </div>


                <div className="admin-form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectChange}
                    placeholder="Describe your project..."
                    rows="5"
                  />

                </div>
                <div className="admin-form-group">

  <label>
    Project Screenshot
  </label>

  <input
    type="file" 
    accept="image/*"
    onChange={(event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setProjectForm((previous) => ({
            ...previous,
            image: reader.result,
          }));
        };

        reader.readAsDataURL(file);
      }
    }}
  />
  {projectForm.image && (

  <div className="admin-image-preview">

    <img
      src={projectForm.image}
      alt="Project screenshot preview"
    />

  </div>

)}

  <small>
    Upload a screenshot of your project.
  </small>

</div>


                <div className="admin-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={projectForm.status}
                    onChange={handleProjectChange}
                  >

                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>

                  </select>

                </div>


                <div className="admin-form-actions">

                  <button
                    type="button"
                    className="admin-cancel-button"
                    onClick={closeProjectForm}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-save-button"
                  >

                    {editingProject
                      ? "Save Changes"
                      : "Create Project"}

                    ↗

                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

  {activeSection === "cv" && (
  <section className="admin-section">

    <p className="admin-section-label">
      DOCUMENT
    </p>

    <h2>
      Curriculum Vitae
    </h2>

    <div className="admin-info-box">

      <strong>
        CV Management
      </strong>

      <p>
        Your CV management section is ready.
      </p>

    </div>

  </section>
)}
 {/* ==================================================
    CV
  ================================================== */}

{activeSection === "cv" && (

  <section className="admin-section">

    <p className="admin-section-label">
      DOCUMENT
    </p>

    <h2>
      Curriculum Vitae
    </h2>

    <div className="admin-info-box">

      <strong>
        Manage your CV
      </strong>

      <p>
        Upload your latest CV here. Visitors will
        be able to view or download it from your
        public portfolio.
      </p>

      <div className="admin-form-group">

        <label>
          CV PDF
        </label>

       <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={(event) => {
            const file = event.target.files[0];

             if (file) {
                 setCvFile(file);
              }
            }}
          />

      <small>
       {cvFile
        ? `Selected: ${cvFile.name}`

        : "PDF files only."}
       </small>
     </div>

      <button
        type="button"
        className="admin-save-button"
        onClick={() => {
          if (!cvFile) {
            alert("Please select your CV PDF first.");
            return;
          }

          alert(`CV selected successfully: ${cvFile.name}`);
        }}
>
       Upload CV ↗
      </button>

    </div>

  </section>

)}


     {/* ==================================================
    PROFILE
================================================== */}

{activeSection === "profile" && (

  <section className="admin-section">

    <p className="admin-section-label">
      PERSONAL INFORMATION
    </p>

    <h2>
      Profile
    </h2>

    <div className="admin-form-card">

      <div className="admin-form-group">

        <label>
          Full Name
        </label>

        <input
          type="text"
          value={profile.name}
          onChange={(event) =>
            setProfile({
              ...profile,
              name: event.target.value,
            })
          }
          placeholder="Enter your full name"
        />

      </div>


      <div className="admin-form-group">

        <label>
          Professional Title
        </label>

        <input
          type="text"
          value={profile.title}
          onChange={(event) =>
            setProfile({
              ...profile,
              title: event.target.value,
            })
          }
          placeholder="Enter your professional title"
        />

      </div>


      <div className="admin-form-group">

        <label>
          Email
        </label>

        <input
          type="email"
          value={profile.email}
          onChange={(event) =>
            setProfile({
              ...profile,
              email: event.target.value,
            })
          }
          placeholder="Enter your email"
        />

      </div>


      <div className="admin-form-group">

        <label>
          WhatsApp Number
        </label>

        <input
          type="text"
          value={profile.whatsapp}
          onChange={(event) =>
            setProfile({
              ...profile,
              whatsapp: event.target.value,
            })
          }
          placeholder="Enter your WhatsApp number"
        />

      </div>


      <div className="admin-form-group">

        <label>
          LinkedIn
        </label>

        <input
          type="url"
          value={profile.linkedin}
          onChange={(event) =>
            setProfile({
              ...profile,
              linkedin: event.target.value,
            })
          }
          placeholder="Enter your LinkedIn URL"
        />

      </div>


      <div className="admin-form-group">

        <label>
          Short Bio
        </label>

        <textarea
          rows="5"
          value={profile.bio}
          onChange={(event) =>
            setProfile({
              ...profile,
              bio: event.target.value,
            })
          }
          placeholder="Write a short professional bio"
        />

      </div>


      <div className="admin-form-actions">

        <button
          type="button"
          className="admin-save-button"
          onClick={() => {
            localStorage.setItem(
              "eaPortfolioProfile",
              JSON.stringify(profile)
            );

            alert("Profile saved successfully.");
          }}
        >
          Save Profile ↗
        </button>

      </div>

    </div>

  </section>

)}
{/* ==================================================
    SKILLS
================================================== */}

{activeSection === "skills" && (

  <section className="admin-section">

    <p className="admin-section-label">
      PORTFOLIO SKILLS
    </p>

    <h2>
      Skills
    </h2>

    <div className="admin-form-card">

      {skills.map((skill, index) => (

        <div
          className="admin-form-group"
          key={index}
        >

          <label>
            Skill {String(index + 1).padStart(2, "0")}
          </label>

          <input
            type="text"
            value={skill}
            onChange={(event) => {

              const updatedSkills = [
                ...skills,
              ];

              updatedSkills[index] =
                event.target.value;

              setSkills(updatedSkills);

            }}
            placeholder="Enter skill"
          />

        </div>

      ))}


      <div className="admin-form-actions">

        <button
          type="button"
          className="admin-save-button"
          onClick={() => {

            const cleanedSkills = skills
              .map((skill) => skill.trim())
              .filter(Boolean);

            setSkills(cleanedSkills);

            localStorage.setItem(
              "eaPortfolioSkills",
              JSON.stringify(cleanedSkills)
            );

            alert("Skills saved successfully.");

          }}
        >
          Save Skills ↗
        </button>

      </div>

    </div>

  </section>

)}

       
        {/* ==================================================
    SETTINGS
================================================== */}

{activeSection === "settings" && (

  <section className="admin-section">

    <p className="admin-section-label">
      SYSTEM
    </p>

    <h2>
      Settings
    </h2>

    <div className="admin-form-card">

      <div className="admin-form-group">

        <label>
          Portfolio Name
        </label>

        <input
          type="text"
          value={settings.portfolioName}
          onChange={(event) =>
            setSettings({
              ...settings,
              portfolioName: event.target.value,
            })
          }
          placeholder="Enter portfolio name"
        />

      </div>


      <div className="admin-form-group">

        <label>
          Website Status
        </label>

        <select
          value={settings.websiteStatus}
          onChange={(event) =>
            setSettings({
              ...settings,
              websiteStatus: event.target.value,
            })
          }
        >

          <option value="online">
            Online
          </option>

          <option value="maintenance">
            Maintenance
          </option>

        </select>

      </div>


      <div className="admin-form-group">

        <label>
          Default Appearance
        </label>

        <select
          value={settings.appearance}
          onChange={(event) =>
            setSettings({
              ...settings,
              appearance: event.target.value,
            })
          }
        >

          <option value="system">
            System Default
          </option>

          <option value="light">
            Light
          </option>

          <option value="dark">
            Dark
          </option>

        </select>

      </div>


      <div className="admin-info-box">

        <strong>
          Portfolio Management
        </strong>

        <p>
          These settings control general
          information and presentation preferences
          for your portfolio.
        </p>

      </div>


      <div className="admin-form-actions">

        <button
          type="button"
          className="admin-save-button"
          onClick={() => {

            localStorage.setItem(
              "eaPortfolioSettings",
              JSON.stringify(settings)
            );

            alert("Settings saved successfully.");

          }}
        >
          Save Settings ↗
        </button>

      </div>

    </div>

  </section>

)}


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="admin-footer">

          <span>
            EA TECH
          </span>

          <span>
            Portfolio Administration
          </span>

          <span>
            2026
          </span>

        </footer>

      </main>

    </div>
  );
}

export default AdminDashboard;