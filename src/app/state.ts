import { proxy } from 'valtio';

export const state = proxy({
    playerId: '',
    setPlayerId: (id: string) => {
        state.playerId = id;
    },

    user: '',
    setUsername: (username: string) => {
        state.user = username;
    }
});