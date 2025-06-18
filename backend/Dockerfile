# Dockerfile para o backend NestJS
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./prisma ./prisma
COPY . .
COPY ./generated ./generated
RUN npm run build
# Gera o Prisma Client para o ambiente Linux
RUN npx prisma generate

FROM node:lts-alpine as prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/generated ./generated
COPY --from=build /app/prisma ./prisma
COPY package*.json ./
ENV NODE_ENV=production
EXPOSE ${BACKEND_PORT}
CMD ["node", "dist/main.js"]
