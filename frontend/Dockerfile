# Dockerfile para o frontend React
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine as prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
ENV NODE_ENV=production
ENV FRONTEND_PORT=${FRONTEND_PORT:-5173}
EXPOSE 5173
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]
