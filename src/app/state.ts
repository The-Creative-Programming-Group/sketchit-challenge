import { proxy } from 'valtio';

export const state = proxy({
    playerId: '',
    setPlayerId: (id: string) => {
        state.playerId = id;
    }
});