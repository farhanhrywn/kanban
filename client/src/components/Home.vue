<template>
    <div class="home-page">
        <Navbar
            :fullname="fullname"
            @logoutUser="logoutUser"
        ></Navbar>
        <div class="container opacity">
            <button class="btn btn-primary" @click="toAddPage">Add New Task</button>
            <div class="row my-5">
                <TaskCategory
                    v-for="(cat, i) in categories"
                    :key="i"
                    :category="cat"
                    :allTask="allTask"
                    :userId="userId"
                    @changePage="toEditPage"
                    @deleteTask="deleteTask"
                    @updateCategory="updateCategory"
                    @updateCategoryUndo="updateCategoryUndo"
                ></TaskCategory>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar"
import TaskCategory from "./TaskCategory"
export default {
    name: "HomePage",
    components: {
        Navbar, TaskCategory
    },
    props: ['categories', 'allTask', 'userId', 'userDataLogin'],
    methods: {
        toAddPage() {
            let payload = {
                pageName: "AddPage"
            }
            this.$emit('changePage', payload)
        },
        logoutUser() {
            this.$emit('logout', 'LoginPage')
        },
        toEditPage(payload) {
            this.$emit('changePage', payload)
        },
        deleteTask(id) {
            this.$emit('deleteTask', id)
        },
        updateCategory(payload) {
            this.$emit('updateCategory', payload)
        },
        updateCategoryUndo(payload) {
            this.$emit('updateCategoryUndo', payload)
        }
    },
    computed: {
        fullname() {
            return this.userDataLogin.firstName + ' ' + this.userDataLogin.lastName
        }
    }
}
</script>

<style>

</style>