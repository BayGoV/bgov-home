FROM node as builder
RUN mkdir /workspace
WORKDIR /workspace
COPY src ./src
COPY package.json ./
COPY karma.conf.js ./
COPY angular.json ./
COPY tsconfig.* ./
COPY tslint.json ./
RUN npm install --legacy-peer-deps
RUN npm run build -- --prod
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=builder /workspace/dist/bgov-home /app
