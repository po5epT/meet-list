<template>
    <div>
        <ul class="nav nav-tabs">
            <li
                class="nav-item"
                v-for="tab in tabs"
                :key="tab.component"
            >
                <a
                    class="nav-link"
                    :class="{active: current === tab.component}">
                    {{ tab.name }}
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <keep-alive>
                <component
                    :is="current"
                    @changeComponent="setComponent"
                />
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Make',
        components: {
            TabInfo: () => import(/* webpackChunkName: "tab-info" */ '../components/TabInfo.vue'),
            TabConfirmation: () => import(/* webpackChunkName: "tab-confirmation" */ '../components/TabConfirmation.vue'),
        },
        data: () => ({
            tabs: [
                {
                    name: 'Info',
                    component: 'TabInfo'
                },
                {
                    name: 'Confirmation',
                    component: 'TabConfirmation',
                }
            ],
            current: 'TabInfo',
        }),

        methods: {
            setComponent(component) {
                this.current = component;
            },
        }
    }
</script>