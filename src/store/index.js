import Vue from 'vue';
import Vuex from 'vuex';
import {ADD_ITEM, CHECK_ITEM, FETCH_LIST, REMOVE_ITEM, RESET_CURRENT_ITEM, UPDATE_CURRENT_ITEM} from './types';

const initialItem = {
    name: {
        dirty: false,
        value: '',
    },
    date: {
        dirty: false,
        value: '',
    },
    note: {
        dirty: false,
        value: '',
    },
};

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        list: [],

        currentItem: {...initialItem},
    },
    mutations: {
        [FETCH_LIST](state, list) {
            state.list = list;
        },
        [ADD_ITEM](state, item) {
            state.list.push(item);
        },
        [CHECK_ITEM](state, itemId) {
            const item = state.list.find(item => item.id === itemId);
            item.completed = !item.completed;
        },
        [REMOVE_ITEM](state, itemId) {
            const itemIndex = state.list.findIndex(item => item.id === itemId);

            if(itemIndex >= 0)
                state.list.splice(itemIndex, 1);
        },

        [UPDATE_CURRENT_ITEM](state, {key, value}) {
            state.currentItem[key] = value;
        },
        [RESET_CURRENT_ITEM](state) {
            state.currentItem = {...initialItem};
        }
    },
    actions: {
        fetchList({commit}) {
            const list = JSON.parse(localStorage.getItem('list') || '[]');
            commit(FETCH_LIST, list);
        },

        addItem({commit}, item) {
            console.log('add', item);
            const list = JSON.parse(localStorage.getItem('list') || '[]');

            list.push(item);
            localStorage.setItem('list', JSON.stringify(list));

            commit(ADD_ITEM, item);
            commit(RESET_CURRENT_ITEM);
        },

        checkItem({commit}, itemId) {
            let list = JSON.parse(localStorage.getItem('list') || '[]');
            list = list.map(item => {
                if(item.id === itemId)
                    item.completed = !item.completed;

                return item;
            });

            localStorage.setItem('list', JSON.stringify(list));
            commit(CHECK_ITEM, itemId);
        },

        removeItem({commit}, itemId) {
            let list = JSON.parse(localStorage.getItem('list') || '[]');
            list = list.filter(item => item.id !== itemId);

            localStorage.setItem('list', JSON.stringify(list));
            commit(REMOVE_ITEM, itemId);
        },

        updateCurrentItem({commit}, item) {
            commit(UPDATE_CURRENT_ITEM, item);
        },
    },
    modules: {}
})
