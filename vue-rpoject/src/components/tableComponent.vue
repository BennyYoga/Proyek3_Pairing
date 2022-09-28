<template>

    <table>
        <tr>
            <th>image</th>
            <th>NIM</th>
            <th>nama</th>
            <th>Kelas</th>
            <th>Prodi</th>
            <th>Jurusan</th>
            <th>Action</th>
        </tr>
        <tr v-for="student in students" :key="student.NIM">
            <template v-if="studentNIM === student.NIM">
                
                <td>
                    <img class="image-table" v-bind:src="`http://localhost:3000/public/image/${student.image}`" alt="">
                </td>
                <td>{{student.NIM}}</td>

                <td>
                    <label for="nama">Nama</label>
                    <div>
                        <input type="text" v-model="student.nama" class="form-control" />
                    </div>
                </td>
                <td>
                    <label for="kelas">Kelas</label>
                    <div>
                        <input type="text" v-model="student.kelas" class="form-control" />
                    </div>
                </td>
                <td>
                    <label for="prodi">prodi</label>
                    <div>
                        <input type="text" v-model="student.prodi" class="form-control" />
                    </div>
                </td>
                <td>
                    <label for="jurusan">Jurusan</label>
                    <div>
                        <input type="text" v-model="student.jurusan" class="form-control" />
                    </div>
                </td>
                <td>
                    <button class="btn btn-success m-2" @click="saveEdit(student)">Save</button>
                    <button class="btn btn-danger" @click="cancelEdit(student)">Cancel</button>
                </td>
            </template>
            <template v-else>
                <td>
                    <img class="image-table" v-bind:src="`http://localhost:3000/public/image/${student.image}`" alt="">
                </td>
                <td>{{student.NIM}}</td>
                <td>{{student.nama}}</td>
                <td>{{student.kelas}}</td>
                <td>{{student.prodi}}</td>
                <td>{{student.jurusan}}</td>
                <span>
                    <button @click=deleteStudent(student.NIM)>Delete</button>
                    <button @click=editStudent(student)>Edit</button>
                </span>
            </template>
        </tr>
    </table>
</template>

<style>


table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}

.image-table {
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 50%;
}
</style>

<script>
export default {
    name: 'tableComponent',
    props: {
        students: Array,
    },
    data() {
        return {
            studentNIM: null,
            image : null
        }
    },
    methods: {
        deleteStudent(NIM) {
            this.$emit('delete-student', NIM)
        },
        editStudent(student) {
            this.data = Object.assign({}, student)
            this.studentNIM = student.NIM;
        },
        saveEdit(student) {
            let NIM = this.data.NIM;
            this.$emit('edit-student', NIM, student)
            this.studentNIM = null
        },
        cancelEdit(student) {
            Object.assign(student, this.data)
            this.studentNIM = null
        }
    }
}
</script>