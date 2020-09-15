<template>
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <List />
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import List from '@/components/List.vue';

    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'Home',
        components: {
            List,
        },
        created() {
            this.fetchList();
        },
        data: () => ({

        }),
        computed: {
            ...mapState({
                list: state => state.list,
            })
        },
        methods: {
            ...mapActions([
                'fetchList',
            ]),
        }
    }
</script>
