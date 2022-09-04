## Stage 1: Build the application
FROM node:lts-buster as builder
WORKDIR /usr/app

# Install all dependencies
COPY ["package.json", "package-lock.json*", "tsconfig*.json", "./"]
RUN npm install

# Copy source files
COPY ./src ./src
# Build app
ENV NODE_ENV=production
RUN npm run build
RUN npm prune --production

## Stage 2: Run the app
FROM node:lts-alpine as application
WORKDIR /usr/app
USER node

COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/node_modules ./node_modules

CMD ["node", "dist/main"]
