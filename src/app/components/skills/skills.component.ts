import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  categories = [
    {
      title: 'Programming Languages',
      items: [
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-plain.svg' },
        { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-plain.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' }

      ]
    },
    {
      title: 'Front-End',
      items: [
        { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg' },
        { name: 'SCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/sass/sass-original.svg' },
        { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' }
      ]
    },
    {
      title: 'Back-End',
      items: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg' },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' }
      ]
    },
    {
      title: 'Databases',
      items: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'MySQL ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
        { name: 'Firebase ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' }

      ]
    },
    {
      title: 'QA',
      items: [
        { name: 'Selenium', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg' },
        { name: 'Playwright', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
        { name: 'Cypress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg' },
        { name: 'JUnit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-original.svg' }
      ]
    },
    {
      title: 'Tools & Technology',
      items: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
        { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
        { name: 'Trello', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' }
      ]
    }
  ];
}
