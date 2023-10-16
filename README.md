# Voucher Campaign Management

Voucher Campaign Management is a web application that allows you to manage and create voucher campaigns and vouchers.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [License](#license)

## Features

- Create and manage voucher campaigns.
- Generate vouchers for existing campaigns.
- List all campaigns and their details.
- List vouchers for a specific campaign.
- Delete campaigns.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) - We recommend using the LTS version.
- [Docker](https://www.docker.com/) - To containerize your application.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```
2. Navigate to the project's root directory:
  
```bash
cd <project-folder>
```

3. Install frontend dependencies:

```bash
cd client
npm install
```

## Usage

Run the backend in development mode:

```bash
cd backend
npm start
``` 
Run the frontend in development mode:
```bash
cd client
npm run dev
```
Production

To build and run the application in a production environment using Docker, follow these steps:

1. Build the Docker image for the backend:

```bash
cd backend
docker build -t backend .
```
2. Build the Docker image for the client aka: frontend (within the backend directory):

```bash
cd client
docker build -t frontend .
```
3. Run the application in Docker containers:
```bash
docker run -d -p 3000:3000 frontend
docker run -d -p 5000:5000 backend
```
4. Find the IP address of the Docker machine:

On Windows or macOS, you can use the following command:

```bash
docker-machine ip default
```
On Linux, you can use localhost as the IP address.

Access the application in your browser using the Docker machine's IP address:
```bash
Backend: http://<docker-machine-ip>:5000
Frontend: http://<docker-machine-ip>:3000
```

## Folder Structure
* backend/ contains the Node.js Express backend code.
* client/ contains the Next.js frontend code.
* client/pages contains the Next.js main page.
* client/components contains the React components used in  the frontend.

## API Documentation
### Campaigns
#### Create a New Campaign

* URL: /campaigns
* Method: POST
* Request Body:
  * name (string, required): The name of the campaign.
  * validityStart (string, required): The start date of the campaign in the format 'YYYY-MM-DD'.
  * validityEnd (string, required): The end date of the campaign in the format 'YYYY-MM-DD'.
  * amount (number, required): The campaign amount.
  * currency (string, required): The currency of the campaign.
  * prefix (string, required): The voucher prefix.

#### Response:

* Status Code: 201 (Created)
* Returns the created campaign with a unique id.

#### List Campaigns:

* URL: /campaigns
* Method: GET

#### Response:

* Status Code: 200 (OK)
* Returns a list of all campaigns.

#### Delete a Campaign

* URL: /campaigns/:id
* Method: DELETE

#### Response:

* Status Code: 204 (No Content)
The campaign with the specified id is deleted.

## Vouchers

### Create Vouchers for a Campaign

* URL: /campaigns/:id/vouchers
* Method: POST
* Request Body:
* quantity (number, required): The number of vouchers to create.

#### Response:

* Status Code: 201 (Created)
* Returns an array of newly created vouchers.

### List Vouchers for a Campaign

* URL: /campaigns/:id/vouchers
* Method: GET

#### Response:

* Status Code: 200 (OK)
* Returns a list of vouchers for the campaign with the specified id.

Please note that you should replace :id in the URL with the actual campaign ID when making requests.

## Data Models
### Campaign
* id (string): The unique identifier of the campaign.
* name (string): The name of the campaign.
* validityStart (string): The start date of the campaign.
* validityEnd (string): The end date of the campaign.
* amount (number): The campaign amount.
* currency (string): The currency of the campaign.
* prefix (string): The voucher prefix.

### Voucher
* id (string): The unique identifier of the voucher.
* code (string): The voucher code.
* campaignId (string): The ID of the campaign to which the voucher belongs.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


