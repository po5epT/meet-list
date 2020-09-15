<template>
    <form @submit.prevent="onSubmit">
        <div class="form-group">
            <label for="name">Name</label>
            <input
                type="text"
                class="form-control"
                :class="{'is-invalid': nameInvalid}"
                id="name"
                name="name"
                :value="currentItem.name.value"
                @input="onInput"
            >
            <div class="invalid-feedback" v-if="nameInvalid">Field is required!</div>
        </div>
        <div class="form-group">
            <label for="date">Date</label>
            <input
                type="date"
                class="form-control"
                :class="{'is-invalid': dateInvalid}"
                id="date"
                name="date"
                :value="currentItem.date.value"
                @input="onInput"
            >
            <div class="invalid-feedback" v-if="dateInvalid">Field is required!</div>
        </div>
        <div class="form-group">
            <label for="note">Note</label>
            <input
                type="text"
                class="form-control"
                id="note"
                name="note"
                :value="currentItem.note.value"
                @input="onInput"
            >
        </div>
        <button type="submit" class="btn btn-primary">Next</button>
    </form>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'TabInfo',
        data: () => ({
            attemptToSend: false,
        }),
        computed: {
            ...mapState({
                currentItem: state => state.currentItem,
            }),

            nameInvalid() {
                return (this.currentItem.name.dirty || this.attemptToSend) && !this.currentItem.name.value;
            },

            dateInvalid() {
                return (this.currentItem.date.dirty || this.attemptToSend) && !this.currentItem.date.value;
            },

            invalid() {
                return (!this.currentItem.name.value || !this.currentItem.date.value);
            }
        },
        methods: {
            ...mapActions([
                'updateCurrentItem'
            ]),
            onSubmit() {
                if(!this.invalid)
                    this.$emit('changeComponent', 'TabConfirmation');
                else
                    this.attemptToSend = true;
            },

            onInput(event) {
                this.updateCurrentItem({
                    key: event.target.name,
                    value: {
                        value: event.target.value,
                        dirty: true,
                    }
                });
            },
        }
    }
</script>
