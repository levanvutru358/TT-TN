// mockApi.js
export const getProjectDetail = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: 1,
          name: "E-commerce Platform Development",
          description: "Build a modern e-commerce platform with React and Node.js",
          createdAt: "2024-03-01",
          members: [
            { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", avatar: "https://ui-avatars.com/api/?name=John+Doe" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Developer", avatar: "https://ui-avatars.com/api/?name=Jane+Smith" },
            { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Designer", avatar: "https://ui-avatars.com/api/?name=Mike+Johnson" },
          ],
          tasks: [
            {
              id: 1,
              title: "Design Homepage",
              description: "Create responsive homepage design with product showcase",
              priority: "High",
              assignee: "Mike Johnson",
              dueDate: "2024-03-15",
              status: "Todo",
              createdAt: "2024-03-01"
            },
            {
              id: 2,
              title: "Implement Authentication",
              description: "Set up JWT authentication with refresh tokens",
              priority: "High",
              assignee: "Jane Smith",
              dueDate: "2024-03-10",
              status: "In Progress",
              createdAt: "2024-03-01",
              progress: 60
            },
            {
              id: 3,
              title: "Database Setup",
              description: "Configure PostgreSQL and Prisma ORM",
              priority: "Medium",
              assignee: "John Doe",
              dueDate: "2024-03-08",
              status: "Done",
              createdAt: "2024-03-01"
            },
            {
              id: 4,
              title: "API Documentation",
              description: "Write API documentation using Swagger",
              priority: "Low",
              assignee: "Jane Smith",
              dueDate: "2024-03-20",
              status: "Todo",
              createdAt: "2024-03-02"
            }
          ]
        }
      });
    }, 1000);
  });
};