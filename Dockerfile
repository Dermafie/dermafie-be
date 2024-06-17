FROM node:20
WORKDIR /app
ENV PORT 3000
ENV DB_HOST 10.126.32.3
ENV DB_USER root
ENV DB_PASSWORD '(hvuGb;u^Z=q#"gK'
ENV DB_NAME dermafie
ENV GCLOUD_PROJECT_ID dermafie
ENV GCLOUD_KEYFILE_PATH /app/keys/dermafie-c048de474224.json
ENV GCLOUD_BUCKET_NAME dermafie-bucket
ENV MODEL_URL=https://storage.googleapis.com/dermafie-bucket/model-in-prod/model.json
ENV JWT_SECRET 4DAmmsjilVf/6f2bdcHYJQNXwUwhrakdHjRW76PQrmw+X0+7fz4Beu6qTXa9Hxmi
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start"]
