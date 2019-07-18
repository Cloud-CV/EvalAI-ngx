FROM node:12.2.0

RUN mkdir /code

# Set working directory
WORKDIR /code

# Add dependencies
COPY package.json /code/package.json
RUN npm install
RUN npm link @angular/cli@7.3.8
RUN npm audit fix

# Copy codebase
COPY . /code

# Generate build
RUN ng build --prod

FROM nginx:1.16.0-alpine

# Copy artifact build from the 'build environment'
ARG ANGULAR_ENV
COPY docker/prod/nodejs/nginx_staging.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/dist /usr/share/nginx/html
