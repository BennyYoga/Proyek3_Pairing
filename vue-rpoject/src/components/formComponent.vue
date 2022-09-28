<template>
    <form v-on:submit.prevent="submit" >
        <label for="Nama">Nama</label>
        <input v-model="student.nama" class="form-control" type="text" id="Nama" name="Nama" required>

        <label for="NIM">NIM</label>
        <input v-model="student.NIM" class="form-control" type="text" id="NIM" name="NIM" required>

        <label for="kelas">kelas</label>
        <input v-model="student.kelas" class="form-control" type="text" id="kelas" name="kelas" required>

        <label for="Prodi">Prodi</label>
        <input v-model="student.prodi" class="form-control" type="text" id="Prodi" name="Prodi" required>

        <label for="Jurusan">Jurusan</label>
        <input v-model="student.jurusan" class="form-control" type="text" id="Jurusan" name="Jurusan" required>

        <label for="Photo">Photo</label>
        <input type="file" @change="uploadFile" ref="file" name="image">
        
        <button type="submit">Submit</button>
    </form>
</template>

<style>
form {
    margin: 30px 100px;
    text-align: left;
}

input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
}
</style>

<script>


export default {
    name: 'formComponent',
    props: {

    },
    data() {
        return {
            student: {
                nama: "",
                NIM: "",
                kelas : "",
                prodi: "",
                jurusan: "",
                image : null
            }
        }
    },
    methods: {
        uploadFile() {
            this.image = this.$refs.file.files[0];
        },
        submit() {
            this.student.image = this.image
            this.$emit('add-student', this.student)
            this.student = {
                nama: "",
                NIM: "",
                kelas : "",
                prodi: "",
                jurusan: "",
            }
        }
    }
}

</script>