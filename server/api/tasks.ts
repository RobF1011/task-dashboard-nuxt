const mockTasks = [
  { id: 1, name: 'Create Wireframes', description: 'Design wireframes for the new homepage.', assignee: 'Alice', priority: 'High', status: 'To do' },
  { id: 2, name: 'Fix Login Bug', description: 'Resolve issue with user login validation.', assignee: 'Bob', priority: 'Medium', status: 'In progress' },
  { id: 3, name: 'Prepare Presentation', description: 'Draft slides for the upcoming client meeting.', assignee: 'Charlie', priority: 'Low', status: 'Completed' },
  { id: 4, name: 'Update User Profile', description: 'Add new fields to the user profile section.', assignee: 'Alice', priority: 'Medium', status: 'To do' },
  { id: 5, name: 'Optimize Images', description: 'Compress and optimize images for faster loading.', assignee: 'Bob', priority: 'Low', status: 'To do' },
  { id: 6, name: 'Write Unit Tests', description: 'Add test coverage for the authentication module.', assignee: 'Charlie', priority: 'High', status: 'In progress' },
  { id: 7, name: 'Set Up CI/CD', description: 'Automate build and deployment process.', assignee: 'Alice', priority: 'High', status: 'To do' },
  { id: 8, name: 'Database Backup', description: 'Schedule automatic backups for the database.', assignee: 'Bob', priority: 'Low', status: 'Completed' },
  { id: 9, name: 'Redesign Footer', description: 'Create a modern look for the website footer.', assignee: 'Charlie', priority: 'Medium', status: 'To do' },
  { id: 10, name: 'Bug Triage', description: 'Prioritize and assign recent bug reports.', assignee: 'Alice', priority: 'High', status: 'In progress' },
  { id: 11, name: 'Setup Analytics', description: 'Integrate Google Analytics into the app.', assignee: 'Bob', priority: 'Medium', status: 'Completed' },
  { id: 12, name: 'Refactor Code', description: 'Improve readability of the checkout module.', assignee: 'Charlie', priority: 'Low', status: 'To do' },
  { id: 13, name: 'Update Dependencies', description: 'Upgrade to the latest versions of all libraries.', assignee: 'Alice', priority: 'Medium', status: 'In progress' },
  { id: 14, name: 'Create API Docs', description: 'Write documentation for the public API.', assignee: 'Bob', priority: 'High', status: 'To do' },
  { id: 15, name: 'Review PRs', description: 'Review and merge pending pull requests.', assignee: 'Charlie', priority: 'Medium', status: 'Completed' },
  { id: 16, name: 'Add Dark Mode', description: 'Implement a dark mode theme for the app.', assignee: 'Alice', priority: 'Low', status: 'To do' },
  { id: 17, name: 'Fix CSS Bugs', description: 'Resolve styling issues reported by QA.', assignee: 'Bob', priority: 'Medium', status: 'In progress' },
  { id: 18, name: 'Onboarding Guide', description: 'Create a guide for new users of the app.', assignee: 'Charlie', priority: 'High', status: 'Completed' },
  { id: 19, name: 'Add Search', description: 'Implement a search feature for the task dashboard.', assignee: 'Alice', priority: 'High', status: 'To do' },
  { id: 20, name: 'Improve SEO', description: 'Optimize metadata for better search rankings.', assignee: 'Bob', priority: 'Medium', status: 'To do' },
]

export default defineEventHandler(() => mockTasks);