import { RevealDirective, SpotlightDirective } from '../../shared/reveal.directive';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, RevealDirective, SpotlightDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Kolshi B Jam3etna',
      type: 'Mobile Application',
      fullDescription: 'Kolshi B Jam3etna is a mobile app that brings campus life into one place. Students can request or offer academic help, buy, sell, or exchange textbooks and supplies, register for campus events, and follow official announcements about scholarships and internships. Each student selects their university at signup to access campus-specific content and connect with other students through in-app messaging.',
      technologies: ['React Native', 'Expo', 'TypeScript', 'Context API'],
      image: 'assets/images/kolshi-b-jam3etna.svg',
      github: 'https://github.com/Mohamad-husain/Kolshe-Bjam3etna',
      live: ''
    },
    {
      title: 'Trendella',
      type: 'Full Stack',
      fullDescription: 'Full-stack e-commerce platform for clothing built with Angular & Laravel. Features include product browsing, cart management, secure checkout, and an admin dashboard for managing users and inventory.\n',
      technologies: ['Angular', 'TypeScript', 'Laravel', 'PHP', 'MySql'],
      image: 'assets/images/trendella-dashboard.png',
      github: 'https://github.com/Mohamad-husain/E-commerce-Trendella',
      live: 'https://trendella-demo.com'
    },
    {
      title: 'Secrets of Cities',
      type: 'Full Stack',
      fullDescription: 'A full-stack web application built with React.js and Node.js to help tourists explore the hidden and historical regions of Palestine. The platform allows users to plan customized daily routes, connect with local guides, and enjoy an interactive experience for discovering unique destinations.\n',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: 'assets/images/secrets-of-cities-cover.png',
      github: 'https://github.com/Mohamad-husain/web2project',
      live: 'https://trendella-demo.com'
    },
    {
      title: 'Online Job Portal System',
      type: 'Full Stack',
      fullDescription: 'Full-stack job portal built with Angular & Laravel, connecting job seekers with employers. Users can browse and apply for jobs, track application status (accepted/rejected), while admins have full control over job postings, applications, and user management.\n',
      technologies: ['Angular', 'TypeScript', 'Laravel', 'PHP', 'MySql'],
      image: 'assets/images/job-portal-cover.png',
      github: 'https://github.com/HidayaAwwad4/ojps-web2',
      live: 'https://trendella-demo.com'
    },
    {
      title: 'Time4meds',
      type: 'UI/UX',
      fullDescription: 'Time4meds is a smart health news app that reminds patients to take medication, connects them with doctors, and shares disease-related articles. It addresses missed doses with timely reminders and a simple interface that improves adherence and peace of mind.',
      technologies: ['Figma', 'UI/UX', 'Prototyping'],
      image: 'assets/images/time4meds-cover.png',
      github: '',
      behance: 'https://www.behance.net/gallery/211753891/Time4Meds-(Ui-Ux)',
      live: ''
    },
    {
      title: 'BOOKIFY',
      type: 'Desktop App',
      fullDescription: 'A complete desktop application built with Java and JavaFX for efficient library management. It supports book reservations and returns, detailed activity logging, user authentication with role-based access, and an admin panel for managing books, users, and overall library operations.\n',
      technologies: ['Java', 'JavaFx', 'Mysql', 'SceneBuilder'],
      image: 'assets/images/bookify-cover.png',
      github: 'https://github.com/MhmadAwawdy/advanced-project',
      live: 'https://trendella-demo.com'
    }
  ];

}
