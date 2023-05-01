# HR Management React App with ASP.NET Web API Backend - COP 4710 (Database Design) Project
This is a sample React application that interacts with an ASP.NET Web API backend. The app provides authentication and authorization features, allows users to manage their time off, view their training schedule, and get information about the company and team. The following are the steps to get started with the application.

## Requirements
* Node.js and NPM installed
* .NET Framework and Visual Studio installed
## Installation
1. Clone the repository or download the zip file.
2. Open the project in Visual Studio.
3. Run the API project to ensure the server is running.
4. Open a new terminal window and navigate to the client folder.
5. Run npm install to install all the dependencies.
6. Run npm start to start the React application.
## Configuration
The application uses a .env file to store environment variables. Before running the application, make sure to update the following variables:

* __REACT_APP_API_URL__: The URL of the Web API backend.

## Usage
Once the application is running, you can access the following pages:

* `/login`: The login page.
* `/dashboard`: The dashboard page, which displays the user's time off requests and training schedule.
* `/team`: The team page, which displays information about the company's team members.
* `/training`: The training page, which displays the user's training schedule.
* `/training/addtraining`: The add training page, which allows the user to add a new training session. 
* `/timeoff`: The time off page, which displays the user's time off requests.
* `/timeoff/requesttimeoff`: The request time off page, which allows the user to request time off.
* `/about`: The about page, which displays information about the company.
* `/*`: The 404 page.
