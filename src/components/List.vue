<template>
    <transition-group
        name="sort-list"
        class="list-group"
    >
        <Item v-for="item in sortedList" :key="item.id" :item="item" />
    </transition-group>
</template>

<script>
    import Item from './Item';
    import {mapState} from 'vuex';

    export default {
        name: 'List',
        components: {
            Item,
        },
        computed: {
            ...mapState({
                list: state => state.list,
            }),

            sortedList() {
                return this.list.sort((a, b) => {
                    if(a.completed === b.completed) {
                        return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
                    } else {
                        return a.completed < b.completed ? -1 : 1;
                    }
                });
            }
        },
    }
</script>
