FROM node:lts-alpine
WORKDIR /usr/app

# Install puppeteer 
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install all dependencies
COPY ["package.json", "package-lock.json*", "tsconfig*.json", "./"]
RUN npm install

# Copy source files
COPY ./src ./src

# Build app
ENV NODE_ENV=production
RUN npm run build
RUN npm prune --omit=dev

# Run app
CMD ["node", "dist/main"]
