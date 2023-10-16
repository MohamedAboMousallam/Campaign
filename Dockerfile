FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install application dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Expose the port that your backend listens on (e.g., 5000)
EXPOSE 5000

# Start your backend application
CMD ["npm", "start"]
