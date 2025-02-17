# Usa uma imagem oficial do Node.js como base
FROM node:18

# Define o diret�rio de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as depend�ncias
COPY package*.json ./

# Instala as depend�ncias
RUN npm install

# Copia o restante do c�digo para dentro do container
COPY . .

# Exp�e a porta que o backend usar�
EXPOSE 3000

# Define o comando para rodar o backend
CMD ["node", "server.js"]