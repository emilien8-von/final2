// Dans front/src/utils/constants/URLS.js

// On définit directement l'objet que l'on veut exporter
const URLS = {
    // Utilisateurs
    POST_REGISTER: '/game/user/add',
    POST_LOGIN: '/game/user/login',
    GET_USER_STATS: '/game/user/stats',
    UPDATE_PROFILE: '/game/user/profile/update',
    UPDATE_PASSWORD: '/game/user/update',
    FORGOT_PASSWORD: '/game/user/forgot-password',
    VERIFY_RESET_CODE: '/game/user/reset', 
    RESET_PASSWORD: '/game/user/reset-password',
    GET_ALL_USERS: '/game/user/all',
    UPDATE_USER_ROLE: '/game/user/role', // On ajoutera l'ID à la fin
    DELETE_USER: '/game/user/delete', 
    LOGOUT_USER:'/game/user/logout',
    // Jeux
    GET_ALL_GAMES: '/game/jeux/all',
    GET_RECENT_GAMES: '/game/jeux/recent',
    GET_GAME_BY_ID: '/game/jeux/get', 
    CREATE_GAME: '/game/jeux/add',
    UPDATE_GAME: '/game/jeux/put', 
    DELETE_GAME: '/game/jeux/delete',

    // Consoles
    GET_ALL_CONSOLE: '/game/console/all',
    GET_CONSOLE_BY_ID: '/game/console/get',
    DELETE_CONSOLE: '/game/console/delete',
    CHANGE_CONSOLE: '/game/console/put',
    ADD_CONSOLE:'/game/console/add',

    // Émulateurs
    GET_EMULATEUR_ALL: "/game/emulateur/all",
    GET_EMULATEUR_BY_ID: "/game/emulateur/get",
     DELETE_EMULATEUR: '/game/emulateur/delete',
    CHANGE_EMULATEUR: '/game/emulateur/put',
    ADD_EMULATEUR:'/game/emulateur/add',
    // Commentaires
    GET_COMMENT_BY_GAME_ID: '/game/comment/game', 
    POST_COMMENT: '/game/comment/add',
    //Formulaire
    SEND_CONTACT_FORM: '/game/user/forced'
}

export default URLS;