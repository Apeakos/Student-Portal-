FROM node:18-alpine
WORKDIR /app
# Pokud složka obsahuje package.json, nainstalují se závislosti
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
