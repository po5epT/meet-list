<template>
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" :class="{completed: item.completed}">
        <div class="d-flex align-items-center">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" :checked="item.completed" @change="check" :id="'item-' + item.id">
                <label class="custom-control-label" :for="'item-' + item.id">{{item.name}}</label>
            </div>
            <div class="info">
                <span class="date ml-2">{{item.date}}</span>
                <span class="note ml-2" v-if="item.note">{{ item.note }}</span>
            </div>
        </div>

        <button type="button" class="btn btn-danger" @click="remove">remove</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: 'Item',
        props: {
            item: {
                type: Object,
                required: true,
            }
        },
        methods: {
            ...mapActions([
                'removeItem',
                'checkItem',
            ]),
            remove() {
                this.removeItem(this.item.id);
            },
            check() {
                this.checkItem(this.item.id);
            }
        }
    }
</script>
