FROM node:latest AS build

WORKDIR /build

COPY ./package*.json ./

RUN npm install
RUN npm run build

FROM node:latest AS production

WORKDIR /app

COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist

EXPOSE 7860

CMD ["node", "dist/main"]