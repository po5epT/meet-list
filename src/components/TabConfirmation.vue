<template>
    <form @submit.prevent="onSubmit">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" :value="currentItem.name.value" id="name" readonly>
        </div>
        <div class="form-group">
            <label for="date">Date</label>
            <input type="date" class="form-control" :value="currentItem.date.value" id="date" readonly>
        </div>
        <div class="form-group">
            <label for="note">Note</label>
            <input type="text" class="form-control" :value="currentItem.note.value" id="note" readonly>
        </div>

        <button type="button" class="btn btn-secondary mr-2" @click="back">Back</button>
        <button type="submit" class="btn btn-success">Confirm</button>
    </form>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'TabConfirmation',

        computed: {
            ...mapState({
                currentItem: state => state.currentItem,
            }),
        },
        methods: {
            ...mapActions([
                'addItem',
            ]),

            onSubmit() {
                this.addItem({
                    id: Date.now(),
                    name: this.currentItem.name.value,
                    date: this.currentItem.date.value,
                    note: this.currentItem.note.value,
                    completed: false,
                });

                this.$router.push('/');
            },

            back() {
                this.$emit('changeComponent', 'TabInfo');
            }
        }
    }
</script>
