FROM node:18-alpine AS builder

# On définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# On copie les fichiers de dépendances
COPY package.json package-lock.json ./

# On installe les dépendances de production
RUN npm install --production

# On copie le reste du code de l'application
COPY . .

# --- ÉTAPE 2: Production ---
# On part d'une image Node.js plus légère pour l'image finale
FROM node:18-alpine

WORKDIR /app

# On copie les dépendances installées depuis l'étape "builder"
COPY --from=builder /app/node_modules ./node_modules

# On copie le code de l'application depuis l'étape "builder"
COPY --from=builder /app .

# On expose le port que votre application utilise (par exemple, 8000)
# Render détectera cela automatiquement, mais c'est une bonne pratique
EXPOSE 8000

# La commande pour démarrer votre serveur quand le conteneur se lance
# Assurez-vous que votre package.json a un script "start"
CMD [ "npm", "start" ]