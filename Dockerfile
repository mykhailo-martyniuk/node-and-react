FROM node:17 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:17 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/index.ts ./api/

EXPOSE 3080

CMD ["ts-node", "./api/index.ts"]