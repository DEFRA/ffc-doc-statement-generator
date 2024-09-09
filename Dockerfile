ARG PARENT_VERSION=2.1.2-node18.11.0
ARG PORT_DEBUG=9229

# Development
FROM defradigital/node-development:${PARENT_VERSION} AS development
ARG PARENT_VERSION
LABEL uk.gov.defra.ffc.parent-image=defradigital/node-development:${PARENT_VERSION}

ARG PORT_DEBUG
EXPOSE ${PORT_DEBUG}

USER root
RUN apk upgrade --no-cache && apk --no-cache add openjdk17-jre

USER node
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
CMD [ "npm", "run", "start:watch" ]

# Production
FROM defradigital/node:${PARENT_VERSION} AS production
ARG PARENT_VERSION
LABEL uk.gov.defra.ffc.parent-image=defradigital/node:${PARENT_VERSION}

COPY --from=development /home/node/app/ ./app/
COPY --from=development /home/node/package*.json ./
RUN npm ci
CMD [ "node", "app" ]
