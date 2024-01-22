FROM node:20

ENV JWT_SECRET MEDICAPPACT
ENV JWT_RT_SECRET MEDICAPPRFT
ENV DB_HOST mysql
ENV DB_PORT 6603
ENV DB_USER root
ENV DB_PASS medicapp2998
ENV DB_NAME medicapp
ENV PORT 3001

RUN mkdir -p /home/app
COPY . /home/app
WORKDIR /home/app
RUN npm install
CMD ["node", "/home/app/index.js"]
EXPOSE 3001
