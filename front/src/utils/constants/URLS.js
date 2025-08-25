import React from 'react'

const URLS = () => {
  const URLS = {
    // Utilisateurs
    POST_REGISTER: '/game/user/add',
    POST_LOGIN: '/game/user/login',
    GET_USER_STATS: '/game/user/stats',
    UPDATE_PROFILE: '/game/user/profile/update',
    UPDATE_PASSWORD: '/game/user/profile/update-password',
    FORGOT_PASSWORD: '/game/user/forgot-password',
    VERIFY_RESET_CODE: '/game/user/verify-reset-code',
    RESET_PASSWORD: '/game/user/reset-password',

    // Jeux
    GET_ALL_GAMES: '/game/jeux/all',
    GET_RECENT_GAMES: '/game/jeux/recent',
    GET_GAME_BY_ID: '/game/jeux/get',
    GET_ALL_CONSOLE : '/game/console/all',
    GET_CONSOLE_BY_ID : '/game/console/get',
    GET_EMULATEUR_BY_ID: "/game/emulateur/get",
    GET_EMULATEUR_ALL: "/game/emuateur/all",
    GET_COMMENT_BY_ID: '/game/comment/get',
    POST_COMMENT: '/game/comment/add'
  }
}

export default URLS
