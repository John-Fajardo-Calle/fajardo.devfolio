import React from 'react';
import ProjectsSection from '../components/ProjectsSection';
import projectsDataES from '../data/projects_es.json';
import projectsDataEN from '../data/projects_en.json';
import dumbProjectsDataES from '../data/dumb_projects_es.json';
import dumbProjectsDataEN from '../data/dumb_projects_en.json';

const Projects = () => (
    <div className="container mx-auto px-4 py-8">
        <ProjectsSection
            projectDataEN={projectsDataEN}
            projectDataES={projectsDataES}
            titleKey="projects.title"
            storagePrefix="projects"
        />
        <ProjectsSection
            projectDataEN={dumbProjectsDataEN}
            projectDataES={dumbProjectsDataES}
            titleKey="projects.dumbProjectsTitle"
            storagePrefix="dumbProjects"
        />
    </div>
);

export default Projects;
