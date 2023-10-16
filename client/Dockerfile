FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --verbose


# Stage 2: Serve the Next.js application
FROM node:18
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

# Copy the remaining files
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
