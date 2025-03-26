# Usando uma imagem específica do Node.js 20.19.0
FROM node:20-alpine

# Criando diretório de trabalho
WORKDIR /app

# Copiando pacotes e instalando dependências
COPY package*.json ./

# Removendo node_modules e package-lock.json para garantir que as dependências sejam instaladas corretamente
RUN rm -rf node_modules package-lock.json

# Instalando dependências
RUN npm install --omit=dev

# Instala o NestJS CLI globalmente para poder executar `nest build`
RUN npm install -g @nestjs/cli

# Copiando o restante do código
COPY . .

# Gerando os tipos do Prisma antes de compilar
RUN npx prisma generate

# Compilando a aplicação
RUN npm run build

# Expondo a porta
EXPOSE 3000

# Iniciando a aplicação
CMD ["sh", "-c", "start:render"]