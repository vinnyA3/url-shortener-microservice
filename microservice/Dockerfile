FROM NODE
MAINTAINER vincent.aceto@gmail.com
RUN git clone -q https://github.com/vinnyA3/url-shortener-microservice.git
WORKDIR url-shortener-microservice
RUN yarn install
EXPOSE 8080
CMD ["yarn", "start"]
