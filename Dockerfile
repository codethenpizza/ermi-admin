FROM public.ecr.aws/bitnami/node:latest AS build

WORKDIR /app

COPY ./package*.json /app/
COPY ./yarn.lock /app/
RUN yarn

COPY . /app
RUN yarn build


FROM nginx:1.16.0-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./injectEnv.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x injectEnv.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/injectEnv.sh && nginx -g \"daemon off;\""]
