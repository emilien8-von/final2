// Dans front/src/utils/constants/URLS.js

// On définit directement l'objet que l'on veut exporter
const URLS = {
    // Utilisateurs
    POST_REGISTER: '/game/user/add',
    POST_LOGIN: '/game/user/login',
    GET_USER_STATS: '/game/user/stats',
    UPDATE_PROFILE: '/game/user/profile/update',
    UPDATE_PASSWORD: '/game/user/profile/update-password',
    FORGOT_PASSWORD: '/game/user/forgot-password',
    VERIFY_RESET_CODE: '/game/user/reset', // J'ai corrigé pour correspondre à votre route
    RESET_PASSWORD: '/game/user/reset-password',

    // Jeux
    GET_ALL_GAMES: '/game/jeux/all',
    GET_RECENT_GAMES: '/game/jeux/recent',
    GET_GAME_BY_ID: '/game/jeux/get', // On ajoutera l'ID à la fin

    // Consoles
    GET_ALL_CONSOLE: '/game/console/all',
    GET_CONSOLE_BY_ID: '/game/console/get',

    // Émulateurs
    GET_EMULATEUR_ALL: "/game/emulateur/all", // J'ai corrigé une faute de frappe "emuateur"
    GET_EMULATEUR_BY_ID: "/game/emulateur/get",

    // Commentaires
    GET_COMMENT_BY_GAME_ID: '/game/comment/game', // Route plus descriptive
    POST_COMMENT: '/game/comment/add'
};

// On exporte directement l'objet
export default URLS;